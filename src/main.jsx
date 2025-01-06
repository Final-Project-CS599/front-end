import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { QueryClient, QueryClientProvider } from 'react-query';
import{ReactQueryDevtools} from 'react-query/devtools'

let queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <QueryClientProvider  client={queryClient}>
      <StrictMode>
          <App />
          {/* <ReactQueryDevtools initialIsOpen="false" position='bottom-right'/> */}
      </StrictMode>
  </QueryClientProvider>
)
