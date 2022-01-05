import React from 'react'
import { Snackbar } from 'react-native-paper';

const AppSnackbar = ({
  visible,
  style,
  onDismiss,
  message,
}: {
  visible: boolean;
  style?: any;
  onDismiss: any;
  message: string;
}) => {
  return (
    <Snackbar
      style={style}
      duration={3000}
      visible={visible}
      onDismiss={onDismiss}>
      {message}
    </Snackbar>
  );
};

export const appSnackbarStyles = {bottom: 20};

export default AppSnackbar
