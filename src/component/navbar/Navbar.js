import "./Navbar.css";
import {useHistory} from "react-router-dom";
import {useAuth} from "../../security/AuthContext";
import * as SessionUtil from "../../util/SessionUtil";
import AdminForm from "../admin/AdminForm/AdminForm";
import React, {useState} from "react";
import {AdminRole} from "../../enums/AdminRole";

const Navbar = () => {
    const [adminFormProps, setAdminFormProps] = useState({
        flag: false,
        data: {name: "", email: "", role: ""}
    })
    const {setAuthenticationData} = useAuth();
    const history = useHistory();
    const titleStyle = {
        fontSize: "x-large",
        fontWeight: "bold",
        color: "green",
    }
    const adminButtonStyle = {
        color: "#a10606",
        fontWeight: "bold",
        fontSize: 'large'
    }
    const logout = (event) => {
        if (event) {
            event.preventDefault();
        }
        sessionStorage.clear();
        localStorage.clear();
        setAuthenticationData(null);
        history.push("/login")
    }

    const openAdminForm = (event) => {
        event.preventDefault()
        setAdminFormProps({
            flag: true,
            data: {
                id: SessionUtil.getAuthenticationData().id,
                name: SessionUtil.getAuthenticationData().name,
                email: SessionUtil.getAuthenticationData().email,
                role: Object.keys(AdminRole).find(key => AdminRole[key] === SessionUtil.getAuthenticationData().role)
            }
        })
    }

    const closeForm = (onlyCloseFlag) => {
        setAdminFormProps({
            flag: false,
            data: {name: "", email: "", role: ""}
        })
        if (onlyCloseFlag) {
            logout();
        }
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <span className="navbar-brand" style={titleStyle}>Company-Tracker</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a href="/departments" className="nav-item nav-link">Departments</a>
                        <a href="/employees" className="nav-item nav-link">Employees</a>
                        <a href="/projects" className="nav-item nav-link">Projects</a>
                        <a href="/tasks" className="nav-item nav-link">Tasks</a>
                        {SessionUtil.getAuthenticationData().role === 0 &&
                            <a href="/admins" className="nav-item nav-link" style={adminButtonStyle}>Admins</a>
                        }
                    </div>
                </div>
                <a href="/true" className="btn btn-primary mb-lg-auto update-button"
                   onClick={openAdminForm}>Update my data</a>
                <a href="/true" className="btn btn-danger mb-lg-auto logout-button"
                   onClick={logout}>Logout</a>
            </nav>
            {adminFormProps.flag &&
                <AdminForm closeForm={closeForm} formProps={adminFormProps}/>}
        </div>
    )
        ;
}
export default Navbar;