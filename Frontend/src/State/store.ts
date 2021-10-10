import { createStore } from "redux";

import { rootReducer } from "State/Reducers";

export const store = createStore(rootReducer);
