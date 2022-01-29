import {WebsocketRequestHandler} from "express-ws";

import {CronJob} from "cron";
import {_333, scramble} from "../Scramble";
import {expressWS} from "../app";


new CronJob('*/30 * * * * *', () => {
  const data = `${new Date().getTime()}|${scramble(_333, 16)}`;
  Array.from(expressWS.getWss().clients)
    .filter(s => s.readyState == s.OPEN)
    .forEach(s => {
      s.send(data);
    });
}, null, true);

export const ScrambleWS: WebsocketRequestHandler = (ws, req) => {

}