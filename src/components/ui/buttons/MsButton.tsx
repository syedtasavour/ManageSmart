import React, { useState } from 'react';
import { Button as SemanticButton } from 'semantic-ui-react';
import type { MsButtonProps } from '../../../types/MsButton.interface';
import { variantColorMap } from '../../../utils/variantColorMap';
import { apiClient } from '../../../utils/apiClient';
import { ApiError } from '../../../utils/ApiError';
import { toast } from '../../../utils/toast';

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
  toastConfig,
  ...props
}) => {
  const [internalLoading, setInternalLoading] = useState(false);

  const color = variantColorMap[variant];

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // Show info toast on click if configured
    if (toastConfig?.showOnClick && toastConfig.infoMessage) {
      toast.info(toastConfig.infoMessage);
    }

    // Handle local onClick (sync or async)
    if (onClick) {
      const result = onClick(e);
      if (result instanceof Promise) {
        try {
          setInternalLoading(true);
          await result;
          
          // Show success toast for custom onClick if configured
          if (toastConfig?.successMessage) {
            toast.success(toastConfig.successMessage);
          }
        } catch (error) {
          // Show error toast for custom onClick if configured
          if (toastConfig?.errorMessage) {
            toast.error(toastConfig.errorMessage);
          }
          console.error('Error in onClick:', error);
        } finally {
          setInternalLoading(false);
        }
      } else if (toastConfig?.successMessage) {
        // Show success toast for sync onClick if configured
        toast.success(toastConfig.successMessage);
      }
    }

    // Handle API call if apiConfig is provided
    if (apiConfig) {
      try {
        setInternalLoading(true);

        // Show pending toast if message is provided
        if (apiConfig.pendingMessage) {
          toast.loading(apiConfig.pendingMessage);
        }

        const response = await apiClient(apiConfig.url, {
          method: apiConfig.method ?? (apiConfig.body ? 'POST' : 'GET'),
          body: apiConfig.body,
          headers: apiConfig.headers,
        });

        // Dismiss any pending toast
        toast.dismiss();

        // Show success toast if message is provided
        if (apiConfig.successMessage) {
          toast.success(apiConfig.successMessage);
        }

        apiConfig.onSuccess?.(response.data);
      } catch (error) {
        // Dismiss any pending toast
        toast.dismiss();

        // Show error toast if message is provided
        if (apiConfig.errorMessage) {
          toast.error(apiConfig.errorMessage);
        }

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
