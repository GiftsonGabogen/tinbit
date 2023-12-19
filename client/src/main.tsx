import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import Layout from "./Layout";
import ErrorPage from "./error-page";
import Register from "routes/Register";
import Home from "routes/Home";
import Login from "routes/Login";
import RequireAuth from "components/RequireAuth";
import MyAccount from "routes/MyAccount";
import Url from "routes/Url";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ShortUrl from "routes/ShortUrl";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route path="" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path=":short_url" element={<ShortUrl />} />
      {/* protected routes */}
      <Route element={<RequireAuth />}>
        <Route element={<MyAccount />} path="me" />
        <Route element={<Url />} path="urls" />
      </Route>
    </Route>
  )
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <GoogleOAuthProvider
          clientId={import.meta.env.VITE_REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
        >
          <RouterProvider router={router} />
        </GoogleOAuthProvider>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
