import {createContext, Reducer, useEffect, useReducer} from "preact/compat";
import {connect} from "../WsConnector";
import {Scramble, Solved} from "shared";

export type ActionType = "" | "scramble" | "solved";

export interface Action<P> {
  type: ActionType,
  payload?: P
}

export type ScrambleAndTime = Scramble & { solved?: Array<Solved> };

export interface State {
  scramble?: Scramble,
  scrambles: Array<ScrambleAndTime>;
}

const INITIAL_STATE: State = {
  scramble: undefined,
  scrambles: [],
};

const ACTIONS = new Map<ActionType, Reducer<State, Action<any>>>([
  ["", (prev, action: Action<any>) => prev],
  ["scramble", (prev, {payload}: Action<any>) => {
    const next = prev.scrambles.slice();
    next.unshift(payload);
    return Object.assign({}, prev, {scrambles: next.slice(0, 8)});
  }],
  ["solved", (prev, {payload}: Action<Solved>) => {
    prev.scrambles.forEach(s => {
      if (!s.solved) {
        s.solved = [];
      }
      s.solved.push(payload!);
    });
    return Object.assign({}, prev, {scrambles: prev.scrambles.slice()});
  }],
]);

export type Dispatch = (action: Action<any>) => void;

export const Store = createContext<{ state: State, dispatch: Dispatch }>({
  state: INITIAL_STATE,
  dispatch: () => {}
});

export const StoreContext = ({children}: { children: any }) => {
  const [state, dispatch] = useReducer(
    (prev, action: Action<any>) => (ACTIONS.get(action.type) || (() => prev))(prev, action),
    INITIAL_STATE);

  useEffect(() => {
    connect(dispatch);
  }, []);

  return (
    <Store.Provider value={{state, dispatch}}>
      {children}
    </Store.Provider>
  )
}
