import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import VerifyAccount from "./pages/VerifyAccount";
import ForgotPassword from "./pages/ForgotPassword";
import UpdateForgottenPassword from "./pages/UpdateForgottenPassword";
import Landing from "./pages/Landing";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Cnoversation from "./pages/Conversation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create_new_account" element={<CreateAccount />} />
        <Route path="/verify_account/:token" element={<VerifyAccount />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route
          path="/update_forgotten_password/:token"
          element={<UpdateForgottenPassword />}
        />
        <Route path="/landing" element={<Landing />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/conversation/:id" element={<Cnoversation />} />
        <Route path="/verify_account/:token" element={<VerifyAccount />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route
          path="/update_forgotten_password/:token"
          element={<UpdateForgottenPassword />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
