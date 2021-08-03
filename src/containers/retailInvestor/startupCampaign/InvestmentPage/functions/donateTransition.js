import getCallParameters from "./getCallParameters";
import transitionMessageAlert from "./transitionMessageAlert";
import { decodeZilPayError } from "./decodeMessage";

const donateTransition = async (
    contract,
    zilPay,
    amount,
    setTransactionMessage,
    setTransactionLink
) => {
    try {
        // Actual XSGD has 6 decimals instead of 8
        const callTransition = await contract?.call(
            "Donate",
            [
                {
                    vname: 'amount',
                    type: 'Uint128',
                    value: `${amount * 100000000}`,
                },
            ],
            getCallParameters(zilPay)
        );
        setTransactionLink(getTransactionLink(callTransition.ID))

        return await transitionMessageAlert(zilPay, callTransition.ID);
    } catch (error) {
        const errorMessage = decodeZilPayError(error)
        setTransactionMessage(errorMessage)
    }
};

function getTransactionLink(transactionId){
    // For Testnet currently
    return `https://viewblock.io/zilliqa/tx/${transactionId}?network=testnet`
}

export default donateTransition;