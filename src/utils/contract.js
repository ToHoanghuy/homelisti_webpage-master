import { ethers } from "ethers";

// Đảm bảo hợp đồng được tạo ra đúng cách
const getContract = async () => {
  if (window.ethereum) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);  // Khởi tạo provider
      await provider.send("eth_requestAccounts", []);  // Yêu cầu kết nối ví MetaMask
      const signer = await provider.getSigner();  // Lấy signer từ provider

      // Thay thế 'YOUR_SMART_CONTRACT_ADDRESS' bằng địa chỉ hợp đồng của bạn
      const contractAddress = "0x0ea95903CD0337ddB3FDd95EfDBd0dF91aA2Cef6";
      const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"transactionId","type":"uint256"},{"indexed":false,"internalType":"int256","name":"buyerId","type":"int256"},{"indexed":false,"internalType":"int256","name":"sellerId","type":"int256"},{"indexed":false,"internalType":"int256","name":"propertyId","type":"int256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"TransactionRecorded","type":"event"},{"inputs":[{"internalType":"uint256","name":"transactionId","type":"uint256"}],"name":"getTransaction","outputs":[{"components":[{"internalType":"uint256","name":"transactionId","type":"uint256"},{"internalType":"int256","name":"buyerId","type":"int256"},{"internalType":"int256","name":"sellerId","type":"int256"},{"internalType":"int256","name":"propertyId","type":"int256"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"internalType":"struct RealEstateTransactions.Transaction","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"int256","name":"buyerId","type":"int256"},{"internalType":"int256","name":"sellerId","type":"int256"},{"internalType":"int256","name":"propertyId","type":"int256"}],"name":"recordTransaction","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"}];  // ABI hợp đồng thông minh của bạn

      // Khởi tạo hợp đồng với địa chỉ và ABI
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      return contract;
    } catch (err) {
      console.error("Error initializing contract:", err);
    }
  } else {
    console.error("Ethereum provider (MetaMask) not detected");
  }
};

// Hàm ghi giao dịch
const recordTransaction = async (buyerId, sellerId, propertyId) => {
  const contract = await getContract();
  if (contract) {
    try {
      const transaction = await contract.recordTransaction(parseInt(buyerId), parseInt(sellerId), parseInt(propertyId));
      console.log("Transaction ID:", transaction.events[1].args.transactionId.toString());
      console.log("Transaction successfully recorded:", transaction);
    } catch (err) {
      console.error("Error recording transaction:", err);
    }
  }
};

const getTransactionById = async (transactionId) => {
    const contract = await getContract();
    if (contract) {
      try {
        const transaction = await contract.getTransaction(transactionId);
        console.log("Transaction details:", transaction);
        return transaction;
      } catch (err) {
        console.error("Error fetching transaction:", err);
      }
    } else {
      console.error("Contract not initialized.");
    }
  };



export { recordTransaction, getTransactionById };

