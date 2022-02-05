import {WebsocketRequestHandler} from "express-ws";

import {CronJob} from "cron";
import {_333, scramble} from "../Scramble";
import {expressWS} from "../app";
import {nanoid} from "nanoid";
import {JwtPayload, sign, verify} from "jsonwebtoken";
import {DB, Scramble, Solve} from "../DummyDB";


let DATA = generateScrambleData();

new CronJob('*/30 * * * * *', () => {
  DATA = generateScrambleData();
  broadcast(JSON.stringify({type: "scramble", payload: DATA}));
}, null, true);

function broadcast(msg: string): void {
  Array.from(expressWS.getWss().clients)
    .filter(s => s.readyState == s.OPEN)
    .forEach(s => {
      s.send(msg);
    });
}

function generateScrambleData(): ScramblePayload {
  const data = {
    id: nanoid(),
    timestamp: new Date().getTime(),
    scramble: scramble(_333),
  };

  DB.scramble(data);
  return data
}


export const ScrambleWS: WebsocketRequestHandler = (ws, req) => {
  const user = nanoid(8);
  const token = sign({user}, 'my-secret');

  ws.send(JSON.stringify({type: "user", payload: {id: user, token}}));
  ws.send(JSON.stringify({type: "scramble", payload: DATA}));

  try {
    const [_, times] = DB.times(DATA.id);
    ws.send(JSON.stringify({
      type: "times",
      payload: {
        scramble: DATA.id,
        times
      }
    }));
  } catch (ignore: any) {}

  ws.on("message", raw => {
    try {
      const {type, token, payload} = JSON.parse(raw.toString()) as Message<any>;

      if (type === "verify") {
        let verified = false;
        if (token) {
          verified = !!verify(token, "my-secret");
        }
        console.log(type, verified, payload);
      }

      if (type === "solved") {
        let verified = verify(token!!, "my-secret") as JwtPayload;
        if (!verified) return;

        const p = payload as SolvedPayload;
        const [scramble, solves] = DB.solve(p.scrambleId, {
          user: verified.user as string,
          time: payload.time,
          timestamp: payload.timestamp,
        });

        broadcast(JSON.stringify({
          type: "times",
          payload: {
            scramble: scramble.id,
            times: solves
          }
        }));
      }

    } catch (e: any) {
      console.warn(e.message);
    }
  });
}

export type ScramblePayload = Scramble;
export type SolvedPayload = Solve & { scrambleId: string };

export interface Message<P extends object> {
  type: "user" | "verify" | "scramble" | "solved" | "times";
  token?: string;
  payload?: P;
}