import "./Task.css";
import {useEffect, useState} from "react";
import type {ApiGenericResponse} from "../../dto/ApiGenericResponse";
import * as TaskService from "../../service/TaskService";

const Task = () => {
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        const fetchDataFromApi = async () => {
            try {
                const data = await TaskService.fetchAllTasks();
                console.log('Fetched data:', data);
                return data;
            } catch (error) {
                // Handle error
            }
        };
        fetchDataFromApi().then((response: ApiGenericResponse) => {
            setTasks(response?.data)
        });
    }, []);
    return (
        <div>
            <h3 style={{color: '#a30505'}}>Tasks</h3>
            <a href="/true" className="btn btn-success"
               style={{float: "right", marginRight: "5px", marginBottom: "5px"}}>Add Task</a>
            <a href="/true" className="btn btn-outline-dark"
               style={{float: "right", marginRight: "5px", marginBottom: "5px"}}>Send Tasks
                Report</a>
            <table className="table">
                <thead className="thead-dark">
                <tr>
                    <th style={{backgroundColor: 'black', color: 'white'}} scope="col">#</th>
                    <th style={{backgroundColor: 'black', color: 'white'}} scope="col">Name</th>
                    <th style={{backgroundColor: 'black', color: 'white'}} scope="col">Description</th>
                    <th style={{backgroundColor: 'black', color: 'white'}} scope="col">Start Date</th>
                    <th style={{backgroundColor: 'black', color: 'white'}} scope="col">End Date</th>
                    <th style={{backgroundColor: 'black', color: 'white'}} scope="col">Status</th>
                    <th style={{backgroundColor: 'black', color: 'white'}} scope="col">Project</th>
                    <th style={{backgroundColor: 'black', color: 'white'}} scope="col">Employee</th>
                    <th style={{backgroundColor: 'black', color: 'white'}} scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {tasks.map((task) => (
                    <tr>
                        <td>{task.id}</td>
                        <td>{task.name}</td>
                        <td>{task.description}</td>
                        <td>{new Date(task.startDate).toDateString()}</td>
                        <td>{new Date(task.endDate).toDateString()}</td>
                        <td>{task.status}</td>
                        <td>{task.projectName}</td>
                        <td>{task.employeeName}</td>
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
    )
        ;
}
export default Task;