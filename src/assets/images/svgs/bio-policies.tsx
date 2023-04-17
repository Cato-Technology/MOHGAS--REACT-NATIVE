import React from 'react';
import {SvgXml} from 'react-native-svg';

import {widthPercentageToDP as widthToDp} from 'react-native-responsive-screen';

const xml = `
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 6V12C16 12.5304 16.2107 13.0391 16.5858 13.4142C16.9609 13.7893 17.4696 14 18 14H24V24C24 24.5304 23.7893 25.0391 23.4142 25.4142C23.0391 25.7893 22.5304 26 22 26H10C9.46957 26 8.96086 25.7893 8.58579 25.4142C8.21071 25.0391 8 24.5304 8 24V8C8 7.46957 8.21071 6.96086 8.58579 6.58579C8.96086 6.21071 9.46957 6 10 6H16Z" fill="#f9d649"/>
<path d="M17.5 6.5V12C17.5 12.1326 17.5527 12.2598 17.6464 12.3536C17.7402 12.4473 17.8674 12.5 18 12.5H23.5L17.5 6.5Z" fill="#06599E"/>
</svg>

`;

export default (props: {width: number; height: number}) => (
  <SvgXml
    xml={xml}
    width={widthToDp(props.width)}
    height={widthToDp(props.height)}
  />
);
