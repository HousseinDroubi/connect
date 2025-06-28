import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import VerifyAccount from "./pages/VerifyAccount";
import ForgotPassword from "./pages/ForgotPassword";
import UpdateForgottenPassword from "./pages/UpdateForgottenPassword";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create_new_account" element={<CreateAccount />} />
        <Route path="/verify_account/:token" element={<VerifyAccount />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route
          path="/update_forgotten_password"
          element={<UpdateForgottenPassword />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
