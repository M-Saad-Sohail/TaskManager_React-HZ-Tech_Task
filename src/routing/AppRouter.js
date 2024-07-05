import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Users from "../components/Users";
import UsersInfo from "../components/UsersInfo";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Users />} />
        <Route path="/userinfo/:id" exact element={<UsersInfo />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
