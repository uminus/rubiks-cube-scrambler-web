import {createContext, Reducer, useEffect, useReducer} from "preact/compat";
import {connect} from "../WsConnector";
import {Scramble} from "shared";

export type ActionType = "" | "debug" | "scramble";

export interface Action<P> {
  type: ActionType,
  payload?: P
}

export interface State {
  scramble?: Scramble,
  counter: number;
}

const INITIAL_STATE: State = {
  scramble: undefined,
  counter: 0
};

const ACTIONS = new Map<ActionType, Reducer<State, Action<any>>>([
  ["", (prev, action: Action<any>) => prev],
  ["debug", (prev, action: Action<any>) => {
    return Object.assign({}, prev, {counter: prev.counter + 1});
  }],
  ["scramble", (prev, {payload}: Action<any>) => {
    return Object.assign({}, prev, {scramble: payload});
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
