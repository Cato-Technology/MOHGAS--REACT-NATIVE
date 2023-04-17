import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
function SvgComponent(props) {
  return (
    <Svg viewBox="0 0 169.76 250.39" version="1.1" width={18} height={18}>
      <G id="layer1" transform="translate(0 -801.97)">
        <Path
          fill={props.fill ? props.fill : '#000000'}
          d="m99.017 1052.3-90.577-113.33 0.5232-22.46c42.51 2.93 75.559-1.57 83.248-41.78l-90.578-0.52 14.66-24.55 72.253 1.04c-11.009-22.88-41.286-25.7-88.484-24.02l16.231-24.03 153.41-0.22927-15.184 23.731h-42.409c7.7512 8.1823 13.424 17.597 13.613 25.591l43.98-0.52226-15.184 23.502-29.32 0.52229c-4.5772 35.058-36.787 55.815-77.489 60.584l91.184 116.44-39.874 0.022v0.0004z"
        />
      </G>
    </Svg>
  );
}
export default SvgComponent;
