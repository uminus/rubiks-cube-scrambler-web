import {createContext, useCallback, useContext, useEffect, useState} from "preact/compat";
import {Store} from "./Store";
import {Solved} from "shared";

const TimerState = {
  NULL: Symbol("NULL"),
  GetReady: Symbol("GetReady"),
  GetSet: Symbol("GetSet"),
  GO: Symbol("GO"),
};

export interface TTTT {
  state: typeof TimerState[keyof typeof TimerState];
  timer?: [Date?, Date?];
}

export const Timer = createContext<TTTT>({state: TimerState.NULL, timer: []});

export const TimerContext = ({children}: { children: any }) => {
  const [state, setState] = useState(TimerState.NULL);
  const [timer, setTimer] = useState<[Date?, Date?]>([]);
  const [readyTimer, setReadyTimer] = useState<ReturnType<typeof setTimeout>>();

  const {state: store, dispatch} = useContext(Store);

  const onKeyDown = useCallback((ev: KeyboardEvent) => {
    const {key, repeat} = ev;
    if (repeat) return;

    if (key === " " && state === TimerState.GO) {
      const [start] = timer;
      const stop = new Date();
      setTimer([start, stop]);
      setState(TimerState.NULL);
      const ms = stop.getTime() - start!.getTime();
      console.log(`time: ${ms} ms.`);

      dispatch({
        type: "solved",
        payload: {
          user: "DEBUG USER",
          time: ms,
          timestamp: stop.getTime()
        } as Solved
      });
      // STATE.ws.send(JSON.stringify({
      //   type: "solved",
      //   token: STATE.token,
      //   payload: {
      //     scrambleId: this._selected,
      //     time: ms,
      //     timestamp: new Date().getTime(),
      //   },
      // }));
    }

    if (key === " " && state === TimerState.NULL) {
      setState(TimerState.GetReady);
      console.log("GetReady");
      setReadyTimer(setTimeout(() => {
        setState(TimerState.GetSet);
        console.log("GetSet");
      }, 800));
    }

    if (key === "Enter" && state === TimerState.NULL) {
      dispatch({
        type: "selected",
        payload: undefined,
      });
    }
  }, [state]);

  const onKeyUp = useCallback((ev: KeyboardEvent) => {
    if (ev.key === " ") {
      if (state === TimerState.GetSet) {
        setTimer([new Date()]);
        setState(TimerState.GO);
        console.log("GO");
      } else {
        if (readyTimer) {
          clearTimeout(readyTimer);
        }
        setState(TimerState.NULL);
      }
    }
  }, [state, timer]);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown, false);
    document.addEventListener("keyup", onKeyUp, false);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, [onKeyDown, onKeyUp]);

  return (
    <Timer.Provider value={{state, timer}}>
      {children}
    </Timer.Provider>
  )
}
