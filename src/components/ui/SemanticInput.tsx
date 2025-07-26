import React from 'react';
import { Form, type InputProps } from 'semantic-ui-react';

interface SemanticInputProps extends InputProps {
  label?: string;
  error?: string;
}

export const SemanticInput: React.FC<SemanticInputProps> = ({ label, error, ...props }) => (
  <Form.Field error={!!error}>
    {label && <label>{label}</label>}
    <Form.Input {...props} />
    {error && <span style={{ color: 'red', fontSize: 12 }}>{error}</span>}
  </Form.Field>
); 