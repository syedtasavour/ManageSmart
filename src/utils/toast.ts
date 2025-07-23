import { toast as reactToast } from 'react-toastify';
import type { ToastOptions, Id } from 'react-toastify';

const defaultOptions: ToastOptions = {
    position: 'top-center',
    autoClose: 3000,
    pauseOnHover: true,
    closeOnClick: true,
    draggable: true,
};

const toast = {
    success: (message: string, options?: ToastOptions) =>
        reactToast.success(message, { ...defaultOptions, ...options }),

    error: (message: string, options?: ToastOptions) =>
        reactToast.error(message, { ...defaultOptions, ...options }),

    info: (message: string, options?: ToastOptions) =>
        reactToast.info(message, { ...defaultOptions, ...options }),

    loading: (message: string, options?: ToastOptions): Id =>
        reactToast.loading(message, { ...defaultOptions, ...options }),

    dismiss: (id?: Id) => reactToast.dismiss(id),

    promise: <T>(
        promise: Promise<T>,
        messages: { pending: string; success: string; error: string },
        options?: ToastOptions
    ) => reactToast.promise(promise, {
        pending: messages.pending,
        success: messages.success,
        error: messages.error,
        ...defaultOptions,
        ...options,
    }),
};

export { toast };
