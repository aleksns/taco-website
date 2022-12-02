import axios from "axios";

export function requestGetOrders(user) {
    return axios.request({
        method: "get",
        url: "https://aleksns.github.io/fake-json-api-test/orders.json"
        // url: "/api/orders",
        // headers: {
        //   "Authorization": user? `Bearer ${user.token}` : ``
        // }
      });
} 