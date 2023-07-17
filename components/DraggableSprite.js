import React, { useState } from 'react';
import { StyleSheet, View, Image, Button,PanResponder, Text, Dimensions } from 'react-native';

const STAGE_WIDTH = 300; // Customize the stage width
const STAGE_HEIGHT = 300; // Customize the stage height

export default function DraggableSprite({navigation}) {
  const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });

  const handleSpriteMove = (event, gesture) => {
    const { dx, dy } = gesture;
    const newPosition = {
      x: spritePosition.x + dx,
      y: spritePosition.y + dy,
    };

    // Restrict sprite movement within the stage boundaries
    const withinBoundsX = Math.max(0, Math.min(newPosition.x, STAGE_WIDTH - SPRITE_WIDTH));
    const withinBoundsY = Math.max(0, Math.min(newPosition.y, STAGE_HEIGHT - SPRITE_HEIGHT));

    setSpritePosition({ x: withinBoundsX, y: withinBoundsY });
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: handleSpriteMove,
  });

  const stageStyle = {
    ...styles.stage,
    width: STAGE_WIDTH,
    height: STAGE_HEIGHT,
    left: (Dimensions.get('window').width - STAGE_WIDTH) / 2,
    top: (Dimensions.get('window').height - STAGE_HEIGHT) / 2,
  };

  return (
    <View style={styles.container}>
      <View >
        <Button
          title="Add Action"
          onPress={() => navigation.navigate('Profile')}
          style={styles.butt}
        />
      </View>
      <View style={stageStyle} {...panResponder.panHandlers}>
        <Image source={require('./Items/item1.png')} style={[styles.sprite, { left: spritePosition.x, top: spritePosition.y }]} />
      </View>
      <View style={styles.coordinatesContainer}>
        <Text style={styles.coordinatesText}>X: {spritePosition.x.toFixed(0)}</Text>
        <Text style={styles.coordinatesText}>Y: {spritePosition.y.toFixed(0)}</Text>
      </View>
    </View>
  );
}

const SPRITE_WIDTH = 100; // Customize the sprite width
const SPRITE_HEIGHT = 100; // Customize the sprite height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    backgroundColor: '#fff',
  },
  stage: {
    backgroundColor: '#ffffff',
    borderWidth: '1px',
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  sprite: {
    width: SPRITE_WIDTH,
    height: SPRITE_HEIGHT,
    position: 'absolute',
    opacity:0.8
  },
  coordinatesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 500,
    position: 'relative',
    left: 0,
    right: 0,
  },
  coordinatesText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});