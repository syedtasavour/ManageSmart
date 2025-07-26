import React from 'react';
import { Form, type InputProps } from 'semantic-ui-react';

interface SemanticInputProps extends InputProps {
  label?: string;
  errorMessage?: string;
}

export const SemanticInput: React.FC<SemanticInputProps> = ({ label, errorMessage, ...props }) => (
  <Form.Field error={!!errorMessage}>
    {label && <label>{label}</label>}
    <Form.Input {...props} />
    {errorMessage && <span style={{ color: 'red', fontSize: 12 }}>{errorMessage}</span>}
  </Form.Field>
); 