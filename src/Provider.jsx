import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./contract/contactDet";

export const web3 = new Web3(
  "https://base-sepolia.g.alchemy.com/v2/pQJNhlm06A_AjUgN-rUwzFyt0p8HhSxs"
);

export const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
