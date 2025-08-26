import React from "react";
import { AuthProvider } from "./Context/AuthProvider";
import AppRoutes from "./routes";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
