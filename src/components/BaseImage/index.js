import React, {useEffect, useState} from 'react';
import Images from '../../assets/Images';
import {ImageBackground, View} from 'react-native';

export default function BaseImage({
  source,
  resizeMode = 'cover',
  placeholder = Images.liveThumbnailDefault,
  style = {},
}) {
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  // useEffect(() => {
  //   if (source && source.uri) {
  //     FastImage.preload([{uri: source.uri}]);
  //   }
  // }, [source]);

  return (
    <View style={[style, {alignItems: 'center'}]}>
      
      {showPlaceholder && <ImageBackground
        source={placeholder}
        style={[style, {position: 'absolute'}]}
        resizeMode={'cover'}
      />}
    </View>
  );
}
