import { io } from "socket.io-client";

const URL = "http://192.168.0.107:5000"; // backend URL
const socket = io(URL);

export default socket;
