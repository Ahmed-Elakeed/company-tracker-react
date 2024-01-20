import "./Department.css";
import {useEffect, useState} from "react";
import * as DepartmentService from "../../service/DepartmentService";
import type {ApiGenericResponse} from "../../dto/ApiGenericResponse";
import CustomPopupView from "../customPopupView/CustomPopupView";
import DepartmentForm from "./departmentForm/DepartmentForm";

const Department = () => {
    const [departments, setDepartments] = useState([])
    const [customViewProps, setCustomViewProps] = useState({
        flag: false,
        headers: [],
        data: [],
        width: 0,
        height: 0,
    });
    const [departmentFormProps, setDepartmentFormProps] = useState({
        flag: false
    })
    useEffect(() => {
        initData()
    }, []);

    const initData = () => {
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
            setDepartments(response?.data)
        });
    }

    const showDepartmentEmployees = (departmentId) => {
        const fetchDataFromApi = async () => {
            try {
                const data = await DepartmentService.fetchDepartmentEmployees(departmentId);
                console.log('Fetched data:', data);
                return data;
            } catch (error) {
                // Handle error
            }
        };
        fetchDataFromApi().then((response: ApiGenericResponse) => {
            setCustomViewProps({
                flag: true,
                headers: ["#", "Name", "Email"],
                data: response?.data?.map((obj: any) => {
                    const newObj = {...obj}; // Create a shallow copy of the object
                    delete newObj["departmentName"];
                    delete newObj["departmentId"];// Remove the specified property
                    return newObj;
                }),
                width: "1000px",
                height: "500px"
            })
        });
    }
    const showDepartmentProjects = (departmentId) => {
        const fetchDataFromApi = async () => {
            try {
                const data = await DepartmentService.fetchDepartmentProjects(departmentId);
                console.log('Fetched data:', data);
                return data;
            } catch (error) {
                // Handle error
            }
        };
        fetchDataFromApi().then((response: ApiGenericResponse) => {
            setCustomViewProps({
                flag: true,
                headers: ["#", "Name", "Start Date", "End Date", "Description", "Status"],
                data: response?.data?.map((obj: any) => {
                    const newObj = {...obj}; // Create a shallow copy of the object
                    newObj.startDate = new Date(newObj.startDate).toDateString()
                    newObj.endDate = new Date(newObj.endDate).toDateString()
                    delete newObj["departmentName"];
                    delete newObj["departmentId"];// Remove the specified property
                    return newObj;
                }),
                width: "1000px",
                height: "500px"
            })
        });
    }

    const closePopup = (type, result) => {
        if (type === "FORM") {
            if (result) {
                initData()
            }
            setDepartmentFormProps({
                flag: false
            })
        } else {
            setCustomViewProps({
                flag: false
            })
        }
    }

    const deleteDepartment = (departmentId) => {
        if (window.confirm('Are sure you want to delete this item ?')) {
            const deleteDepartment = async () => {
                try {
                    return await DepartmentService.deleteDepartmentById(departmentId);
                } catch (error) {
                    // Handle error
                }
            };
            deleteDepartment().then((response: ApiGenericResponse) => {
                if (response.responseCode === 200) {
                    setDepartments((prevState) => {
                        return prevState.filter(department => {
                            return department.id !== departmentId
                        })
                    })
                }
            })
        }
    }

    const openDepartmentForm = (event) => {
        event.preventDefault()
        setDepartmentFormProps({
            flag: true
        })
    }
    return (
        <div>
            <h3 style={{color: '#a30505'}}>Departments</h3>
            <a href="/true" className="btn btn-success"
               style={{float: "right", marginRight: "5px", marginBottom: "5px"}}
               onClick={openDepartmentForm}>Add Department</a>
            <table className="table">
                <thead className="thead-dark">
                <tr>
                    <th style={{backgroundColor: 'black', color: 'white'}} scope="col">#</th>
                    <th style={{backgroundColor: 'black', color: 'white'}} scope="col">Name</th>
                    <th style={{backgroundColor: 'black', color: 'white'}} scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {departments?.map((department) => (
                    <tr key={department.id}>
                        <td>{department.id}</td>
                        <td>{department.name}</td>
                        <td>
                            <button className="btn btn-primary"
                                    onClick={() => showDepartmentEmployees(department.id)}>Employees
                            </button>
                            |
                            <button className="btn"
                                    onClick={() => showDepartmentProjects(department.id)}
                                    style={{backgroundColor: "#2eb6e8"}}>Projects
                            </button>
                            |
                            <button className="btn btn-danger"
                                    onClick={() => deleteDepartment(department.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {customViewProps.flag &&
                <CustomPopupView viewProps={customViewProps} closePopup={closePopup}/>}
            {departmentFormProps.flag &&
                <DepartmentForm closePopup={closePopup}/>}
        </div>
    );
}
export default Department;