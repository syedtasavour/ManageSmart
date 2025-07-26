import { MsButton, MsLinkButton, MsConfirmButton } from './components/ui/buttons/index';
import './styles/App.css';
import { LoginForm } from './pages/auth/login';
import { useApiQuery } from './hooks/useApiQuery';
import { useEffect,useState } from 'react';

function App() {
  // Create state for fetched data
  const [fetchedData, setFetchedData] = useState<any>(null);

  // Use useApiQuery to fetch data and update state
  const { data } = useApiQuery('/', {
    params: { limit: 10 },
    successMessage: 'Data loaded!',
    onSuccess: (data) => {
      setFetchedData(data);
      console.log('Fetched:', data);
    },
  });

  // Optionally, keep fetchedData in sync with data from useApiQuery
  useEffect(() => {
    if (data !== undefined && data !== null) {
      setFetchedData(data);
    }
  }, [data]);

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
          await new Promise((resolve) => setTimeout(resolve, 1000));
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

      <LoginForm />
      <div>
        {fetchedData && (
          <div>
            <h3>Fetched Data:</h3>
            <pre style={{ textAlign: 'left', background: '#f5f5f5', padding: 8, borderRadius: 4 }}>
              {JSON.stringify(fetchedData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
