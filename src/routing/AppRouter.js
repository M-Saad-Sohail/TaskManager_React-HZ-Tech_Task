import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "../components/Users";
import UsersInfo from "../components/UsersInfo";
import UserEventList from "../components/UserEventList";
import EditTask from "../components/EditTask";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Users />} />
        <Route path="/usereventlist" exact element={<UserEventList />} />
        <Route path="/edittask/:id" exact element={<EditTask />} />
        <Route path="/userinfo/:id" exact element={<UsersInfo />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
