import {Router} from "express";

export const StaticContents = Router();

StaticContents.get("/", (req, res) => {
  res.render("index", {title: "Speedcube Scrambler"});
});
