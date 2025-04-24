import { CONTRACT_ADDRESS } from "../../contract/contactDet";
import { contract, web3 } from "../../Provider";

// This function is used to upload a video to the blockchain
// It takes the private key of the user, the media ID of the video, the mint limit, and the price in Wei
// The function creates a transaction object with the necessary details, signs it with the user's private key, and sends it to the blockchain
// The transaction is then sent to the blockchain and the receipt is logged
const uploadVideo = async (privateKey, mediaId, mintLimit, price) => {
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);

  const tx = {
    from: account.address,
    to: CONTRACT_ADDRESS,
    gas: 300000,
    data: contract.methods.uploadVideo(mediaId, mintLimit, price).encodeABI(),
  };

  const signed = await web3.eth.accounts.signTransaction(tx, privateKey);
  const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);

  console.log("Uploaded:", receipt);
};

// This function is used to mint a video on the blockchain
// It takes the private key of the user, the video ID, and the price in Wei
// The function creates a transaction object with the necessary details, signs it with the user's private key, and sends it to the blockchain
// The transaction is then sent to the blockchain and the receipt is logged
const mintVideo = async (privateKey, videoId, priceInWei) => {
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);

  const tx = {
    from: account.address,
    to: CONTRACT_ADDRESS,
    value: priceInWei,
    gas: 300000,
    data: contract.methods.mintVideo(videoId).encodeABI(),
  };

  const signed = await web3.eth.accounts.signTransaction(tx, privateKey);
  const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);

  console.log("Minted:", receipt);
};

// This function is used to tip a creator for their content
// It takes the private key of the user, the address of the creator, and the amount to tip in Wei
// The function creates a transaction object with the necessary details, signs it with the user's private key, and sends it to the blockchain
// The transaction is then sent to the blockchain and the receipt is logged
const tipCreator = async (privateKey, creatorAddress, amountInWei) => {
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);

  const tx = {
    from: account.address,
    to: CONTRACT_ADDRESS,
    value: amountInWei,
    gas: 300000,
    data: contract.methods.tipCreator(creatorAddress, amountInWei).encodeABI(),
  };

  const signed = await web3.eth.accounts.signTransaction(tx, privateKey);
  const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);

  console.log("Tipped:", receipt);
};

export { uploadVideo, mintVideo, tipCreator };
