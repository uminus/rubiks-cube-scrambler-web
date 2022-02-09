import {ScrambleAndTime} from "../model/Store";

export const ScrambleCard = ({user, scramble}: { user: string, scramble: ScrambleAndTime }) => {
  return (
    <article>
      <header>{new Date(scramble.timestamp).toLocaleString()}</header>
      {scramble.scramble}
      {
        (scramble.solved || []).map((s, i) => {
          const str = `${i + 1}. ${s.user} - ${s.time / 1000}`;
          if (user === s.user) {
            return (<p className="time">
              <ins>{str}</ins>
            </p>);
          } else {
            return (<p className="time">{str}</p>);
          }
        })
      }
    </article>
  );
};



