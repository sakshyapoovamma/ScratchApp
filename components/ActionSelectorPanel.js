import React, { useState, useRef } from 'react';
import { View, Button, StyleSheet, FlatList, PanResponder, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ActionSelectorPanel = () => {
  const [availableActions, setAvailableActions] = useState([
    { id: 'move', title: 'Move', color: '#FFD700' },
    { id: 'jump', title: 'Jump', color: '#87CEEB' },
    { id: 'spin', title: 'Spin', color: '#FF1493' },
    { id: 'dance', title: 'Dance', color: '#32CD32' },
  ]);
  const [orderActions, setOrderActions] = useState([]);
  const draggedAction = useRef(null);
  const pan = useRef({}).current;
  const panResponder = useRef({}).current;

  const handleActionSelect = (action) => {
    setOrderActions([...orderActions, action]);
  };

  const handleActionRemove = (action) => {
    const updatedOrderActions = orderActions.filter((item) => item !== action);
    setOrderActions(updatedOrderActions);
  };

  const handleDragRelease = (action) => {
    draggedAction.current = action;
    setOrderActions((prevActions) => [...prevActions, action]);
    Animated.spring(pan[action.id], {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const createPanResponder = (action) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: pan[action.id].x, dy: pan[action.id].y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        if (draggedAction.current) {
          draggedAction.current = null;
        }
        Animated.spring(pan[action.id], {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    });
  };

  const renderAvailableActionItem = ({ item }) => {
    const { id, title, color } = item;

    if (!pan[id]) {
      pan[id] = new Animated.ValueXY();
      panResponder[id] = createPanResponder(item);
    }

    return (
      <Animated.View
        style={[styles.availableActionItem, { backgroundColor: color }, pan[id].getLayout()]}
        {...panResponder[id].panHandlers}
        onTouchEnd={() => handleDragRelease(item)}
      >
        <Button title={title} onPress={() => handleActionSelect(item)} color="#FFFFFF" />
      </Animated.View>
    );
  };

  const renderOrderActionItem = ({ item }) => {
    const { id, title, color } = item;

    return (
      <View style={[styles.orderActionItem, { backgroundColor: color }]}>
        <Button title={title} onPress={() => handleActionSelect(item)} color="#FFFFFF" />
        <FontAwesome
          name="times"
          size={18}
          color="#FFFFFF"
          style={styles.orderActionIcon}
          onPress={() => handleActionRemove(item)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftPanel}>
        <FlatList
          data={availableActions}
          renderItem={renderAvailableActionItem}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={styles.rightPanel}>
        <FlatList
          data={orderActions}
          renderItem={renderOrderActionItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
  },
  leftPanel: {
    flex: 1,
    paddingRight: 10,
  },
  rightPanel: {
    flex: 2,
    backgroundColor:'rgb(222, 218, 218)',
    // Added zIndex property
  },
  availableActionItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  orderActionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 3,
    borderRadius: 20,
    zIndex: 1, 
    
  },
  orderActionIcon: {
    marginLeft: 5,
  },
});

export default ActionSelectorPanel;
