import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes.jsx';
import UserContextProvider from './Context/UserContext.jsx';

function App() {
  return <UserContextProvider>
            <RouterProvider router={router} />
  </UserContextProvider>
}

export default App;
