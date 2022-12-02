import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "./sagas/rootSaga";
import menuReducer from "./ducks/menuSlice";
import additionsReducer from "./ducks/additionsSlice";
import ordersReducer from "./ducks/ordersSlice";
import createdOrderReducer from "./ducks/createdOrderSlice";
import cartReducer from "./ducks/cartSlice";
import modalReducer from "./ducks/modalSlice";
import notificationReducer from "./ducks/notificationSlice";
import confirmationReducer from "./ducks/confirmationSlice";
import searchReducer from "./ducks/searchSlice";
import authenticationReducer from "./ducks/authenticationSlice";

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  menu: menuReducer,
  additions: additionsReducer,
  orders: ordersReducer,
  createdOrder: createdOrderReducer,
  cart: cartReducer,
  modal: modalReducer,
  notification: notificationReducer,
  confirmation: confirmationReducer,
  search: searchReducer,
  authentication: authenticationReducer,
});

const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});
sagaMiddleware.run(watcherSaga);
export default store;
