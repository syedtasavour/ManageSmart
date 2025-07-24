import { MsButton, MsLinkButton, MsConfirmButton } from './components/ui/buttons/index';
import { MSInput } from './components/ui/input/MSInput';
import "./styles/App.css"
import { LoginForm } from './pages/auth/login';

function App() {

  return (
    <><MsButton
        variant="primary"
        children="Click Me"
        className="custom-class"
        loading={false}
        disabled={false}
        onClick={() => console.log('Button clicked')}
        size="mini"
        fullWidth={false}
        apiConfig={{
          url: '/api/example',
          method: 'POST',
          body: { key: 'value' },
          onSuccess: (data: any) => console.log('API call successful:', data),
          onError: (error: any) => console.error('API call failed:', error),
        }}
    ></MsButton>
    <MsLinkButton
        variant="secondary"
        to="/some-path"
        children="Go to Some Path"
        className="custom-link-class"
        disabled={false}
        size="medium"
    ></MsLinkButton>
    <MsConfirmButton
        variant="danger"
        children="Delete Item"
        className="custom-confirm-class"
        loading={false}
        disabled={false}
        onClick={() => console.log('Item deleted')}
        confirmMessage="Are you sure you want to delete this item?"
        confirmButtonText="Yes, Delete"
        size="small"
        apiConfig={{
          url: '/api/delete-item',
          method: 'DELETE',
          onSuccess: (data: any) => console.log('Item deleted successfully:', data),
          onError: (error: any) => console.error('Failed to delete item:', error),
        }}
    ></MsConfirmButton>
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
    ></MSInput>

    <LoginForm />
    
    </>
  )
}

export default App
