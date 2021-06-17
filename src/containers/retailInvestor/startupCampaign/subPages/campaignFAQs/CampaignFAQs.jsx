import React from 'react'

function CampaignFAQs(){

    // TODO Where is this FAQs obtained from??

    const faqObject = [
        {
            id:0,
            question: "What is Meetup Mouse?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget ligula sed augue aliquam vehicula et at risus. Donec nec faucibus orci."
        },
        {
            id:1,
            question: "How does Meetup Mouse work?",
            answer: "Integer eget augue dolor. Aliquam sollicitudin, nibh in congue laoreet, ex elit sagittis mi, a aliquam velit metus et sapien. Phasellus vel tortor vel tellus mattis sagittis. Nam eu finibus velit, eu luctus erat. Donec ac scelerisque turpis. Vestibulum ligula dolor, porttitor et vehicula sed, auctor a nisi."
        },
        {
            id:2,
            question: "What makes us different from Burpple?",
            answer: "Phasellus vel tortor vel tellus mattis sagittis. Nam eu finibus velit, eu luctus erat. Donec ac scelerisque turpis. Vestibulum ligula dolor, porttitor et vehicula sed, auctor a nisi."
        },
    ]

    return (
        <div className="space-y-8">
            {
                faqObject ?
                    faqObject.map((item, index) => (
                        <div key={index} className="w-full space-y-3">
                            <p className="font-Inter font-bold text-sm md:text-lg">{item.question}</p>
                            <p className="font-Inter font-light text-xs md:text-base">{item.answer}</p>
                        </div>
                    ))
                    : null
            }
            <br />
        </div>
    )
}



export default CampaignFAQs;