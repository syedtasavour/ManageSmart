import { MsButton, MsLinkButton, MsConfirmButton } from './components/ui/buttons/index';
import "./styles/App.css"

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
    </>
  )
}

export default App
