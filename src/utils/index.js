import { ethers, toBigInt } from "ethers";
import { rpcUrlsMap, supportedChains } from "../constants";
import { crowdfundContractAddress } from "../constants/addresses";
import crowdFundAbi from "../constants/abis/crowdfund.json";

export const isSupportedChain = (chainId) =>
    supportedChains.includes(Number(chainId));

export const shortenAccount = (account) =>
    `${account.substring(0, 6)}...${account.substring(38)}`;

export const getReadOnlyProvider = (chainId) => {
    return new ethers.JsonRpcProvider(rpcUrlsMap[chainId]);
};

export const getContract = async (address, abi, provider, withWrite) => {
    let signer;
    if (withWrite) signer = await provider.getSigner();

    return new ethers.Contract(address, abi, withWrite ? signer : provider);
};

export const getContractWithProvider = (address, abi, provider) => {
    return new ethers.Contract(address, abi, provider);
};

export const getCrowdfundContract = async (provider, withWrite) => {
    return await getContract(
        crowdfundContractAddress,
        crowdFundAbi,
        provider,
        withWrite
    );
};

    export const formatDate = (time)=> {
        const date = new Date (time * 1000);

        const year = date.getFullYear();
        const month = date.getMonth() + 1 ;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();


            const monthNames = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",

            ];
            const monthName = monthNames[month - 1];

            const formattedHours = hours < 10 ? `0${hours}` : hours;
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

            const formattedDate = `${monthName}  ${day} , ${year}  ${formattedHours} : ${formattedMinutes} ` ;

            return formattedDate;
    }
  

export const calculateGasMargin = (value) =>
    (toBigInt(value) * toBigInt(120)) / toBigInt(100);
