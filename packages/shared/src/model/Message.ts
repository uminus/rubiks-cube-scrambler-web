import {Scramble} from "./Scramble";
import {Solved} from "./Solved";

export interface Message<P extends object> {
  type: "user" | "verify" | "scramble" | "solved" | "times";
  token?: string;
  payload?: P;
}


export interface ScrambleMessage extends Message<Scramble> {
  type: "scramble";
}

export interface SolvedMessage extends Message<Solved & { scrambleId: string }> {
  type: "solved";
}