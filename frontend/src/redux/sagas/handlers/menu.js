import { call, put } from "redux-saga/effects";
import { setMenu } from "../../ducks/menuSlice";
import { requestGetMenu } from "../requests/menu";

export function* handleGetMenu(action) {
  try {
    const res = yield call(requestGetMenu);
    const { data } = res;
    yield put(setMenu(data));
  } catch (error) {
    console.log(error);
  }
}
