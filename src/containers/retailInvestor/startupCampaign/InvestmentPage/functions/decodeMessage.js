/*
Converts the message codes from the contract to a human-readable form.
*/

const messageCodes = {
    "1": {
        alert: "Successful Donation",
        name: "accepted_code",
        type: "success",
    },
    "2": {
        alert: "Deadline is over",
        name: "missed_deadline_code",
        type: "error"
    },
    "3": {
        alert: "User has already backed the campaign",
        name: "already_backed_code",
        type: "error",
    },
    "4": {
        alert: "User is not the owner",
        name: "not_owner_code",
        type: "error",
    },
    "5": {
        alert: "Too early",
        name: "too_early_code",
        type: "error",
    },
    "6": {
        alert: "Campaign is successful",
        name: "campaign_success_code",
        type: "success",
    },
    "7": {
        alert: "Campaign Error",
        name: "campaign_error_code",
        type: "error",
    },
    "8": {
        alert: "Cannot reclaim funds",
        name: "cannot_reclaim_code",
        type: "error",
    },
    "9": {
        alert: "Funds reclaimed",
        name: "reclaimed_code",
        type: "success",
    },
    "10": {
        alert: "Modify deadline successful",
        name: "set_crowdfunding_deadline_successful_code",
        type: "success",
    },
    "11": {
        alert: "Mark Milestone one as completed",
        name: "milestone_one_completed_code",
        type: "success",
    },
    "12": {
        alert: "Funds on completed milestone claimed",
        name: "milestone_claimed_code",
        type: "success",
    },
    "13": {
        alert: "Milestone One is not completed",
        name: "milestone_one_not_completed_code",
        type: "error",
    },
    "14": {
        alert: "Mark Milestone Two as completed",
        name: "milestone_two_completed_code",
        type: "success",
    },
    "15": {
        alert: "Milestone Two is not completed",
        name: "milestone_two_not_completed_code",
        type: "error",
    },
    "16": {
        alert: "Mark Milestone Three as completed",
        name: "milestone_three_completed_code",
        type: "success",
    },
    "17": {
        alert: "Set Milestone Deadline success",
        name: "set_milestone_deadline_successful_code",
        type: "success",
    },
    "18": {
        alert: "Deadline for milestone is over",
        name: "milestone_deadline_over_code",
        type: "error",
    },
    "19": {
        alert: "Deadline for milestone is not over yet",
        name: "milestone_deadline_not_over_yet_code",
        type: "error",
    },
    "20": {
        alert: "Successful refund for retail investor",
        name: "milestone_refund_retail_investor_code",
        type: "success",
    },
    "21": {
        alert: "Caller not owner or not funded",
        name: "not_owner_or_not_funded_code",
        type: "error",
    }
};

const decodeMessage = (code) => {
    return messageCodes[code];
};

export const decodeZilPayError = (error) => {
    switch (error) {
        case "Insufficient funds in source account!":
            return "Insufficient funds for transaction";
        case "User rejected":
            return "Transaction rejected from ZilPay";
        default:
            return error;
    }
};

export default decodeMessage;