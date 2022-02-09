import {createContext, Reducer, useEffect, useReducer} from "preact/compat";
import {connect} from "../WsConnector";
import {Scramble, Solved} from "shared";

export type ActionType = "" | "scramble" | "solved" | "selected";

export interface Action<P> {
  type: ActionType,
  payload?: P
}

export type ScrambleAndTime = Scramble & { solved?: Array<Solved> };

export interface State {
  scramble?: Scramble,
  scrambles: Array<ScrambleAndTime>;
  selected?: string;
}

const INITIAL_STATE: State = {
  scramble: undefined,
  scrambles: [],
  selected: undefined,
};

const ACTIONS = new Map<ActionType, Reducer<State, Action<any>>>([
  ["", (prev, action: Action<any>) => prev],
  ["scramble", (prev, {payload}: Action<any>) => {
    const next = prev.scrambles.slice();
    next.unshift(payload);
    return Object.assign({}, prev, {scrambles: next.slice(0, 8)});
  }],
  ["selected", (prev, {payload: selected}: Action<string>) => {
    if (!selected) {
      const scramble = prev.scrambles[0];
      return Object.assign({}, prev, {selected: scramble.id, scramble});
    }

    if (prev.selected === selected) {
      console.log("unselected", selected);
      return Object.assign({}, prev, {selected: undefined, scramble: undefined});
    }
    console.log("selected", selected);
    const scramble = prev.scrambles.find(s => s.id === selected);
    return Object.assign({}, prev, {selected, scramble});
  }],
  ["solved", (prev, {payload}: Action<Solved>) => {
    const scramble = prev.scrambles.find(s => s.id === prev.selected);
    if (scramble) {
      if (!scramble.solved) {
        scramble.solved = [];
      }
      scramble!.solved!.push(payload!);
      return Object.assign({}, prev, {scrambles: prev.scrambles.slice()});
    } else {
      return prev;
    }
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
