if (process.env.NODE_ENV === 'development') {
  require("preact/debug");
}

import "./css/style.css";
import {render} from "preact";
import {App} from "./App";
import {connect} from "./component/WsConnector";


render(
  <App />,
  document.getElementById("root")!
);

connect();