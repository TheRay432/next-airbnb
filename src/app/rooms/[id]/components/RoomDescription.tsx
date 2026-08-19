import React from 'react';

interface RoomDescriptionProps {
  description: string;
}

const RoomDescription = ({ description }: RoomDescriptionProps) => {
  return (
    <div className="py-8 border-b border-lightgray">
      <h2 className="text-xl font-semibold mb-4">關於此房源</h2>
      {description.split('\n\n').map((paragraph, index) => (
        <p key={index} className="text-sm leading-7 mb-4 last:mb-0">
          {paragraph}
        </p>
      ))}
    </div>
  );
};

export default RoomDescription;
