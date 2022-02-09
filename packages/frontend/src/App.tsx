import {TimeMeasurementDialog} from "./component/TimeMeasurementDialog";
import {ScrambleCard} from "./component/ScrambleCard";
import {useContext} from "preact/compat";
import {Store} from "./model/Store";


export const App = () => {
  const {state, dispatch} = useContext(Store);
  return (
    <>
      <main className="container">
        <div>
          {state.scrambles
            .map((s) => <ScrambleCard user="abc" scramble={s} />)
          }
        </div>
        <small><a href="https://twitter.com/uminusus">@uminus</a> : <a
          href="https://github.com/uminus/rubiks-cube-scrambler-web">Source code</a></small>
      </main>
      <TimeMeasurementDialog />
    </>)
};
