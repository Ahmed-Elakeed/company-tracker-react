import "./AdminForm.css";
import {useState} from "react";
import {AdminRole} from "../../../enums/AdminRole";
import type {ApiGenericResponse} from "../../../dto/ApiGenericResponse";
import * as AdminService from "../../../service/AdminService";
import * as SessionUtil from "../../../util/SessionUtil";

const AdminForm = (props) => {
    const [admin, setAdmin] = useState(props.formProps.data);
    const [errorMessage, setErrorMessage] = useState(false);

    const closeForm = (onlyCloseFlag) => {
        props.closeForm(onlyCloseFlag);
    }
    const saveOrUpdateAdmin = (event) => {
        event.preventDefault();
        if (admin.password !== admin.confirmPassword) {
            setErrorMessage(true);
        } else {
            if (admin.oldPassword) {
                const checkAdminOldPassword = async () => {
                    try {
                        const data = await AdminService.validatePassword({
                            email: SessionUtil.getAuthenticationData().email,
                            password: admin.oldPassword
                        });
                        console.log('Fetched data:', data);
                        return data;
                    } catch (error) {
                        // Handle error
                    }
                };
                checkAdminOldPassword().then((response: ApiGenericResponse) => {
                    if (response.responseCode === 200) {
                        setErrorMessage(false);
                        saveOrUpdate(admin, true)
                    } else {
                        setErrorMessage("InvalidOldPassword");
                    }
                })
            } else {
                saveOrUpdate(admin, false);
            }
        }
    }
    const saveOrUpdate = (admin, onlyCloseFlag) => {
        const savedOrUpdatedAdmin = async () => {
            try {
                const data = await AdminService.saveOrUpdateAdmin(admin);
                console.log('Fetched data:', data);
                return data;
            } catch (error) {
                // Handle error
            }
        };
        savedOrUpdatedAdmin().then((response: ApiGenericResponse) => {
            if (response.responseCode === 200) {
                setErrorMessage(false);
                closeForm(onlyCloseFlag);
            } else {
                setErrorMessage(true);
            }
        })
    }

    const allAdminRoles = () => {
        return Object.keys(AdminRole).filter(status => typeof status !== 'number')
    }
    return (
        <div className="modal" id="adminForm" tabIndex="-1" role="dialog">
            <div className="row" style={{marginTop: "20px"}}>
                {errorMessage === "InvalidOldPassword" &&
                    <div>
                        <div className="alert alert-danger">
                            Invalid old password
                        </div>
                    </div>
                }
                {errorMessage && !admin.role &&
                    <div>
                        <div className="alert alert-danger">
                            Please select a role
                        </div>
                    </div>
                }
                {errorMessage === true && admin.password === admin.confirmPassword &&
                    <div>
                        <div className="alert alert-danger">
                            Admin with same email already exist
                        </div>
                    </div>
                }
                {errorMessage && admin.password !== admin.confirmPassword &&
                    <div>
                        <div className="alert alert-danger">
                            Password and confirm password must be the same
                        </div>
                    </div>
                }
                {!errorMessage &&
                    <div>
                        <div className="alert alert-info">
                            Please fill admin data
                        </div>
                    </div>
                }
            </div>
            <div className="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
                <form onSubmit={saveOrUpdateAdmin}>
                    <fieldset>
                        <div className="form-group">
                            <input value={admin.name}
                                   onChange={(e) => {
                                       setAdmin((prevState) => ({
                                           ...prevState,
                                           name: e.target.value
                                       }))
                                   }}
                                   type="text" name="name" id="name" className="form-control input-group-sm"
                                   placeholder="Name" required/>
                        </div>
                        <hr className="colorgraph"/>
                        <div className="form-group">
                            <input value={admin.email}
                                   onChange={(e) => {
                                       setAdmin((prevState) => ({
                                           ...prevState,
                                           email: e.target.value
                                       }))
                                   }}
                                   type="email" name="email" id="email" className="form-control input-group-sm"
                                   placeholder="Email"/>
                        </div>
                        {admin.id &&
                            <div>
                                <hr className="colorgraph"/>
                                <div className="form-group">
                                    <input onChange={(e) => {
                                        setAdmin((prevState) => ({
                                            ...prevState,
                                            oldPassword: e.target.value
                                        }))
                                    }}
                                           type="password" name="oldPassword" id="oldPassword"
                                           className="form-control input-group-sm"
                                           placeholder="Old password" required/>
                                </div>
                            </div>
                        }
                        <hr className="colorgraph"/>
                        <div className="form-group">
                            <input onChange={(e) => {
                                setAdmin((prevState) => ({
                                    ...prevState,
                                    password: e.target.value
                                }))
                            }}
                                   type="password" name="password" id="password"
                                   className="form-control input-group-sm"
                                   placeholder="Password" required/>
                        </div>
                        <hr className="colorgraph"/>
                        <div className="form-group">
                            <input
                                onChange={(e) => {
                                    setAdmin((prevState) => ({
                                        ...prevState,
                                        confirmPassword: e.target.value
                                    }))
                                }}
                                type="password" name="confirmPassword" id="confirmPassword"
                                className="form-control input-group-sm" placeholder="Confirm password" required/>
                        </div>
                        <hr className="colorgraph"/>
                        <div className="form-group">
                            <div className="mb-3">
                                <select
                                    value={admin.role || ''}
                                    onChange={(e) => {
                                        setAdmin((prevState) => ({...prevState, role: e.target.value}))
                                    }}
                                    id="roleSelect"
                                    className="form-select"
                                    disabled={admin.role === "SLAVE"}
                                    required
                                >
                                    <option value="" disabled>Select role</option>
                                    {allAdminRoles().map((role) => (
                                        <option key={role} value={role}>
                                            {role}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12">
                                <button type="submit" className="btn btn-lg btn-success btn-block">Submit</button>
                                <button type="button" className="btn btn-lg btn-danger btn-block"
                                        onClick={() => {
                                            closeForm(false)
                                        }}>Close
                                </button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>

    );
}
export default AdminForm;