import {useCallback, useContext, useEffect, useRef, useState} from "preact/compat";
import {Store} from "../model/Store";

export const TimeMeasurementDialog = () => {
  const [isOpen, set] = useState(true);
  const start = useRef(new Date().getTime());
  const [time, setTime] = useState(0);
  const {state, dispatch} = useContext(Store);


  const onTick = useCallback(() => {
    setTime(new Date().getTime() - start.current);
  }, []);

  useAnimationFrame(isOpen, onTick);

  return (
    <dialog open={isOpen} onClick={() => set(!isOpen)}>
      <article>
        <h1>Ready</h1>
        <h1>{(time / 1000).toFixed(3)}</h1>
        <h1>{state.counter}</h1>
      </article>
    </dialog>
  );
}

const useAnimationFrame = (isRunning: boolean, onTick: () => void) => {
  const forceSop = useRef(false);
  const rafRef = useRef<ReturnType<typeof requestAnimationFrame>>();
  const loop = useCallback(() => {
    console.log("loop");
    if (forceSop.current || !isRunning) return;
    onTick();
    rafRef.current = requestAnimationFrame(loop);
  }, [isRunning, onTick]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      console.log("end");
      forceSop.current = true;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [loop]);
};