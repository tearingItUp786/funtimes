import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render } from 'react-dom';
import App from './App';

const ContextApp = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};

render(<ContextApp />, document.getElementById('app'));
