import React from 'react'

function CampaignMarketAnalysis(){

    // TODO Special Cases for links not done yet like clickable and blue text color
    // TODO Where is this research obtained from??
    const researchObject = [
        {
            id:0,
            title: "Understanding competition space for Meetup Mouse",
            content: "Integer eget augue dolor. Aliquam sollicitudin, nibh in congue laoreet, ex elit sagittis mi, a aliquam velit metus et sapien. Phasellus vel tortor vel tellus mattis sagittis. Nam eu finibus velit, eu luctus erat. Donec ac scelerisque turpis. Vestibulum ligula dolor, porttitor et vehicula sed, auctor a nisi."
        },
        {
            id:1,
            title: "Market Potential for Meetup Mouse as an organisational application",
            content: "Integer eget augue dolor. Aliquam sollicitudin, nibh in congue laoreet, ex elit sagittis mi, a aliquam velit metus et sapien. Phasellus vel tortor vel tellus mattis sagittis. Nam eu finibus velit, eu luctus erat. Donec ac scelerisque turpis. Vestibulum ligula dolor, porttitor et vehicula sed, auctor a nisi."
        },
        {
            id:2,
            title: "Other useful links",
            content: "Burpple vs Meetup Mouse - a definitive comparison guide"
        },
    ]

    return (
        <div className="space-y-8">
            {
                researchObject ?
                    researchObject.map((item, index) => (
                        <div key={index} className="w-full space-y-3">
                            <p className="font-Inter font-bold text-sm md:text-lg">{item.title}</p>
                            <p className="font-Inter font-light text-xs md:text-base">{item.content}</p>
                        </div>
                    ))
                    : null
            }
            <br />
        </div>
    )
}



export default CampaignMarketAnalysis;