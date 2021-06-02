import React from "react";
import PropTypes from 'prop-types';
import TextModal from "../../../../../components/Modal/TextModal";

function AcraDocModal({ showModal, setShowModal, id }){
    return(
        <>
            <TextModal header="ACRA Documents Information" setShowModal={setShowModal(id)}
                       showModal={showModal} content="Morbi sagittis mi sed mi feugiat placerat. Vivamus sagittis pulvinar dapibus. Aliquam vitae commodo justo, in tincidunt justo. Nam tempus ante nulla, non aliquet arcu maximus at. Fusce posuere rutrum justo, et tincidunt dui. Sed pharetra lorem sit amet vehicula tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur vehicula purus ut lacus tempus, et laoreet urna efficitur. "
            />
        </>
    )
}

AcraDocModal.propTypes = {
    showModal: PropTypes.bool,
    setShowModal: PropTypes.func,
    id: PropTypes.string
}

export default AcraDocModal;