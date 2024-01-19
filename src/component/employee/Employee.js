import "./Employee.css";
import {useEffect, useState} from "react";
import * as EmployeeService from "../../service/EmployeeService";
import type {ApiGenericResponse} from "../../dto/ApiGenericResponse";

const Employee = () => {
    const [employees, setEmployees] = useState([])
    useEffect(() => {
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
    }, []);
    return (
        <div>
            <h3 style={{color: '#a30505'}}>Employees</h3>
            <a href="/true" className="btn btn-success"
               style={{float: "right", marginRight: "5px", marginBottom: "5px"}}>Add Employee</a>
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
                {employees?.map((employee) => (
                <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.fullName}</td>
                    <td>{employee.email}</td>
                    <td>{employee.departmentName}</td>
                    <td>
                        <button className="btn btn-primary">Update</button>
                        |
                        <button className="btn btn-danger">Delete</button>
                    </td>
                </tr>
                ))}
                </tbody>
            </table>

        </div>
    );
}
export default Employee;