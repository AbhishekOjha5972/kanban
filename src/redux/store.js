import {
    compose,
    combineReducers,
    applyMiddleware,
    legacy_createStore,
  } from "redux";
  import thunk from "redux-thunk";
import { dataReducer } from "./data.reducer";
  
  const rootReducer = combineReducers({
    masterBoard:dataReducer
  });
  
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  export const store = legacy_createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunk))
  );