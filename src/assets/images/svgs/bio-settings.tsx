import React from 'react';
import {SvgXml} from 'react-native-svg';

import {widthPercentageToDP as widthToDp} from 'react-native-responsive-screen';

const xml = `
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.1075 5.575C17.488 3.475 14.512 3.475 13.8925 5.575L13.7425 6.085C13.6499 6.39939 13.4882 6.68908 13.2691 6.93282C13.05 7.17656 12.7791 7.36817 12.4763 7.4936C12.1736 7.61902 11.8465 7.67509 11.5193 7.65768C11.192 7.64028 10.8728 7.54984 10.585 7.393L10.12 7.138C8.1955 6.091 6.091 8.1955 7.1395 10.1185L7.393 10.585C8.062 11.815 7.4275 13.3465 6.085 13.7425L5.575 13.8925C3.475 14.512 3.475 17.488 5.575 18.1075L6.085 18.2575C6.39939 18.3501 6.68908 18.5118 6.93282 18.7309C7.17656 18.95 7.36817 19.2209 7.4936 19.5237C7.61902 19.8264 7.67509 20.1535 7.65768 20.4807C7.64028 20.808 7.54984 21.1272 7.393 21.415L7.138 21.88C6.091 23.8045 8.1955 25.909 10.1185 24.8605L10.585 24.607C10.8728 24.4502 11.192 24.3597 11.5193 24.3423C11.8465 24.3249 12.1736 24.381 12.4763 24.5064C12.7791 24.6318 13.05 24.8234 13.2691 25.0672C13.4882 25.3109 13.6499 25.6006 13.7425 25.915L13.8925 26.425C14.512 28.525 17.488 28.525 18.1075 26.425L18.2575 25.915C18.3501 25.6006 18.5118 25.3109 18.7309 25.0672C18.95 24.8234 19.2209 24.6318 19.5237 24.5064C19.8264 24.381 20.1535 24.3249 20.4807 24.3423C20.808 24.3597 21.1272 24.4502 21.415 24.607L21.88 24.862C23.8045 25.909 25.909 23.8045 24.8605 21.8815L24.607 21.415C24.4502 21.1272 24.3597 20.808 24.3423 20.4807C24.3249 20.1535 24.381 19.8264 24.5064 19.5237C24.6318 19.2209 24.8234 18.95 25.0672 18.7309C25.3109 18.5118 25.6006 18.3501 25.915 18.2575L26.425 18.1075C28.525 17.488 28.525 14.512 26.425 13.8925L25.915 13.7425C25.6006 13.6499 25.3109 13.4882 25.0672 13.2691C24.8234 13.05 24.6318 12.7791 24.5064 12.4763C24.381 12.1736 24.3249 11.8465 24.3423 11.5193C24.3597 11.192 24.4502 10.8728 24.607 10.585L24.862 10.12C25.909 8.1955 23.8045 6.091 21.8815 7.1395L21.415 7.393C21.1272 7.54984 20.808 7.64028 20.4807 7.65768C20.1535 7.67509 19.8264 7.61902 19.5237 7.4936C19.2209 7.36817 18.95 7.17656 18.7309 6.93282C18.5118 6.68908 18.3501 6.39939 18.2575 6.085L18.1075 5.575V5.575ZM16 20.395C14.8344 20.395 13.7165 19.932 12.8923 19.1077C12.068 18.2835 11.605 17.1656 11.605 16C11.605 14.8344 12.068 13.7165 12.8923 12.8923C13.7165 12.068 14.8344 11.605 16 11.605C17.1652 11.605 18.2827 12.0679 19.1067 12.8918C19.9306 13.7158 20.3935 14.8333 20.3935 15.9985C20.3935 17.1637 19.9306 18.2812 19.1067 19.1052C18.2827 19.9291 17.1652 20.392 16 20.392V20.395Z" fill="#f9d649"/>
</svg>

`;

export default (props: {width: number; height: number}) => (
  <SvgXml
    xml={xml}
    width={widthToDp(props.width)}
    height={widthToDp(props.height)}
  />
);
