import React from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';

const InterestedIndustries = ({ industries, removeInterestedIndustry }) => {

  return industries.map((industry) => (
    <div key={industry.id} className="inline-flex w-auto justify-between ml-1 bg-red-300 px-2 rounded-md items-center text-sm my-1">
      <div>
        {industry.name}
      </div>
      <div className='icons'>
        <RiCloseCircleLine
          onClick={() => removeInterestedIndustry(industry.id)}
          className=' fill-current text-black cursor-pointer text-base ml-2'
        />
      </div>
    </div>
  ));
};

export default InterestedIndustries;