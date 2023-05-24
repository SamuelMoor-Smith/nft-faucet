import React from 'react';

interface SVGDisplayProps {
  svg: string | null;
}

const SVGDisplay: React.FC<SVGDisplayProps> = ({ svg }) => {
  if (!svg) {
    return null;
  }

  return (
    <div
      dangerouslySetInnerHTML={{ __html: svg }}
      style={{ width: '100px', height: '100px', marginLeft: 'auto', marginRight: 'auto' }}
    />
  );
};

export default SVGDisplay;
