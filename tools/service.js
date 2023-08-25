import axios from "axios";
import axiosRetry from "axios-retry";
import cryptoJs from "crypto-js";

axiosRetry(axios, { retries: 5 });
// Exponential back-off retry delay between requests
axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay });

export class Service {
  static async get(url) {
    return await axios.get(`${url}`);
  }

  static async post(url, body = "") {
    // let value = {
    //   data: {
    //     Text: `${body}`,
    //   },
    // };

    // return await axios.post(url, body, {
    //   headers: {
    //     // Overwrite Axios's automatically set Content-Type
    //     "Content-Type": "application/json",
    //   },
    // });

    return axios({
      method: "POST",
      url: `${url}`,
      headers: {"Content-Type": "application/json; charset=utf-8" },
      data: body,
    });
  }

  static async getItemData(id) {
    return Service.get(`https://localhost:7063/api/Products/${id}`);
  }

  static async getItems() {
    return Service.get(`https://localhost:7063/api/Products`);
  }

  static setCurrentUser(id) {
    localStorage.setItem('userid', id);
  }

  static getCurrentUser(){
    localStorage.getItem("userid")
  }

  static logout(){
    localStorage.removeItem("userid")
  }

  static hashAndSaltPassword = (password) => {
    // Générer un sel aléatoire
    const salt = cryptoJs.lib.WordArray.random(16).toString();

    // Combinaison du mot de passe avec le sel
    const saltedPassword = password + salt;

    // Hasher le mot de passe avec SHA256
    const hashedPassword = cryptoJs.SHA256(password).toString();

    return {
      hashedPassword,
      salt,
    };
  };

}