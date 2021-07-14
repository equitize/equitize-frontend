import getCallParameters from "./getCallParameters";
import transitionMessageAlert from "./transitionMessageAlert";
import { decodeZilPayError } from "./decodeMessage";

const donateTransition = async (
    contract,
    zilPay,
    amount
) => {
    try {
        const callTransition = await contract.call(
            "Donate",
            [],
            getCallParameters(zilPay, amount)
        );

        return await transitionMessageAlert(zilPay, callTransition.ID);
    } catch (error) {
        console.log(error)
        return decodeZilPayError(error)
    }
};

export default donateTransition;