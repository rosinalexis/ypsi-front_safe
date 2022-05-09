import axios from "axios";

axios.defaults.baseURL = "https://api-cloud-rh.ypsi.dev/api/";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json";
