import axios from "axios";

export function requestGetMenu() {
    return axios.request({
        method: "get",
        url: "https://aleksns.github.io/fake-json-api-test/menu.json"
      });
}