import React from 'react';
import {SvgXml} from 'react-native-svg';

import {widthPercentageToDP as widthToDp} from 'react-native-responsive-screen';

const xml = `
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.5 16C21.88 16 22.99 14.88 22.99 13.5C22.99 12.12 21.88 11 20.5 11C19.12 11 18 12.12 18 13.5C18 14.88 19.12 16 20.5 16V16ZM13 15C14.66 15 15.99 13.66 15.99 12C15.99 10.34 14.66 9 13 9C11.34 9 10 10.34 10 12C10 13.66 11.34 15 13 15V15ZM20.5 18C18.67 18 15 18.92 15 20.75V23H26V20.75C26 18.92 22.33 18 20.5 18V18ZM13 17C10.67 17 6 18.17 6 20.5V23H13V20.75C13 19.9 13.33 18.41 15.37 17.28C14.5 17.1 13.66 17 13 17V17Z" fill="#f9d649"/>
</svg>

`;

export default (props: {width: number; height: number}) => (
  <SvgXml
    xml={xml}
    width={widthToDp(props.width)}
    height={widthToDp(props.height)}
  />
);
