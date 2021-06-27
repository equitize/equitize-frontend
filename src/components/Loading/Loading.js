import React from 'react'
import PropTypes from "prop-types";
import Lottie from 'react-lottie'
import * as loadingAnimation from '../../animations/Loading.json'
import * as doneAnimation from '../../animations/Done.json'

const Loading = ({loading}) => {
    console.log(loading)

    const options = {
        animationData: loadingAnimation.default,
        loop: true,
        autoplay: true,
    };

    const doneOptions = {
        animationData: doneAnimation.default,
        loop: false,
        autoplay: true,
    }

    return (
        <div className="mt-10">
            { !loading ? (
                <Lottie options={options} height={120} width={120} />
            ) : (
                <Lottie options={doneOptions} height={120} width={120} />
            )
            }
            
        </div>
    )
}

Loading.propTypes = {
    loading: PropTypes.boolean
}

export default Loading