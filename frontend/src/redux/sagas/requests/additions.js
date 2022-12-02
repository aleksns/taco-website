import axios from "axios";

export function requestGetAdditions() {
    return axios.request({
        method: "get",
        url: "https://aleksns.github.io/fake-json-api-test/additions.json"
      });
}