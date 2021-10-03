import { combineReducers } from "redux";

import { modalReducer } from "State/Reducers/modalReducer";

export const rootReducer = combineReducers({ modals: modalReducer });

export type RootState = ReturnType<typeof rootReducer>;
