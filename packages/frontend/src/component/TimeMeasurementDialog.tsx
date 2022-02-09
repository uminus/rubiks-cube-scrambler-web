import {useCallback, useContext, useEffect, useReducer, useRef} from "preact/compat";
import {Timer} from "../model/TimerState";
import {Scramble} from "shared";

export const TimeMeasurementDialog = ({scramble, onClose}: { scramble?: Scramble, onClose: () => void }) => {
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

  useAnimationFrame(scramble, onTick);

  return (
    <dialog open={!!scramble} onClick={onClose}>
      <article>
        <h1>{scramble?.scramble}</h1>
        <h1>{timerState.toString()}</h1>
        <h1>{(time / 1000).toFixed(3)}</h1>
      </article>
    </dialog>
  );
}

const useAnimationFrame = (isRunning: any, onTick: (_?: unknown) => void) => {
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
      // forceStop.current = true;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [loop]);
};