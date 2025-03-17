import axios from "axios";
import { useState } from "react";
import PrimaryBtn from "../../components/btn/primaryBtn/PrimaryBtn";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // Replace with your backend API URL
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});
