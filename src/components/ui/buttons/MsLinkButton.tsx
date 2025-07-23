import React from 'react';
import { Button as SemanticButton } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import type { MsLinkButtonProps } from '../../../types/MsLinkButton.interface';
import { variantColorMap } from '../../../utils/variantColorMap';

const MsLinkButton: React.FC<MsLinkButtonProps> = ({
  variant = 'primary',
  size,
  fullWidth = false,
  children,
  className = '',
  disabled,
  to,
  ...props
}) => {
  const navigate = useNavigate();

  const color = variantColorMap[variant];

  return (
    <SemanticButton
      color={color}
      size={size}
      fluid={fullWidth}
      className={`custom-button ${className}`}
      onClick={() => navigate(to)}
      disabled={disabled}
      {...props}
    >
      {children}
    </SemanticButton>
  );
};

MsLinkButton.displayName = 'MsLinkButton';
export { MsLinkButton };
