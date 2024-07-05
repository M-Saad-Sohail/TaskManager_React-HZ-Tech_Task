import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Users from "../components/Users";
import UsersInfo from "../components/UsersInfo";
// import UserData from "../components/UserData";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Users />} />
        <Route path="/userinfo/:id" exact element={<UsersInfo />} />
        {/* <Route path="/userdata" exact element={<UserData />} /> */}
      </Routes>
    </Router>
  );
}

export default AppRouter;
