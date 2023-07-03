// Action creator

import * as actions from "./actionTypes";

export const bugAdded = (description) => ({
  type: actions.ADD_BUG,
  payload: {
    description
  }
});

export const bugResolved = (id) => ({
  type: actions.RESOLVED_BUG,
  payload: {
    id
  }
});

export const bugRemoved = (id) => ({
  type: actions.REMOVE_BUG,
  payload: {
    id
  }
});
