import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        class="cls-1"
        d="M22,0C9.85,0,0,9.85,0,22s9.85,22,22,22,22-9.85,22-22S34.15,0,22,0Zm0,42c-4.98,0-9.52-1.83-13.02-4.84,2.7-2.36,3.98-3,6.96-4.32,3.45-1.52,4.62-4.22,3.22-7.4-.25-.57-.54-1.1-.85-1.66-1.06-1.92-2.3-4.09-2.3-9.06,0-5.88,2.79-5.92,5.01-5.96,1.57-.03,2.34-.3,2.96-.52,.41-.15,.66-.23,1.11-.23,1.85,0,3.9,1.83,3.9,6.96s-.78,6.45-1.96,8.56c-.31,.55-.65,1.16-1,1.88-.69,1.4-.83,2.71-.42,3.89,.53,1.52,1.91,2.76,4.34,3.91,1.99,.94,4.08,2.78,5.2,3.84-3.52,3.07-8.11,4.95-13.14,4.95Zm14.58-6.34c-1.2-1.14-3.5-3.18-5.79-4.26-1.89-.89-2.97-1.8-3.31-2.76-.23-.67-.13-1.44,.32-2.35,.34-.69,.66-1.26,.96-1.78,1.25-2.23,2.21-3.84,2.21-9.53,0-8.53-4.92-8.96-5.9-8.96-.8,0-1.3,.18-1.78,.35-.53,.19-1.08,.38-2.32,.4-2.25,.04-6.97,.12-6.97,7.96,0,5.49,1.43,8.01,2.55,10.03,.29,.52,.56,1.01,.77,1.5,.96,2.17,.26,3.68-2.2,4.77-3.1,1.37-4.56,2.08-7.6,4.76-3.41-3.59-5.52-8.43-5.52-13.77C2,10.95,10.95,2,22,2s20,8.95,20,20c0,5.29-2.07,10.08-5.42,13.66Z"
        // fill="currentColor"
      />
    </Svg>
  );
}

export default SvgComponent;
