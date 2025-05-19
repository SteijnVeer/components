import { useState, useEffect } from 'react';

function createClassName(...classNames) {
  return Array.from(classNames.reduce(
    (acc, className) => {
      if (className) {
        className
          .split(' ')
          .map(s => s.trim())
          .filter(Boolean)
          .forEach(s => acc.add(s));
      }
      return acc;
    }, new Set()
  )).join(' ');
}

export default function Icon({ src, className, ...props }) {
  const [svgContent, setSvgContent] = useState(null);
  const [svgProps, setSvgProps] = useState({});

  useEffect(() => {
    let cancelled = false;
    fetch(src)
      .then(res => res.text())
      .then(text => {
        if (!cancelled) {
          let parser = new DOMParser();
          let svgDoc = parser.parseFromString(text, "image/svg+xml");
          let svg = svgDoc.documentElement;

          const atributes = svg.attributes;
          const properties = {};
          for (let i = 0; i < atributes.length; i++) {
            const attr = atributes[i];
            properties[attr.name] = attr.value;
          }

          properties.className = createClassName('icon', className, properties.class, properties.className);
          delete properties.class;
          
          setSvgProps(properties);
          setSvgContent(svg.innerHTML);
        }
      })
      .catch(err => {
        console.error('Failed to load SVG:', err);
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (!svgContent) return null;

  return (
    <svg 
      {...svgProps}
      {...props}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}