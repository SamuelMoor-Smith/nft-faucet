import React from 'react';

interface SVGDisplayProps {
  svg: string | null;
  className?: string;
  width?: string;
  height?: string
}

const SVGDisplay: React.FC<SVGDisplayProps> = ({ svg, className, width, height }) => {
  if (!svg) {
    console.log('no svg')
    return null;
  }

  // Create a new DOM parser
  const parser = new DOMParser();

  // Parse the SVG string into an XML document
  const doc = parser.parseFromString(svg, 'image/svg+xml');

  // Get the SVG element from the XML document
  const svgElem = doc.children[0];

  // Get the original width and height
  const originalWidth = svgElem.getAttribute('width');
  const originalHeight = svgElem.getAttribute('height');

  // Set the width and height attributes on the SVG element
  svgElem.setAttribute('width', width ? width : '32px');
  svgElem.setAttribute('height', height ? height : '32px');

  // Set the viewBox attribute to preserve aspect ratio
  svgElem.setAttribute('viewBox', `0 0 ${originalWidth} ${originalHeight}`);

  // Get the modified SVG string
  const modifiedSvgString = svgElem.outerHTML;

  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: modifiedSvgString }} />
  );
};

export default SVGDisplay;
