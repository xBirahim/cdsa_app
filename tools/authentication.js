import axios from "axios";
import axiosRetry from "axios-retry";
import CryptoJS from 'crypto-js';

axiosRetry(axios, { retries: 5 });
// Exponential back-off retry delay between requests
axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay });

export class Authentication {
  static getUser() {
    
    return localStorage.getItem("userKey");
  }

  static

}
