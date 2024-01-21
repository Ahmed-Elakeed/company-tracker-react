import "./DepartmentForm.css";
import {useState} from "react";
import * as DepartmentService from "../../../service/DepartmentService";
import type {ApiGenericResponse} from "../../../dto/ApiGenericResponse";

const DepartmentForm = (props) => {
    const [department, setDepartment] = useState({id: -1, name: ""})
    const [errorMessage, setErrorMessage] = useState(false);
    const closeForm = (event) => {
        if (event) {
            event.preventDefault();
            props.closeForm("FORM");
        }else{
            props.closeForm("FORM",true);
        }
    }

    const saveDepartment = (event) => {
        event.preventDefault()
        const savedDepartment = async () => {
            try {
                const data = await DepartmentService.saveDepartment(department);
                console.log('Fetched data:', data);
                return data;
            } catch (error) {
                // Handle error
            }
        };
        savedDepartment().then((response: ApiGenericResponse) => {
            if (response.responseCode === 200) {
                setErrorMessage(false);
                closeForm();
            } else {
                setErrorMessage(true);
            }
        })
    }

    const nameChangeHandler = (event) => {
        setDepartment({
            name: event.target.value
        });
    }
    return (
        <div className="modal" id="viewForm" tabIndex="-1" role="dialog">
            <div className="row" style={{marginTop: "20px"}}>
                {errorMessage &&
                    <div>
                        <div className="alert alert-danger">
                            This department already exist
                        </div>
                    </div>
                }
                {!errorMessage &&
                    <div>
                        <div className="alert alert-info">
                            Please fill department data
                        </div>
                    </div>
                }
            </div>
            <div className="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
                <form onSubmit={saveDepartment}>
                    <fieldset>
                        <div className="form-group">
                            <input type="text" name="name" id="name" className="form-control input-group-sm"
                                   value={department.name}
                                   onChange={nameChangeHandler}
                                   placeholder="Department Name"
                                   required/>
                        </div>
                        <hr className="colorgraph"/>
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12">
                                <button type="submit" className="btn btn-lg btn-success btn-block">Save</button>
                                <button type="button" className="btn btn-lg btn-danger btn-block"
                                        onClick={closeForm}>Close
                                </button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}
export default DepartmentForm;