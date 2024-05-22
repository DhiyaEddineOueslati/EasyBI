import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import "@/index.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "@/api/api";
import { Auth0Provider } from '@auth0/auth0-react';

export const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
      <Auth0Provider
          domain="dev-03nbyhw3862kg8pd.us.auth0.com"
          clientId="GXMls9GrBobfTat1OUCmRLaG8WbUlfb9"
          authorizationParams={{
              redirect_uri: "http://127.0.0.1:5173/profile"
          }}
      >
          <App />
      </Auth0Provider>,
  </Provider>
);
