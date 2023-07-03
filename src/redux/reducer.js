import * as actions from "./actionTypes";

let lastId = 0;

export default function reducer(state = [], action) {
  if (action.type === actions.ADD_BUG)
    return [
      ...state,
      {
        id: ++lastId,
        description: action.payload.description,
        resolved: false
      }
    ];
  else if (action.type === actions.REMOVE_BUG) return state.filter((bug) => bug.id !== action.payload.id);
  else if (action.type === actions.RESOLVED_BUG)
    return state.map((bug) => (bug.id !== action.payload.id ? bug : { ...bug, resolved: !bug.resolved }));
  return state;
}
