export function connect() {
  let protocol: string;
  switch (location.protocol) {
    case "http:":
      protocol = "ws:";
      break;
    case "https:":
      protocol = "wss:";
      break;
    default:
      throw new Error("unsupported protocol.");
  }

  const ws = new WebSocket(`${protocol}//${window.location.host}/ws`);
  ws.addEventListener("open", ev => {
    console.log("on open");
  });

  ws.addEventListener("close", ev => {
    console.log("on close");
    setTimeout(() => {
      connect();
    }, 5000);
  });

  ws.addEventListener("error", ev => {
    console.error(ev);
  });

  ws.addEventListener("message", ev => {
    const data = JSON.parse(ev.data);
    console.log(data);
    if (data.type === "scramble") {
      const {id, timestamp, scramble} = data.payload;
    }

    if (data.type === "user") {
      const {id, token} = data.payload;
      ws.send(JSON.stringify({type: "verify", token, payload: {dev: "dev"}}))
    }

    if (data.type === "times") {
      const {scramble: scrambleId, times} = data.payload;
    }
  });
}