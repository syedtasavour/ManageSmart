import React from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';

interface LoadingSpinnerProps {
  active?: boolean;
  text?: string;
  size?: 'mini' | 'tiny' | 'small' | 'medium' | 'large' | 'big' | 'huge' | 'massive';
}

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