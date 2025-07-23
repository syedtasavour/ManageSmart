import React, { useState } from 'react';
import { Button as SemanticButton } from 'semantic-ui-react';
import type { MsButtonProps } from '../../../types/MsButton.interface';
import { variantColorMap } from '../../../utils/variantColorMap';
import { apiClient } from '../../../utils/apiClient';
import { ApiError } from '../../../utils/ApiError';

const MsButton: React.FC<MsButtonProps> = ({
  variant = 'primary',
  size,
  fullWidth = false,
  children,
  className = '',
  loading = false,
  onClick,
  disabled,
  apiConfig,
  ...props
}) => {
  const [internalLoading, setInternalLoading] = useState(false);

  const color = variantColorMap[variant];

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // Handle local onClick (sync or async)
    if (onClick) {
      const result = onClick(e);
      if (result instanceof Promise) {
        try {
          setInternalLoading(true);
          await result;
        } finally {
          setInternalLoading(false);
        }
      }
    }

    // Handle API call if apiConfig is provided
    if (apiConfig) {
      try {
        setInternalLoading(true);

        const response = await apiClient(apiConfig.url, {
          method: apiConfig.method ?? (apiConfig.body ? 'POST' : 'GET'),
          body: apiConfig.body,
          headers: apiConfig.headers,
        });

        apiConfig.onSuccess?.(response.data);
      } catch (error) {
        if (error instanceof ApiError) {
          apiConfig.onError?.(error);
        } else {
          console.error('Unexpected error:', error);
          apiConfig.onError?.(error);
        }
      } finally {
        setInternalLoading(false);
      }
    }
  };

  return (
    <SemanticButton
      color={color}
      size={size}
      fluid={fullWidth}
      className={`custom-button ${className}`}
      loading={loading || internalLoading}
      onClick={handleClick}
      disabled={disabled || loading || internalLoading}
      {...props}
    >
      {children}
    </SemanticButton>
  );
};

MsButton.displayName = 'MsButton';

export { MsButton };
