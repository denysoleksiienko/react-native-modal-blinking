import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
} from 'react-native';

type Position = {
  width: number;
  top: number;
  left: number;
  height: number;
};

interface CustomDropdownMenuProps {
  renderMenu: () => React.ReactNode;
  children: React.ReactNode;
  disable?: boolean;
  style?: StyleProp<ViewStyle>;
  modalContainerStyle?: ViewStyle;
  maxHeight?: number;
  closeOnOverlay?: boolean;
}

export const CustomDropdownMenu = ({
  renderMenu,
  children,
  disable = false,
  style,
  modalContainerStyle,
  maxHeight,
  closeOnOverlay = true,
}: CustomDropdownMenuProps) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  const viewRef = useRef<View>(null);

  const measure = useCallback(() => {
    if (viewRef.current) {
      viewRef.current.measureInWindow((x, y, width, height) => {
        setPosition({
          width: Math.floor(width),
          top: Math.floor(y),
          left: Math.floor(x),
          height: Math.floor(height),
        });
      });
    }
  }, []);

  const toggleDropdown = useCallback(() => {
    if (!disable) {
      measure();
      setVisible(prev => !prev);
    }
  }, [disable, measure]);

  const closeDropdown = useCallback(() => {
    if (closeOnOverlay && !disable) {
      setVisible(false);
    }
  }, [closeOnOverlay, disable]);

  useEffect(
    () => () => {
      setVisible(false);
    },
    [],
  );

  const renderModal = useCallback(() => {
    if (!visible || !position) {
      return null;
    }

    const { width, top, left } = position;

    const modalStyle: ViewStyle = {
      left,
      top: top,
      width,
      maxHeight,
    };

    return (
      <Modal
        animationType="fade"
        onRequestClose={toggleDropdown}
        supportedOrientations={['portrait']}
        transparent
        visible={visible}>
        <TouchableWithoutFeedback onPress={closeDropdown}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
            <View
              onStartShouldSetResponder={() => true}
              style={[
                { backgroundColor: 'white', borderRadius: 16 },
                modalContainerStyle,
                modalStyle,
              ]}>
              {children}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }, [
    visible,
    position,
    maxHeight,
    toggleDropdown,
    closeDropdown,
    modalContainerStyle,
    children,
  ]);

  return (
    <View
      ref={viewRef}
      onLayout={measure}
      style={[
        {
          height: 40,
          borderRadius: 40,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        },
        style,
      ]}>
      <TouchableWithoutFeedback onPress={toggleDropdown}>
        <View>{renderMenu()}</View>
      </TouchableWithoutFeedback>
      {renderModal()}
    </View>
  );
};
