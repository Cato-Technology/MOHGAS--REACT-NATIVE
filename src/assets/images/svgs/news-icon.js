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
        d="M17.12,19.81c.12-1.44,2.44-2.94,4-3.62,1.56-.69,3-.94,2.81-2.12-.19-1.19-.62-2.06-3.06-2.06s-1.38,3.25-3.38,1.31,.44-1.44,1.44-1.88,2-2.25,.25-2.38-1.37,.75-2.75,.25-2,1.75-2.87,1.44c-.58-.21-2.13-1.37-3.15-2.51-2.07,1.74-3.73,3.95-4.85,6.45,.3,3.36,2.13,5.12,2.13,5.12,0,0,.94,2.19,6.56,4.88,0,0,1.06,.06-.19-1.19s-2.62-2.81-1.06-3.62c1.56-.81,2-.75,2.38,.75s1.62,.62,1.75-.81Zm7.38,6.56c-2.12-1.81-1.88-2.62-4.56-2.62s-4.37,.62-3.69,4.38c.69,3.75,2.69,2.06,2.5,4.94-.19,2.88,.5,3.5,.94,4.19,.44,.69,1.75,2.69,2.25-.12s1.44-4.38,2.5-5.75c1.06-1.38,2.19-3.19,.06-5ZM22,0C9.85,0,0,9.85,0,22s9.85,22,22,22,22-9.85,22-22S34.15,0,22,0Zm0,42c-11.05,0-20-8.95-20-20S10.95,2,22,2s20,8.95,20,20-8.95,20-20,20Zm17.92-21.67c-.02-.17-.04-.34-.06-.52-.05-.38-.1-.76-.17-1.13-.04-.19-.07-.38-.11-.57-.08-.37-.18-.73-.28-1.09-.05-.16-.09-.33-.14-.49-.15-.48-.33-.96-.52-1.42-.08-.2-.18-.39-.27-.58-.13-.28-.25-.55-.39-.82-.12-.24-.25-.47-.39-.7-.12-.2-.24-.41-.37-.61-.16-.25-.32-.5-.49-.74-.09-.13-.19-.26-.29-.39-.7-.94-1.49-1.81-2.36-2.6-.05-.05-.11-.1-.16-.15-.31-.27-.63-.54-.96-.79-.02-.01-.03-.03-.05-.04-1.42-1.08-3.01-1.96-4.71-2.59-.51,.81-1.03,1.85-1.63,2.19-.87,.5-.81,2.5,.87,2.31,0,0-.5,.5,0,2.31s1.34,2.21,3.81,1.19c1.06-.44,1.87-.21,1.75,.88-.25,2.31-2.03,2.21-.69,5.94,.81,2.25,2.81,3.12,3.56,4.88,.41,.96,2,1.85,3.34,2.45,.14-.47,.26-.95,.37-1.44,.04-.18,.07-.37,.11-.56,.07-.36,.12-.73,.17-1.1,.02-.17,.04-.35,.06-.52,.05-.54,.08-1.08,.08-1.64s-.03-1.12-.08-1.67Zm-6.82,5.89c-.72,.44-.69,1.41-.09,1.94,.59,.53,1.78,1.22,2.16,0,.38-1.22-1.34-2.38-2.06-1.94Z"
        fill={props.fill}
      />
    </Svg>
  );
}

export default SvgComponent;
