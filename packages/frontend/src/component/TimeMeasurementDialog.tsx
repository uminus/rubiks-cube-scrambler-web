import {useCallback, useContext, useEffect, useReducer, useRef, useState} from "preact/compat";
import {Store} from "../model/Store";
import {Timer} from "../model/TimerState";

export const TimeMeasurementDialog = () => {
  const [isOpen, set] = useState(true);
  const {state, dispatch} = useContext(Store);

  const {state: timerState, timer} = useContext(Timer);
  const [time, onTick] = useReducer((state, event) => {
    const [start, end] = timer!;
    if (!start) {
      return 0.0;
    } else if (end) {
      return end.getTime() - start.getTime();
    } else {
      return new Date().getTime() - start.getTime();
    }
  }, 0.0);

  useAnimationFrame(isOpen, onTick);

  return (
    <dialog open={isOpen} onClick={() => set(!isOpen)}>
      <article>
        <h1>{"SCRAMBLE SCRAMBLE SCRAMBLE"}</h1>
        <h1>{timerState.toString()}</h1>
        <h1>{(time / 1000).toFixed(3)}</h1>
      </article>
    </dialog>
  );
}

const useAnimationFrame = (isRunning: boolean, onTick: (_?: unknown) => void) => {
  const forceStop = useRef(false);
  const rafRef = useRef<ReturnType<typeof requestAnimationFrame>>();
  const loop = useCallback(() => {
    if (forceStop.current || !isRunning) return;
    onTick();

    rafRef.current = requestAnimationFrame(loop);
  }, [isRunning, onTick]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      console.log("end");
      forceStop.current = true;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [loop]);
};