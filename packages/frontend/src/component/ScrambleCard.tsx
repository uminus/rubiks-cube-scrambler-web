import {Scramble, Solved} from "shared";

export const ScrambleCard = ({user, scramble, solves}: { user: string, scramble: Scramble, solves: Array<Solved> }) => {
  return (
    <article id="">
      <header>{new Date(scramble.timestamp).toLocaleString()}</header>
      {scramble.scramble}
      {
        solves.map((s, i) => {
          const str = `${i}. ${s.user} - ${s.time / 1000}`;
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



