import { call, put, select } from "redux-saga/effects";
import { setOrders } from "../../ducks/ordersSlice";
import { getUser } from "../../ducks/authenticationSlice";
import { requestGetOrders } from "../requests/orders";

export function* handleGetOrders(action) {
   const user = yield select(getUser);
  try {
    const res = yield call(requestGetOrders, user);
    const { data } = res;
    yield put(setOrders(data));
  } catch (error) {
    console.log(error);
  } 
}
