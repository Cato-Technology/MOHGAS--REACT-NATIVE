import React from 'react';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="31.965" height="27.5" viewBox="0 0 31.965 27.5">
  <g transform="translate(0.284 0.25)">
    <g transform="translate(0)">
      <path d="M30.993,58.58,18.114,37.221a2.821,2.821,0,0,0-4.831,0L.4,58.58A2.821,2.821,0,0,0,2.82,62.857H28.577a2.821,2.821,0,0,0,2.416-4.277Zm-1.739,1.838a.778.778,0,0,1-.676.395H2.82a.777.777,0,0,1-.665-1.177L15.033,38.277a.776.776,0,0,1,1.33,0L29.242,59.635A.777.777,0,0,1,29.253,60.418Z"
            transform="translate(0 -35.857)"
            fill="#fff"/>
    </g>
    <g transform="translate(14.324 8.41)">
      <g transform="translate(0 0)">
        <path d="M234.962,173.005c-.778,0-1.384.417-1.384,1.157,0,2.257.265,5.5.265,7.757,0,.588.512.834,1.119.834.455,0,1.1-.247,1.1-.834,0-2.257.265-5.5.265-7.757A1.219,1.219,0,0,0,234.962,173.005Z"
              transform="translate(-233.578 -173.005)"
              fill="#fff"/>
      </g>
    </g>
    <g transform="translate(14.267 19.467)">
      <path d="M234.111,353.306a1.46,1.46,0,0,0,0,2.921,1.46,1.46,0,0,0,0-2.921Z"
            transform="translate(-232.651 -353.306)"
            fill="#fff"/>
    </g>
  </g>
</svg>

`;

export default (props: {width: number; height: number}) => (
  <SvgXml
    xml={xml}
    width={widthPercentageToDP(props.width)}
    height={widthPercentageToDP(props.height)}
  />
);
