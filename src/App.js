import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "./component/login/Login";
import Department from "./component/department/Department";
import Employee from "./component/employee/Employee";
import Project from "./component/project/Project";
import Task from "./component/task/Task";
import Admin from "./component/admin/Admin";
import PageNotFound from "./component/pageNotFound/PageNotFound";
import React from "react";
import {AuthProvider} from './security/AuthContext';
import PrivateRoute from './security/PrivateRoute';

function App() {
    return (
        <div>
            <Router>
                <AuthProvider>
                    <Switch>
                        <Route path="/" exact component={Login}/>
                        <Route path="/login" component={Login}/>
                        <PrivateRoute path="/departments" component={Department}/>
                        <PrivateRoute path="/employees" component={Employee}/>
                        <PrivateRoute path="/projects" component={Project}/>
                        <PrivateRoute path="/tasks" component={Task}/>
                        <PrivateRoute path="/admins" component={Admin}/>
                        <Route path="*" component={PageNotFound}/>
                    </Switch>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
