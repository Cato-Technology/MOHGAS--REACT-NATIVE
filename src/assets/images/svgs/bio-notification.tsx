import React from 'react';
import {SvgXml} from 'react-native-svg';

import {widthPercentageToDP as widthToDp} from 'react-native-responsive-screen';
const xml = `
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 26C17.6 26 18.5 25.1 18.5 24H14.5C14.5 25.1 15.4 26 16.5 26V26ZM23 20V14.5C23 11.4 20.9 8.9 18 8.2V7.5C18 6.7 17.3 6 16.5 6C15.7 6 15 6.7 15 7.5V8.2C12.1 8.9 10 11.4 10 14.5V20L8 22V23H25V22L23 20V20Z" fill="#f9d649"/>
</svg>

`;

export default (props: {width: number; height: number}) => (
  <SvgXml
    xml={xml}
    width={widthToDp(props.width)}
    height={widthToDp(props.height)}
  />
);
