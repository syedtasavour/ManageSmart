import React from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';
import type { LoadingSpinnerProps } from '../../types/ui.interface';

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  active = true, 
  text = 'Loading...', 
  size = 'large' 
}) => {
  return (
    <Dimmer active={active} page>
      <Loader size={size} content={text} />
    </Dimmer>
  );
}; 