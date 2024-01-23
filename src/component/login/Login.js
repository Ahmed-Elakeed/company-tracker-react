import "./Login.css";
import {useState} from "react";
import * as AdminService from "../../service/AdminService";
import type {ApiGenericResponse} from "../../dto/ApiGenericResponse";
import {useHistory} from "react-router-dom";
import {useAuth} from "../../security/AuthContext";
import * as SessionUtil from "../../util/SessionUtil";

const Login = () => {
    const {setAuthenticationData } = useAuth();
    const history = useHistory();
    const [loginDTO, setLoginDTO] = useState({
        email: "",
        password: ""
    })
    const [errorMessage, setErrorMessage] = useState(false);
    const adminLogin = (event) => {
        event.preventDefault();
        const loginResponse = async () => {
            try {
                const data = await AdminService.adminLogin(loginDTO);
                console.log('Fetched data:', data);
                return data;
            } catch (error) {
                // Handle error
            }
        };
        loginResponse().then((response: ApiGenericResponse) => {
            if (response.responseCode === 200) {
                setErrorMessage(false);
                let loginData = {
                    "token": response.data.token,
                    "email": response.data.email,
                    "name": response.data.name,
                    "id": response.data.id,
                    "role": response.data.role
                };
                localStorage.setItem("loginData", JSON.stringify(loginData));
                sessionStorage.setItem("loginData", JSON.stringify(loginData));
                setAuthenticationData(SessionUtil.getAuthenticationData());
                history.push("/departments");
            } else {
                setErrorMessage(true);
            }
        });
    }
    return (
        <div>
            <link href={"//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css"} rel="stylesheet"
                  id="bootstrap-css"/>

            <script src={"//netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min.js"}></script>
            <script src={"//code.jquery.com/jquery-1.11.1.min.js"}></script>


            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <span className="navbar-brand">Company-Tracker</span>
            </nav>
            <div className="container">
                <div className="row">
                    {errorMessage &&
                        <div>
                            <div className="alert alert-danger">
                                Invalid email or password
                            </div>
                        </div>
                    }
                    <div className="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
                        <form onSubmit={adminLogin}>
                            <fieldset>
                                <h2>Please Sign In</h2>
                                <hr className="colorgraph"/>
                                <div className="form-group">
                                    <input
                                        onChange={(e) => {
                                            setLoginDTO((prevState) => ({...prevState, email: e.target.value}))
                                        }}
                                        type="email" name="email" id="email" className="form-control input-lg"
                                        placeholder="Email Address" required/>
                                </div>
                                <div className="form-group">
                                    <input
                                        onChange={(e) => {
                                            setLoginDTO((prevState) => ({...prevState, password: e.target.value}))
                                        }}
                                        type="password" name="password" id="password"
                                        className="form-control input-lg"
                                        placeholder="Password" required/>
                                </div>
                                <hr className="colorgraph"/>
                                <div className="row">
                                    <div className="col-xs-6 col-sm-6 col-md-6">
                                        <input type="submit" className="btn btn-lg btn-success btn-block"
                                               value="Sign In"/>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
        ;
}
export default Login;