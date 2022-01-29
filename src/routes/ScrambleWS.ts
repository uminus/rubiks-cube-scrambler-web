import {WebsocketRequestHandler} from "express-ws";

import {CronJob} from "cron";
import {_333, scramble} from "../Scramble";
import {expressWS} from "../app";


let DATA = generateScrambleData();

new CronJob('*/30 * * * * *', () => {
  DATA = generateScrambleData();

  Array.from(expressWS.getWss().clients)
    .filter(s => s.readyState == s.OPEN)
    .forEach(s => {
      s.send(DATA);
    });
}, null, true);

function generateScrambleData(): string {
  return `${new Date().getTime()}|${scramble(_333)}`
}

export const ScrambleWS: WebsocketRequestHandler = (ws, req) => {
  ws.send(DATA);
}