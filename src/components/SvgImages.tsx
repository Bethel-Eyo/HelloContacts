import * as React from 'react';
import Svg, {
  G,
  Path,
  Defs,
  ClipPath,
  Pattern,
  Use,
  Image,
  Stop,
  LinearGradient,
  Mask,
  Rect,
  Circle,
  Ellipse
} from 'react-native-svg';

export const PlusIcon = (props: any) => (
  <Svg
    width={14}
    height={14}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path d="M14 8H8v6H6V8H0V6h6V0h2v6h6v2z" fill="#fff" />
  </Svg>
)