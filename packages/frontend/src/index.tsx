if (process.env.NODE_ENV === 'development') {
  require("preact/debug");
}

import {StoreContext} from "./model/Store";
import "./css/style.css";
import {render} from "preact";
import {App} from "./App";


render(
  <StoreContext><App /></StoreContext>,
  document.getElementById("root")!
);