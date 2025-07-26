import React from 'react';
import { Form, type FormProps } from 'semantic-ui-react';

export const SemanticForm: React.FC<FormProps> = (props) => (
  <Form {...props} />
); 