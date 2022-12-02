import { takeLatest, all } from "redux-saga/effects";
import { getMenu } from "../ducks/menuSlice";
import { getAdditions } from "../ducks/additionsSlice";
import { getOrders } from "../ducks/ordersSlice";

import { handleGetMenu } from "./handlers/menu";
import { handleGetAdditions } from "./handlers/additions";
import { handleGetOrders } from "./handlers/orders";

export function* watcherSaga() {
   yield all([
      takeLatest(getMenu.type, handleGetMenu),
      takeLatest(getAdditions.type, handleGetAdditions),
      takeLatest(getOrders.type, handleGetOrders)
      ]); 
}