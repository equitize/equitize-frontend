import React from 'react';
import PropTypes from "prop-types";
import FormButton from "../../components/FormButton/FormButton";
import checkBoxGrayIcon from "./checkBoxGray.svg";

function FormRowWithCheckbox({ buttonText, onClickFunc, checkBoxAlt }){
    return(
        <div className="flex flex-wrap space-x-2 lg:space-x-10 w-full justify-evenly lg:justify-end">
            <FormButton text={buttonText} onClick={onClickFunc} />
            <img src={checkBoxGrayIcon} alt={checkBoxAlt} />
        </div>
    )
}

FormRowWithCheckbox.propTypes = {
    buttonText: PropTypes.string,
    onClickFunc: PropTypes.func,
    checkBoxAlt: PropTypes.string
}

export default FormRowWithCheckbox;