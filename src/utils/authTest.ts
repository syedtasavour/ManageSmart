// Simple utility to test token storage and retrieval
export const testTokenStorage = () => {
  
  // Test localStorage
  const localToken = localStorage.getItem('accessToken');
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  
  // Test cookies
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('accessToken='));
};

// Test function to manually store a token
export const testStoreToken = (token: string) => {
  localStorage.setItem('accessToken', token);
  localStorage.setItem('isLoggedIn', 'true');
  document.cookie = `accessToken=${token}; path=/; max-age=86400; SameSite=Strict; Secure`;
  testTokenStorage();
}; 