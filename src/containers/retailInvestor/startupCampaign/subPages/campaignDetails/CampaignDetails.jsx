import React, { useState } from 'react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import PropTypes from "prop-types";

function CampaignDetails({ campaignPDF }){
    const [numPages, setNumPages] = useState(null);
    const [dimensions, setDimensions] = React.useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const handleResize = () => {
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }

    function getPdfWidth(windowWidth){
        if (windowWidth >= 1280){
            return "800"
        }
        else if (windowWidth >= 1024){
            return "700"
        }
        else if (windowWidth >= 768){
            return "500"
        }
        else if (windowWidth >= 640){
            return "450"
        }
        else {
            return windowWidth * 2/3
        }
    }

    React.useEffect(() => {
        window.addEventListener("resize", handleResize, false);
    }, []);

    const options = {
        cMapUrl: 'cmaps/',
        cMapPacked: true,
    };

    function onDocumentLoadSuccess({ numPages: nextNumPages }) {
        setNumPages(nextNumPages);
    }

    return (
        <>
            <div className="w-full flex place-content-center">
                {
                    campaignPDF ?
                        <Document
                            file={campaignPDF}
                            onLoadSuccess={onDocumentLoadSuccess}
                            options={options}
                        >
                            {
                                Array.from(
                                    new Array(numPages),
                                    (el, index) => (
                                        <Page
                                            key={`page_${index + 1}`}
                                            pageNumber={index + 1}
                                            width={getPdfWidth(dimensions.width)}
                                            renderTextLayer={false}
                                        />
                                    ),
                                )
                            }
                        </Document>
                        : null
                }
            </div>
        </>
    )
}

CampaignDetails.propTypes = {
    campaignPDF: PropTypes.any
}

export default CampaignDetails;