import axios from "axios";
import { API_PASSWORD } from "../variables/variables";
import CryptoJs from "crypto-js";
import { RequestData } from "../variables/types";

const buildDate = new Date().toISOString().split('T')[0].replace(/-/g, '');
const token = CryptoJs.MD5(API_PASSWORD + buildDate).toString();
const requestApiData = (data:RequestData) => {
    return axios
      .post("https://api.valantis.store:41000/", data, {
        headers: {
          "X-Auth": token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data)
      
  };

export default requestApiData;
