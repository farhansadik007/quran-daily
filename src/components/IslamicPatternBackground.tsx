import Svg, { Defs, Pattern, Rect, Path, Circle } from 'react-native-svg';
import { StyleSheet, View, LayoutChangeEvent } from 'react-native';
import { useState } from 'react';

export default function IslamicPatternBackground() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  return (
    <View style={StyleSheet.absoluteFill} onLayout={(e) => setSize(e.nativeEvent.layout)}>

      {size.width > 0 && (
        <Svg width={size.width} height={size.height}>
          <Defs>
            <Pattern id="star8" width={60} height={60} patternUnits="userSpaceOnUse">
              <Rect width={60} height={60} fill="#0f4c3a" />
              <Path
                d="M30 5 L36 24 L55 24 L40 36 L46 55 L30 43 L14 55 L20 36 L5 24 L24 24 Z"
                stroke="#d4a94a"
                strokeWidth={0.5}
                fill="none"
                opacity={0.35}
              />
              <Circle cx={0} cy={0} r={14} stroke="#d4a94a" strokeWidth={0.5} fill="none" opacity={0.35} />
              <Circle cx={60} cy={0} r={14} stroke="#d4a94a" strokeWidth={0.5} fill="none" opacity={0.35} />
              <Circle cx={0} cy={60} r={14} stroke="#d4a94a" strokeWidth={0.5} fill="none" opacity={0.35} />
              <Circle cx={60} cy={60} r={14} stroke="#d4a94a" strokeWidth={0.5} fill="none" opacity={0.35} />
            </Pattern>
          </Defs>
          <Rect width={size.width} height={size.height} fill="url(#star8)" />
        </Svg>
      )}
    </View>
  );
}