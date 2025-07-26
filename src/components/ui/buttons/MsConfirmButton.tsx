import React, { useState } from 'react';
import { Button as SemanticButton, Modal } from 'semantic-ui-react';
import { variantColorMap } from '../../../utils/variantColorMap';
import { useApiMutation } from '../../../hooks/useApiMutation';
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

    const { mutate, loading: mutationLoading } = useApiMutation(
        apiConfig?.url ?? '',
        {
            method: apiConfig?.method ?? (apiConfig?.body ? 'POST' : 'GET'),
            body: apiConfig?.body,
            headers: apiConfig?.headers,
        },
        {
            pendingMessage: apiConfig?.pendingMessage ?? 'Processing...',
            successMessage: apiConfig?.successMessage ?? 'Action successful!',
            errorMessage: apiConfig?.errorMessage ?? 'Action failed!',
            onSuccess: apiConfig?.onSuccess,
            onError: apiConfig?.onError,
        }
    );

    const color = variantColorMap[variant] ?? 'red';

    const handleConfirm = async () => {
        try {
            if (onClick) {
                const result = onClick(new MouseEvent('click') as any);
                if (result instanceof Promise) {
                    await result;
                }
            }

            if (apiConfig) {
                await mutate(apiConfig.body);
            }
        } catch (error) {
            console.error('Error in handleConfirm:', error);
            // Don't close modal on error, let the user see the error message
            return;
        }
        // Only close modal on success
        setModalOpen(false);
    };

    return (
        <>
            <SemanticButton
                color={color}
                size={size}
                fluid={fullWidth}
                className={`custom-button ${className}`}
                loading={loading || mutationLoading}
                onClick={() => setModalOpen(true)}
                disabled={disabled || loading || mutationLoading}
                {...props}
            >
                {children}
            </SemanticButton>

            <Modal
                size="small"
                open={modalOpen}
                onClose={() => !mutationLoading && setModalOpen(false)}
                closeOnDimmerClick={!mutationLoading}
                closeOnEscape={!mutationLoading}
            >
                <Modal.Header>Confirmation</Modal.Header>
                <Modal.Content>
                    <p>{confirmMessage}</p>
                </Modal.Content>
                <Modal.Actions>
                    <SemanticButton
                        onClick={() => setModalOpen(false)}
                        disabled={mutationLoading}
                    >
                        Cancel
                    </SemanticButton>
                    <SemanticButton
                        color={color}
                        loading={mutationLoading}
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
