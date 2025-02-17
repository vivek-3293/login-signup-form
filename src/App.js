import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./components/AppRouter";
import "../src/index.css";
import { ApiInterceptor } from "./services/api";



function App() {
  return (
    <Router>
      <AuthProvider>
        <AppWithInterceptor />
      </AuthProvider>
    </Router>
  );
}

function AppWithInterceptor() {
  ApiInterceptor();
  return <AppRoutes />;
}


export default App;
