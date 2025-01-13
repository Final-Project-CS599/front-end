import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes.jsx';
import UserContextProvider from './Context/UserContext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
      <ReactQueryDevtools initialIsOpen="false" position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
