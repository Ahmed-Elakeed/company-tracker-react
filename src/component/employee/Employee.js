import "./Employee.css";
import {useEffect, useState} from "react";
import * as EmployeeService from "../../service/EmployeeService";
import type {ApiGenericResponse} from "../../dto/ApiGenericResponse";
import EmployeeForm from "./employeeForm/EmployeeForm";
import type {EmployeeDTO} from "../../dto/EmployeeDTO";

const Employee = () => {
    const [employees, setEmployees] = useState([])
    const [employeeFormProps, setEmployeeFormProps] = useState({
        flag: false,
        data: {fullName: "", email: "", departmentId: ""}
    })
    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = () => {
        const fetchDataFromApi = async () => {
            try {
                const data = await EmployeeService.fetchAllEmployees();
                console.log('Fetched data:', data);
                return data;
            } catch (error) {
                // Handle error
            }
        };
        fetchDataFromApi().then((response: ApiGenericResponse) => {
            setEmployees(response?.data)
        });
    }

    const deleteEmployee = (employeeId) => {
        if (window.confirm('Are sure you want to delete this item ?')) {
            const deleteEmployee = async () => {
                try {
                    return await EmployeeService.deleteEmployeeById(employeeId);
                } catch (error) {
                    // Handle error
                }
            };
            deleteEmployee().then((response: ApiGenericResponse) => {
                if (response.responseCode === 200) {
                    setEmployees((prevState) => {
                        return prevState.filter(employee => {
                            return employee.id !== employeeId
                        })
                    })
                }
            })
        }
    }
    const openEmployeeForm = (event, employee) => {
        event.preventDefault()
        if (employee) {
            setEmployeeFormProps({
                flag: true,
                data: employee
            })
        } else {
            setEmployeeFormProps((prevState) => ({
                ...prevState,
                flag: true
            }));
        }
    }
    const closeForm = (onlyCloseFlag) => {
        setEmployeeFormProps({
            flag: false,
            data: {fullName: "", email: "", departmentId: ""}
        })
        if(!onlyCloseFlag){
            fetchEmployees()
        }
    }
    return (
        <div>
            <h3 style={{color: '#a30505'}}>Employees</h3>
            <a href="/true" className="btn btn-success"
               style={{float: "right", marginRight: "5px", marginBottom: "5px"}}
               onClick={openEmployeeForm}>Add Employee</a>
            <table className="table">
                <thead className="thead-dark">
                <tr>
                    <th style={{backgroundColor: "black", color: "white"}} scope="col">#</th>
                    <th style={{backgroundColor: "black", color: "white"}} scope="col">Name</th>
                    <th style={{backgroundColor: "black", color: "white"}} scope="col">Email</th>
                    <th style={{backgroundColor: "black", color: "white"}} scope="col">Department</th>
                    <th style={{backgroundColor: "black", color: "white"}} scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {employees?.map((employee:EmployeeDTO) => (
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.fullName}</td>
                        <td>{employee.email}</td>
                        <td>{employee.departmentName}</td>
                        <td>
                            <button className="btn btn-primary"
                                    onClick={(event) => {
                                        openEmployeeForm(event, employee)
                                    }}>Update
                            </button>
                            |
                            <button className="btn btn-danger"
                                    onClick={() => {
                                        deleteEmployee(employee.id)
                                    }}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {employeeFormProps.flag &&
                <EmployeeForm closeForm={closeForm} formProps={employeeFormProps}/>}
        </div>
    );
}
export default Employee;