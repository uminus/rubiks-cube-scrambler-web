import React from "preact";
import {useState} from "preact/compat";

export const TimeMeasurementDialog = () => {
  const [isOpen, set] = useState(true);
  return (
    <dialog open={isOpen} onClick={() => set(!isOpen)}>
      <article>
        <h1>Ready</h1>
        <h1>0.000</h1>
      </article>
    </dialog>
  );
}