import { MsButton, MsLinkButton, MsConfirmButton } from './components/ui/buttons/index';
import { MSInput } from './components/ui/input/MSInput';
import './styles/App.css';
import { LoginForm } from './pages/auth/login';

function App() {
  return (
    <>
      {/* Example 1: MsButton with API config and toast messages */}
      <MsButton
        variant="primary"
        children="API Call with Toast"
        className="custom-class"
        loading={false}
        disabled={false}
        size="mini"
        fullWidth={false}
        apiConfig={{
          url: '/',
          method: 'POST',
          body: { key: 'value' },
          onSuccess: (data: any) => console.log('API call successful:', data),
          onError: (error: any) => console.error('API call failed:', error),
          pendingMessage: 'Processing your request...',
          successMessage: 'Operation completed successfully!',
          errorMessage: 'Something went wrong. Please try again.',
        }}
      />

      {/* Example 2: MsButton with custom onClick and toast */}
      <MsButton
        variant="success"
        children="Custom Action with Toast"
        className="custom-class"
        loading={false}
        disabled={false}
        onClick={async () => {
          // Simulate async operation
          await new Promise(resolve => setTimeout(resolve, 1000));
          console.log('Custom action completed');
        }}
        size="mini"
        fullWidth={false}
        toastConfig={{
          successMessage: 'Custom action completed successfully!',
          errorMessage: 'Custom action failed!',
          showOnClick: true,
          infoMessage: 'Starting custom action...',
        }}
      />

      {/* Example 3: Simple MsButton with info toast on click */}
      <MsButton
        variant="info"
        children="Info Toast on Click"
        className="custom-class"
        loading={false}
        disabled={false}
        onClick={() => console.log('Info button clicked')}
        size="mini"
        fullWidth={false}
        toastConfig={{
          showOnClick: true,
          infoMessage: 'You clicked the info button!',
        }}
      />

      <MsLinkButton
        variant="secondary"
        to="/some-path"
        children="Go to Some Path"
        className="custom-link-class"
        disabled={false}
        size="medium"
      />

      <MsConfirmButton
        variant="danger"
        size="small"
        className="custom-confirm-class"
        loading={false}
        disabled={false}
        onClick={() => console.log('Delete button clicked')}
        confirmMessage="Are you sure you want to delete this item?"
        confirmButtonText="Yes, Delete"
        apiConfig={{
          url: '/',
          method: 'DELETE',
          onSuccess: (data) => console.log('Item deleted successfully:', data),
          onError: (error) => console.error('Failed to delete item:', error),
          pendingMessage: 'Deleting item...',
          successMessage: 'Item deleted!',
          errorMessage: 'Failed to delete item!',
        }}
      >
        Delete Item
      </MsConfirmButton>

      <MSInput
        label="Example Input"
        id="example-input"
        name="example"
        type="text"
        placeholder="Enter text here"
        value=""
        onChange={(e: any) => console.log('Input changed:', e.target.value)}
        fullWidth={false}
        error={false}
        errorText=""
        helperText="This is a helper text."
        prefixIcon="search"
        suffixIcon="check"
        loading={false}
        disabled={false}
        className="w-[300px]"
      />

      <LoginForm />
    </>
  );
}

export default App;
