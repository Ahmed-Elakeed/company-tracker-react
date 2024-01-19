import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Department from "./component/department/Department";
import Employee from "./component/employee/Employee";
import Project from "./component/project/Project";
import Task from "./component/task/Task";
import Admin from "./component/admin/Admin";
import Login from "./component/login/Login";
import PageNotFound from "./component/pageNotFound/PageNotFound";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Login/>} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/departments" element={<Department/>}/>
                <Route path="/employees" element={<Employee/>}/>
                <Route path="/projects" element={<Project/>}/>
                <Route path="/tasks" element={<Task/>}/>
                <Route path="/admins" element={<Admin/>}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </Router>
    );
};

export default AppRouter;
