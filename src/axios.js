import axios from "axios";

axios.defaults.baseURL = "https://localhost:8000/api/";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json";
