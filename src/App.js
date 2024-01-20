import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./component/navbar/Navbar";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./component/login/Login";
import Department from "./component/department/Department";
import Employee from "./component/employee/Employee";
import Project from "./component/project/Project";
import Task from "./component/task/Task";
import Admin from "./component/admin/Admin";
import PageNotFound from "./component/pageNotFound/PageNotFound";
import React from "react";
function App() {
    return (
        <div>
            <Router>
                <Navbar/>
                <Switch>
                    <Route path="/" exact component={Login}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/departments" component={Department}/>
                    <Route path="/employees" component={Employee}/>
                    <Route path="/projects" component={Project}/>
                    <Route path="/tasks" component={Task}/>
                    <Route path="/admins" component={Admin}/>
                    <Route path="*" component={PageNotFound}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
