import { useState } from 'react';
import { TextInput, Alert } from '@mantine/core';
import { FiAlertTriangle } from 'react-icons/fi';

const ErrorMessage = ({ error }) => {

  return (
    <Alert
      icon={<FiAlertTriangle size={16} />}
      color="red"
      styles={{
        message: { whiteSpace: 'nowrap' },
        body: { flex: 0 },
        wrapper: { justifyContent: 'center' } }} >
      {error}
    </Alert>
  )
}

export default ErrorMessage;
