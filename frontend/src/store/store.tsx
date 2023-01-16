import { createStore } from "redux";

function reducer(state: any = "", action: any) {
  switch (action.type) {
    case "ADD-NAME":
      return {
        ...state,
        name: action.name,
      };
    // eslint-disable-next-line no-fallthrough
    default:
      return state;
  }
}

export const store = createStore(reducer);
