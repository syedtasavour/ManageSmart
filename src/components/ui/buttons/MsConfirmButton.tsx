import React, { useState } from 'react';
import { Button as SemanticButton, Modal } from 'semantic-ui-react';
import { variantColorMap } from '../../../utils/variantColorMap';
import { apiClient } from '../../../utils/apiClient';
import type { MsConfirmButtonProps } from '../../../types/MsConfirmButton.interface';


const MsConfirmButton: React.FC<MsConfirmButtonProps> = ({
  variant = 'danger',
  size,
  fullWidth = false,
  children,
  className = '',
  loading = false,
  onClick,
  disabled,
  apiConfig,
  confirmMessage = 'Are you sure you want to proceed?',
  confirmButtonText = 'Confirm',
  ...props
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [internalLoading, setInternalLoading] = useState(false);

  const color = variantColorMap[variant] ?? 'red';

  const handleConfirm = async () => {
    setInternalLoading(true);
    try {
      if (onClick) {
        const result = onClick(new MouseEvent('click') as any);
        if (result instanceof Promise) {
          await result;
        }
      }

      if (apiConfig) {
        const response = await apiClient(apiConfig.url, {
          method: apiConfig.method ?? (apiConfig.body ? 'POST' : 'GET'),
          body: apiConfig.body,
          headers: apiConfig.headers,
        });
        apiConfig.onSuccess?.(response.data);
      }
    } catch (error) {
      apiConfig?.onError?.(error);
      console.error(error);
    } finally {
      setInternalLoading(false);
      setModalOpen(false);
    }
  };

  return (
    <>
      <SemanticButton
        color={color}
        size={size}
        fluid={fullWidth}
        className={`custom-button ${className}`}
        loading={loading || internalLoading}
        onClick={() => setModalOpen(true)}
        disabled={disabled || loading || internalLoading}
        {...props}
      >
        {children}
      </SemanticButton>

      <Modal
        size="small"
        open={modalOpen}
        onClose={() => !internalLoading && setModalOpen(false)}
      >
        <Modal.Header>Confirmation</Modal.Header>
        <Modal.Content>
          <p>{confirmMessage}</p>
        </Modal.Content>
        <Modal.Actions>
          <SemanticButton
            onClick={() => setModalOpen(false)}
            disabled={internalLoading}
          >
            Cancel
          </SemanticButton>
          <SemanticButton
            color={color}
            loading={internalLoading}
            onClick={handleConfirm}
          >
            {confirmButtonText}
          </SemanticButton>
        </Modal.Actions>
      </Modal>
    </>
  );
};

MsConfirmButton.displayName = 'MsConfirmButton';
export { MsConfirmButton };