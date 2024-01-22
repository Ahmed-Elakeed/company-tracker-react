import "./EmployeeForm.css";
import {useEffect, useState} from "react";
import * as DepartmentService from "../../../service/DepartmentService";
import type {ApiGenericResponse} from "../../../dto/ApiGenericResponse";
import * as EmployeeService from "../../../service/EmployeeService";

const EmployeeForm = (props) => {
    const [departmentList, setDepartmentList] = useState([]);
    const [employee, setEmployee] = useState(props.formProps.data);
    const [errorMessage, setErrorMessage] = useState(false);
    useEffect(() => {
        const fetchDataFromApi = async () => {
            try {
                const data = await DepartmentService.fetchAllDepartments();
                console.log('Fetched data:', data);
                return data;
            } catch (error) {
                // Handle error
            }
        };
        fetchDataFromApi().then((response: ApiGenericResponse) => {
            setDepartmentList(response?.data)
        });
    }, []);
    const closeForm = (onlyCloseFlag) => {
        props.closeForm(onlyCloseFlag);
    }

    const saveOrUpdateEmployee = (event) => {
        event.preventDefault()
        const savedOrUpdatedEmployee = async () => {
            try {
                const data = await EmployeeService.saveOrUpdateEmployee(employee);
                console.log('Fetched data:', data);
                return data;
            } catch (error) {
                // Handle error
            }
        };
        savedOrUpdatedEmployee().then((response: ApiGenericResponse) => {
            if (response.responseCode === 200) {
                setErrorMessage(false);
                closeForm(false);
            } else {
                setErrorMessage(true);
            }
        })
    }
    return (
        <div className="modal" id="employeeForm" tabIndex="-1" role="dialog">
            <div className="row" style={{marginTop: "20px"}}>
                {errorMessage && employee.departmentId &&
                    <div>
                        <div className="alert alert-danger">
                            Employee with same email already exist
                        </div>
                    </div>
                }
                {errorMessage && !employee.departmentId &&
                    <div>
                        <div className="alert alert-danger">
                            Please select a department
                        </div>
                    </div>
                }
                {!errorMessage &&
                    <div>
                        <div className="alert alert-info">
                            Please fill employee data
                        </div>
                    </div>
                }
            </div>
            <div className="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
                <form onSubmit={saveOrUpdateEmployee}>
                    <fieldset>
                        <div className="form-group">
                            <input value={employee.fullName}
                                   onChange={(e) => {
                                       setEmployee((prevState) => ({...prevState, fullName: e.target.value}))
                                   }}
                                   type="text" name="name" id="name" className="form-control input-group-sm"
                                   placeholder="Employee Full Name" required/>
                        </div>
                        <hr className="colorgraph"/>
                        <div className="form-group">
                            <input value={employee.email}
                                   onChange={(e) => {
                                       setEmployee((prevState) => ({...prevState, email: e.target.value}))
                                   }}
                                   type="email" name="email" id="email" className="form-control input-group-sm"
                                   placeholder="Employee Email" required/>
                        </div>
                        <hr className="colorgraph"/>
                        <div className="form-group">
                            <div className="mb-3">
                                <select
                                    value={employee.departmentId || ''}
                                    onChange={(e) => {
                                        setEmployee((prevState) => ({...prevState, departmentId: e.target.value}))
                                    }}
                                    id="departmentSelect"
                                    className="form-select"
                                    required
                                >
                                    <option value="" disabled>Select a department</option>
                                    {departmentList.map((department) => (
                                        <option key={department.id} value={department.id}>
                                            {department.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12">
                                <button type="submit" className="btn btn-lg btn-success btn-block">Submit</button>
                                <button type="button" className="btn btn-lg btn-danger btn-block"
                                        onClick={()=>{closeForm(true)}}>Close
                                </button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>

    );
}
export default EmployeeForm;