import { CONTRACT_ADDRESS } from "../../contract/contactDet";
import { contract, web3 } from "../../Provider";
import { toWei } from "web3-utils";

// This function is used to upload a video to the blockchain
// It takes the private key of the user, the media ID of the video, the mint limit, and the price in Wei
// The function creates a transaction object with the necessary details, signs it with the user's private key, and sends it to the blockchain
// The transaction is then sent to the blockchain and the receipt is logged
const uploadVideo = async (privateKey, mediaId, mintLimit, price, fee) => {
  try {
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    const txData = contract.methods
      .uploadVideo(mediaId, mintLimit, price)
      .encodeABI();

    const gas = await contract.methods
      .uploadVideo(mediaId, mintLimit, price)
      .estimateGas({
        from: account.address,
        value: fee, // Convert price to Wei
      });

    // Fetch base fee
    const pendingBlock = await web3.eth.getBlock("pending");
    const baseFee = BigInt(pendingBlock.baseFeePerGas); // base fee from the network
    const priorityFee = BigInt(toWei("2", "gwei")); // 2 gwei tip
    const maxFee = baseFee + priorityFee;

    const tx = {
      from: account.address,
      to: CONTRACT_ADDRESS,
      data: txData,
      value: fee, // Convert price to Wei
      gas,
      maxFeePerGas: "0x" + maxFee.toString(16),
      maxPriorityFeePerGas: "0x" + priorityFee.toString(16),
    };

    const signed = await web3.eth.accounts.signTransaction(tx, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);

    console.log("✅ Uploaded successfully:", receipt);
    return receipt;
  } catch (err) {
    console.error("❌ Error during upload:", err || err);
    throw err;
  }
};

// This function is used to mint a video on the blockchain
// It takes the private key of the user, the video ID, and the price in Wei
// The function creates a transaction object with the necessary details, signs it with the user's private key, and sends it to the blockchain
// The transaction is then sent to the blockchain and the receipt is logged
const mintVideo = async (privateKey, videoId, priceInWei) => {
  try {
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    const data = contract.methods.mintVideo(videoId).encodeABI();

    const gas = await contract.methods.mintVideo(videoId).estimateGas({
      from: account.address,
      value: priceInWei,
    });

    const pendingBlock = await web3.eth.getBlock("pending");
    const baseFee = BigInt(pendingBlock.baseFeePerGas);
    const priorityFee = BigInt(web3.utils.toWei("2", "gwei"));
    const maxFee = baseFee + priorityFee;

    const tx = {
      from: account.address,
      to: CONTRACT_ADDRESS,
      value: priceInWei,
      gas,
      data,
      maxFeePerGas: "0x" + maxFee.toString(16),
      maxPriorityFeePerGas: "0x" + priorityFee.toString(16),
    };

    const signed = await web3.eth.accounts.signTransaction(tx, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);

    console.log("✅ Mint success:", receipt);
    return receipt;
  } catch (err) {
    console.error("❌ Error during mint:", err || err);
    throw err;
  }
};

// This function is used to tip a creator for their content
// It takes the private key of the user, the address of the creator, and the amount to tip in Wei
// The function creates a transaction object with the necessary details, signs it with the user's private key, and sends it to the blockchain
// The transaction is then sent to the blockchain and the receipt is logged
const tipCreator = async (privateKey, creatorAddress, amountInWei) => {
  try {
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    const data = contract.methods
      .tipCreator(creatorAddress, amountInWei)
      .encodeABI();

    // Estimate gas
    const gas = await contract.methods
      .tipCreator(creatorAddress, amountInWei)
      .estimateGas({
        from: account.address,
        value: amountInWei,
      });

    // Fetch pending block for base fee
    const pendingBlock = await web3.eth.getBlock("pending");
    const baseFee = BigInt(pendingBlock.baseFeePerGas);
    const priorityFee = BigInt(toWei("2", "gwei")); // 2 gwei tip
    const maxFee = baseFee + priorityFee;

    // Build the transaction
    const tx = {
      from: account.address,
      to: CONTRACT_ADDRESS,
      value: amountInWei,
      gas,
      data,
      maxFeePerGas: "0x" + maxFee.toString(16),
      maxPriorityFeePerGas: "0x" + priorityFee.toString(16),
    };

    const signed = await web3.eth.accounts.signTransaction(tx, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);

    console.log("✅ Tipped successfully:", receipt);
    return receipt;
  } catch (err) {
    console.error("❌ Error during tip:", err?.message || err);
    throw err;
  }
};

const getVideo = async (videoId) => {
  try {
    const video = await contract.methods.videos(videoId).call();
    // console.log("Video:", video);
    return video;
  } catch (err) {
    console.error("❌ Error fetching video:", err);
    throw err;
  }
};
const getUsdcFeeInEth = async () => {
  try {
    const fee = await contract.methods.getUsdcFeeInEth().call();
    // console.log("Video:", video);
    return fee;
  } catch (err) {
    console.error("❌ Error fetching video:", err);
    throw err;
  }
};

export { uploadVideo, mintVideo, tipCreator, getVideo, getUsdcFeeInEth };
