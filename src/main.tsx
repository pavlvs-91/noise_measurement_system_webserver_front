import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "react-oidc-context";
import { BrowserRouter } from "react-router";
import "./css/index.css";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_Tb65z7qEV",
  client_id: "70bjsk5urnr8c71at6o4o66ccg",
  redirect_uri: "http://localhost:5173/",
  response_type: "code",
  scope: "email openid phone",
  post_logout_redirect_uri: "http://localhost:5173/"
};

const root = ReactDOM.createRoot(document.getElementById("root")!);

// wrap the application with AuthProvider
root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);