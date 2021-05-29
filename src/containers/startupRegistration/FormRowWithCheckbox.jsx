import React from 'react';
import PropTypes from "prop-types";
import checkBoxGrayIcon from "./checkBoxGray.svg";
import checkBoxFilledIcon from './checkBoxFilled.svg'
import ButtonModal from "../../components/Modal/ButtonModal";

function FormRowWithCheckbox({ buttonText, onClickFunc, checkBoxAlt, modalImg, checked }){
    return(
        <div className="flex flex-wrap space-x-2 lg:space-x-10 w-full justify-evenly lg:justify-end">
            <ButtonModal text={buttonText} onClick={onClickFunc} modalImg={modalImg} />
            {
                checked ?
                    <img src={checkBoxFilledIcon} alt={checkBoxAlt} />
                    :
                    <img src={checkBoxGrayIcon} alt={checkBoxAlt} />
            }
        </div>
    )
}

FormRowWithCheckbox.propTypes = {
    buttonText: PropTypes.string,
    onClickFunc: PropTypes.func,
    checkBoxAlt: PropTypes.string,
    modalImg: PropTypes.element,
    checked: PropTypes.bool
}

export default FormRowWithCheckbox;