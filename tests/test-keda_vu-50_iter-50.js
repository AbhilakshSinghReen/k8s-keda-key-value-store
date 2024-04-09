// 50 VU making 20 iterations each

export { addKeyValuePair } from "./common.js";

export const options = {
  scenarios: {
    addKeyValuePair: {
      exec: "addKeyValuePair",
      executor: "per-vu-iterations",
      vus: 50,
      iterations: 20,
    },
  },
};