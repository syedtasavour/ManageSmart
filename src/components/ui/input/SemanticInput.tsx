import React from 'react';
import { Form } from 'semantic-ui-react';
import type { SemanticInputProps } from '../../../types/ui.interface';

export const SemanticInput: React.FC<SemanticInputProps> = ({ label, errorMessage, ...props }) => (
  <Form.Field error={!!errorMessage}>
    {label && <label>{label}</label>}
    <Form.Input {...props} />
    {errorMessage && <span style={{ color: 'red', fontSize: 12 }}>{errorMessage}</span>}
  </Form.Field>
); 