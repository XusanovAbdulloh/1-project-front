import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter } from 'react-router-dom';
import React from "react";


const client = new ApolloClient({
  uri: "http://localhost:3000/gql",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  </BrowserRouter>
);
