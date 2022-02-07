import {useContext, useState} from "preact/compat";
import {Store} from "../model/Store";

export const TimeMeasurementDialog = () => {
  const [isOpen, set] = useState(true);
  const {state, dispatch} = useContext(Store);

  return (
    <dialog open={isOpen} onClick={() => dispatch({type: "debug"})}>
    {/*<dialog open={isOpen} onClick={() => set(!isOpen)}>*/}
      <article>
        <h1>Ready</h1>
        <h1>0.000</h1>
        <h1>{state.scramble?.scramble}</h1>
        <h1>{state.counter}</h1>
      </article>
    </dialog>
  );
}