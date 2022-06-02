import React from 'react'
import { Image, View } from 'react-native';

const Filter2 = ({face}) => {
  const leftEyePositionX=face.LEFT_EYE.x
  const leftEyePositionY=face.LEFT_EYE.y
  const rightEyePosition=face.RIGHT_EYE
  const noseBasePosition=face.NOSE_BASE
  const width = face.bounds.size.width
const height = face.bounds.size.height
    const filterWidth = width * 3.5;
    const filterHeight = height * 0.7;

    const transformAngle = (
        angleRad = Math.atan(
          (rightEyePosition.y - leftEyePositionY) /
            (rightEyePosition.x - leftEyePositionX)
        )
      ) => (angleRad * 180) / Math.PI;
    
      return (
        <View
          style={{
            position: "absolute",
            left: leftEyePositionX - filterWidth * 0.46,
            right: rightEyePosition.x - filterWidth * 0.15,
            top: noseBasePosition.y - filterHeight * 1.5
          }}
        >
          <Image
            source={require("../assets/crown-pic2.png")}
            style={{
              width: filterWidth,
              height: filterHeight,
              resizeMode: "contain",
              transform: [{ rotate: `${transformAngle()}deg` }]
            }}
          />
        </View>
      );
}

export default Filter2;