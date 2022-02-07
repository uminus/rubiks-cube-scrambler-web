import {TimeMeasurementDialog} from "./component/TimeMeasurementDialog";
import {ScrambleCard} from "./component/ScrambleCard";


export const App = () => (
  <>
    <main className="container">
      <div>
        {["0"]
          .map(() => <ScrambleCard user="abc" scramble={{scramble: "ABCEDF", timestamp: 1, id: "id"}} solves={[]} />)
        }
      </div>
      <small><a href="https://twitter.com/uminusus">@uminus</a> : <a
        href="https://github.com/uminus/rubiks-cube-scrambler-web">Source code</a></small>
    </main>
    <TimeMeasurementDialog />
  </>);
