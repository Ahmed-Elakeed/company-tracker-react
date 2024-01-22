import "./Task.css";
import {useEffect, useState} from "react";
import type {ApiGenericResponse} from "../../dto/ApiGenericResponse";
import * as TaskService from "../../service/TaskService";
import TaskForm from "./taskForm/TaskForm";
import type {TaskDTO} from "../../dto/TaskDTO";
import TaskReport from "./taskReport/TaskReport";

const Task = () => {
    const [tasks, setTasks] = useState([]);
    const [reportFlag, setReportFlag] = useState(false);
    const [taskFormProps, setTaskFormProps] = useState({
        flag: false,
        data: {name: "", description: "", startDate: "", endDate: "", status: "", projectId: "", employeeId: ""}
    })
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
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
    }

    const deleteTask = (taskId) => {
        if (window.confirm('Are sure you want to delete this item ?')) {
            const deleteTask = async () => {
                try {
                    return await TaskService.deleteTaskById(taskId);
                } catch (error) {
                    // Handle error
                }
            };
            deleteTask().then((response: ApiGenericResponse) => {
                if (response.responseCode === 200) {
                    setTasks((prevState) => {
                        return prevState.filter(task => {
                            return task.id !== taskId
                        })
                    })
                }
            })
        }
    }
    const openTaskForm = (event, task) => {
        event.preventDefault()
        if (task) {
            setTaskFormProps({
                flag: true,
                data: task
            })
        } else {
            setTaskFormProps((prevState) => ({
                ...prevState,
                flag: true
            }));
        }
    }
    const closeForm = (onlyCloseFlag) => {
        setReportFlag(false);
        setTaskFormProps({
            flag: false,
            data: {name: "", description: "", startDate: "", endDate: "", status: "", projectId: "", employeeId: ""}
        })
        if (!onlyCloseFlag) {
            fetchTasks()
        }
    }
    return (
        <div>
            <h3 style={{color: '#a30505'}}>Tasks</h3>
            <a href="/true" className="btn btn-success"
               style={{float: "right", marginRight: "5px", marginBottom: "5px"}}
               onClick={openTaskForm}>Add Task</a>
            <a href="/true" className="btn btn-outline-dark"
               style={{float: "right", marginRight: "5px", marginBottom: "5px"}}
               onClick={((e) => {
                   e.preventDefault()
                   setReportFlag(true)
               })}
            >Send Tasks Report</a>
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
                {tasks.map((task: TaskDTO) => (
                    <tr key={task.id}>
                        <td>{task.id}</td>
                        <td>{task.name}</td>
                        <td>{task.description}</td>
                        <td>{new Date(task.startDate).toDateString()}</td>
                        <td>{new Date(task.endDate).toDateString()}</td>
                        <td>{task.status}</td>
                        <td>{task.projectName}</td>
                        <td>{task.employeeName}</td>
                        <td>
                            <button className="btn btn-primary"
                                    onClick={(event) => {
                                        openTaskForm(event, task)
                                    }}>Update
                            </button>
                            |
                            <button className="btn btn-danger"
                                    onClick={() => {
                                        deleteTask(task.id)
                                    }}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {taskFormProps.flag &&
                <TaskForm closeForm={closeForm} formProps={taskFormProps}/>}
            {reportFlag &&
                <TaskReport closeForm={closeForm}/>}
        </div>
    )
        ;
}
export default Task;