import "./TaskForm.css";
import {useEffect, useState} from "react";
import type {ApiGenericResponse} from "../../../dto/ApiGenericResponse";
import * as ProjectService from "../../../service/ProjectService";
import {TaskStatus} from "../../../enums/TaskStatus";
import * as TaskService from "../../../service/TaskService";

const TaskForm = (props) => {
    const [projectList, setProjectList] = useState([]);
    const [employeeList, setEmployeeList] = useState([]);
    const [task, setTask] = useState(props.formProps.data);
    const [errorMessage, setErrorMessage] = useState(false);

    useEffect(() => {
        console.log(task)
        if (task.startDate !== "") {
            task.startDate = new Date(task.startDate).toISOString().split('T')[0];
        }
        if (task.endDate !== "") {
            task.endDate = new Date(task.endDate).toISOString().split('T')[0];
        }
        fetchProjectList();
        if (task.projectId) {
            fetchEmployeesForProject(task.projectId);
        }
    }, [task]);

    const fetchProjectList = () => {
        const fetchDataFromApi = async () => {
            try {
                const data = await ProjectService.fetchAllProjects();
                console.log('Fetched project list:', data);
                return data;
            } catch (error) {
                // Handle error
            }
        };
        fetchDataFromApi().then((response: ApiGenericResponse) => {
            setProjectList(response?.data)
        });
    }
    const closeForm = (onlyCloseFlag) => {
        props.closeForm(onlyCloseFlag);
    }
    const allTaskStatus = () => {
        return Object.keys(TaskStatus).filter(status => typeof status !== 'number')
    }
    const saveOrUpdateTask = (event) => {
        event.preventDefault()
        const savedOrUpdatedTask = async () => {
            try {
                const data = await TaskService.saveOrUpdateTask(task);
                console.log('Fetched data:', data);
                return data;
            } catch (error) {
                // Handle error
            }
        };
        savedOrUpdatedTask().then((response: ApiGenericResponse) => {
            if (response.responseCode === 200) {
                setErrorMessage(false);
                closeForm(false);
            } else {
                setErrorMessage(true);
            }
        })
    }

    const handleProjectChange = (event) => {
        setTask((prevState) => ({
            ...prevState,
            projectId: event.target.value
        }))
        fetchEmployeesForProject(event.target.value)
    }

    const fetchEmployeesForProject = (projectId) => {
        const fetchDataFromApi = async () => {
            try {
                const data = await ProjectService.fetchApplicableProjectEmployees(projectId);
                console.log('Fetched employees for project:', data);
                return data;
            } catch (error) {
                // Handle error
            }
        };
        fetchDataFromApi().then((response: ApiGenericResponse) => {
            setEmployeeList(response?.data)
        });
    }
    return (
        <div className="modal" id="viewForm" tabIndex="-1" role="dialog">
            <div className="row" style={{marginTop: "20px"}}>
                {errorMessage && !task.status &&
                    <div>
                        <div className="alert alert-danger">
                            Please select a status
                        </div>
                    </div>
                }
                {errorMessage && !task.projectId &&
                    <div>
                        <div className="alert alert-danger">
                            Please select a project
                        </div>
                    </div>
                }
                {errorMessage && !task.employeeId &&
                    <div>

                        <div className="alert alert-danger">
                            Please select a employee
                        </div>
                    </div>
                }
                {!errorMessage &&
                    <div>
                        <div className="alert alert-info">
                            Please fill task data
                        </div>
                    </div>
                }

            </div>
            <div className="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
                <form onSubmit={saveOrUpdateTask}>
                    <fieldset>
                        <div className="form-group">
                            <input value={task.name}
                                   onChange={(e) => {
                                       setTask((prevState) => ({...prevState, name: e.target.value}))
                                   }}
                                   type="text" name="taskName" id="taskName" className="form-control input-group-sm"
                                   placeholder="Task Name" required/>
                        </div>
                        <hr className="colorgraph"/>
                        <div className="form-group">
                            <input value={task.description}
                                   onChange={(e) => {
                                       setTask((prevState) => ({...prevState, description: e.target.value}))
                                   }}
                                   type="text" name="description" id="description"
                                   className="form-control input-group-sm"
                                   placeholder="Description"/>
                        </div>
                        <hr className="colorgraph"/>
                        <div className="form-group">
                            <label>Start Date</label>
                            <input value={task.startDate}
                                   onChange={(e) => {
                                       setTask((prevState) => ({...prevState, startDate: e.target.value}))
                                   }}
                                   type="date" name="startDate" id="startDate" className="form-control input-group-sm"
                                   placeholder="Start Date" required/>
                        </div>
                        <hr className="colorgraph"/>
                        <div className="form-group">
                            <label>End Date</label>
                            <input value={task.endDate}
                                   onChange={(e) => {
                                       setTask((prevState) => ({...prevState, endDate: e.target.value}))
                                   }}
                                   type="date" name="endDate" id="endDate" className="form-control input-group-sm"
                                   placeholder="End Date"/>
                        </div>
                        <hr className="colorgraph"/>
                        <div className="form-group">
                            <div className="mb-3">
                                <select
                                    value={task.status}
                                    onChange={(e) => {
                                        setTask((prevState) => ({...prevState, status: e.target.value}))
                                    }}
                                    id="statusSelect"
                                    className="form-select"
                                    required
                                >
                                    <option value="" disabled>Select a status</option>
                                    {allTaskStatus().map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <hr className="colorgraph"/>
                        <div className="form-group">
                            <div className="mb-3">
                                <select
                                    value={task.projectId || ''}
                                    onChange={handleProjectChange}
                                    id="projectSelect"
                                    className="form-select"
                                    required
                                >
                                    <option value="" disabled>Select a project</option>
                                    {projectList.map((project) => (
                                        <option key={project.id} value={project.id}>
                                            {project.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <hr className="colorgraph"/>
                        <div className="form-group">
                            <div className="mb-3">
                                <select
                                    value={task.employeeId || ''}
                                    onChange={(e) => {
                                        setTask((prevState) => ({...prevState, employeeId: e.target.value}))
                                    }}
                                    id="employeeSelect"
                                    className="form-select"
                                    disabled={!task.projectId}
                                    required
                                >
                                    <option value="" disabled>Select an employee</option>
                                    {employeeList.map((employee) => (
                                        <option key={employee.id} value={employee.id}>
                                            {employee.fullName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12">
                                <button type="submit" className="btn btn-lg btn-success btn-block">Submit
                                </button>
                                <button type="button" className="btn btn-lg btn-danger btn-block"
                                        onClick={() => {
                                            closeForm(true)
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
export default TaskForm;