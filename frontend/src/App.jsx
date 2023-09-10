import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

// ==============================================================================
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import ProductPage from "./pages/ProductPage";
import UserPage from "./pages/UserPage";
import reduxStore from "./redux/store";
import LoginPage from "./pages/LoginPage";
import Protected from "./components/Protected";
// ==============================================================================

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/dashboard", element: <Dashboard /> },
        {
          path: "/users",
          element: (
            <Protected>
              <UserPage />
            </Protected>
          ),
        },
        { path: "/products", element: <ProductPage /> },
      ],
    },
    { path: "/login", element: <LoginPage /> },
  ]);

  return (
    <ReduxProvider store={reduxStore}>
      <RouterProvider router={router} />
    </ReduxProvider>
  );
}

export default App;
