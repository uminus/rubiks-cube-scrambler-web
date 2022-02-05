import React from "react";
import ReactDOM from "react-dom";
import "./css/style.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)


function App() {
  return (<>Hello React</>);
}