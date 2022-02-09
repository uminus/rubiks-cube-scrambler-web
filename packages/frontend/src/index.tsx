if (process.env.NODE_ENV === 'development') {
  require("preact/debug");
}

import {TimerContext} from "./model/TimerState";
import {StoreContext} from "./model/Store";
import "./css/style.css";
import {render} from "preact";
import {App} from "./App";


render(
  <StoreContext>
    <TimerContext>
      <App />
    </TimerContext>
  </StoreContext>,
  document.getElementById("root")!
);