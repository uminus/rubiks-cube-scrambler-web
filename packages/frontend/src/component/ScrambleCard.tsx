import {ScrambleAndTime, Store} from "../model/Store";
import {useCallback, useContext} from "preact/compat";

export const ScrambleCard = ({user, scramble}: { user: string, scramble: ScrambleAndTime }) => {
  const {state, dispatch} = useContext(Store);
  const {selected} = state;

  const onSelected = useCallback(() => {
    dispatch({
      type: "selected",
      payload: scramble.id,
    });
  }, [dispatch, scramble]);

  return (
    <article onClick={onSelected} selected={selected === scramble.id}>
      <header>{new Date(scramble.timestamp).toLocaleString()}</header>
      {scramble.scramble}
      {
        (scramble.solved || []).map((s, i) => {
          const str = `${i + 1}. ${s.user} - ${(s.time / 1000).toFixed(3)}`;
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



