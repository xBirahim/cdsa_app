import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, { retries: 5 });
// Exponential back-off retry delay between requests
axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay });

export class Service {
  static async get(url) {
    return await axios.get(`${url}`);
  }

  static async post(url, header = {}, body = "") {
    // let value = {
    //   data: {
    //     Text: `${body}`,
    //   },
    // };

    return axios({method: 'POST', url: `${url}`, headers: header, data: body})
  }
}
