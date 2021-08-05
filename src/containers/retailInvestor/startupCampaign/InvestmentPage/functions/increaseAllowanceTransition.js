/*eslint no-undef: "error"*/
import getCallParameters from "./getCallParameters";
import transitionMessageAlert from "./transitionMessageAlert";

let increaseAllowanceTransition = async function (CFContractAddress, contractAddress, zilPay, setTransactionMessage, setTransactionLink){

    //contractAddress is the address of ZRC2 contract
    //spenderAddress is the address of which you want to increase the allowance, eg: your dApp contract

    let contract = await zilPay.contracts.at(contractAddress);
    let contractState = await contract.getState();
    let totalSupply = contractState.total_supply

    try {
        const callTx = await contract.call(
            'IncreaseAllowance',
            [
                {
                    vname: 'spender',
                    type: 'ByStr20',
                    value: CFContractAddress,
                },
                {
                    vname: 'amount',
                    type: 'Uint128',
                    value: totalSupply,
                }
            ],
            getCallParameters(zilPay)
        );
        setTransactionLink(getTransactionLink(callTx.ID))

        return await transitionMessageAlert(zilPay, callTx.ID);
    } catch (err) {
        console.log(err);
        setTransactionMessage(err);
    }
}

function getTransactionLink(transactionId){
    // For Testnet currently
    return `https://viewblock.io/zilliqa/tx/${transactionId}?network=testnet`
}

export default increaseAllowanceTransition;