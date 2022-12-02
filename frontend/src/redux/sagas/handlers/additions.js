import { call, put } from "redux-saga/effects";
import { setAdditions } from "../../ducks/additionsSlice";
import { requestGetAdditions } from "../requests/additions";

export function* handleGetAdditions(action) {
  try {
    const res = yield call(requestGetAdditions);
    const { data } = res;
    yield put(setAdditions(data));
  } catch (error) {
    console.log(error);
  }
}
