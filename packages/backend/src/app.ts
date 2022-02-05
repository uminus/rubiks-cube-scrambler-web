import cookieParser from "cookie-parser";
import path from "path";
import express from "express";
import morgan from "morgan";
import {StaticContents} from "./routes/StaticContets";
import expressWs from "express-ws";
import {ScrambleWS} from "./routes/ScrambleWS";


export const expressWS = expressWs(express(), undefined, {
  wsOptions: {
    perMessageDeflate: true
  }
});
export const app = expressWS.app;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.use("/", StaticContents);
app.ws("/ws", ScrambleWS);

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.info(`Express server started on port: ${port}`);
});
