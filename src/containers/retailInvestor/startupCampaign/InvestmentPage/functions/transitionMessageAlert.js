/*eslint no-undef: "error"*/
import decodeMessage from "./decodeMessage";

const transitionMessageAlert = async(
    zilPay,
    transactionId
) => {
    const transition = new Promise((resolve, reject) => {
        const subscription = zilPay.wallet
            .observableTransaction(transactionId)
            .subscribe(async (hash) => {
                subscription.unsubscribe();
                try {
                    const Tx = await zilPay.blockchain.getTransaction(hash[0]);
                    const code = Tx?.receipt?.transitions[0]?.msg?.params[0]?.value;
                    let message
                    if (code){
                        message = decodeMessage(code);
                        console.log(message)
                    }
                    console.log(Tx)
                    console.log(Tx.success)

                    if (message?.type === "success") {
                        resolve(message.alert);
                    }
                    else if(Tx.success){
                        resolve("Transaction Success")
                    }
                    reject(message.alert);
                } catch (err) {
                    reject("Transaction error");
                }
            });
    });

    async function watchTransition(){
        // can just return if no console.log
        return await transition
    }

    return watchTransition()
};

export default transitionMessageAlert;