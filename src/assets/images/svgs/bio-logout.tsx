import React from 'react';
import {SvgXml} from 'react-native-svg';

import {widthPercentageToDP as widthToDp} from 'react-native-responsive-screen';

const xml = `
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2.66663H24C25.4667 2.66663 26.6667 3.86663 26.6667 5.33329V26.6666C26.6667 28.1333 25.4667 29.3333 24 29.3333H12C10.5334 29.3333 9.33337 28.1333 9.33337 26.6666V24H12V26.6666H24V5.33329H12V7.99996H9.33337V5.33329C9.33337 3.86663 10.5334 2.66663 12 2.66663Z" fill="#f9d649"/>
<path d="M13.4533 20.7867L15.3333 22.6667L22 16L15.3333 9.33337L13.4533 11.2134L16.8933 14.6667H4V17.3334H16.8933L13.4533 20.7867Z" fill="#f9d649"/>
</svg>


`;

export default (props: {width: number; height: number}) => (
  <SvgXml
    xml={xml}
    width={widthToDp(props.width)}
    height={widthToDp(props.height)}
  />
);
