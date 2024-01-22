import "./ProjectForm.css";
import {useEffect, useState} from "react";
import * as DepartmentService from "../../../service/DepartmentService";
import type {ApiGenericResponse} from "../../../dto/ApiGenericResponse";
import {ProjectStatus} from "../../../enums/ProjectStatus";
import * as ProjectService from "../../../service/ProjectService";

const ProjectForm = (props) => {
    const [departmentList, setDepartmentList] = useState([]);
    const [project, setProject] = useState(props.formProps.data);
    const [errorMessage, setErrorMessage] = useState(false);

    useEffect(() => {
        if (project.startDate !== "") {
            project.startDate = new Date(project.startDate).toISOString().split('T')[0];
        }
        if (project.endDate !== "") {
            project.endDate = new Date(project.endDate).toISOString().split('T')[0];
        }
        const fetchDataFromApi = async () => {
            try {
                const data = await DepartmentService.fetchAllDepartments();
                console.log('Fetched departments:', data);
                return data;
            } catch (error) {
                // Handle error
            }
        };
        fetchDataFromApi().then((response: ApiGenericResponse) => {
            setDepartmentList(response?.data)
        });
    }, [project]);
    const closeForm = (onlyCloseFlag) => {
        props.closeForm(onlyCloseFlag);
    }
    const allProjectStatus = () => {
        return Object.keys(ProjectStatus).filter(status => typeof status !== 'number')
    }
    const saveOrUpdateProject = (event) => {
        event.preventDefault()
        const savedOrUpdatedProject = async () => {
            try {
                const data = await ProjectService.saveOrUpdateProject(project);
                console.log('Fetched data:', data);
                return data;
            } catch (error) {
                // Handle error
            }
        };
        savedOrUpdatedProject().then((response: ApiGenericResponse) => {
            if (response.responseCode === 200) {
                setErrorMessage(false);
                closeForm(false);
            } else {
                setErrorMessage(true);
            }
        })
    }
    return (
        <div className="modal" id="projectForm" tabIndex="-1" role="dialog">
            <div className="row" style={{marginTop: "20px"}}>
                {errorMessage && !project.status &&
                    <div>
                        <div className="alert alert-danger">
                            Please select a status
                        </div>
                    </div>
                }
                {errorMessage && !project.departmentId &&
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
                <form onSubmit={saveOrUpdateProject}>
                    <fieldset>
                        <div className="form-group">
                            <input value={project.name}
                                   onChange={(e) => {
                                       setProject((prevState) => ({...prevState, name: e.target.value}))
                                   }}
                                   type="text" name="projectName" id="projectName"
                                   className="form-control input-group-sm"
                                   placeholder="Project Name" required/>
                        </div>
                        <hr className="colorgraph"/>
                        <div className="form-group">
                            <label>Start Date</label>
                            <input value={project.startDate}
                                   onChange={(e) => {
                                       setProject((prevState) => ({...prevState, startDate: e.target.value}))
                                   }}
                                   type="date" name="startDate" id="startDate"
                                   className="form-control input-group-sm"
                                   placeholder="Start Date" required/>
                        </div>
                        <hr className="colorgraph"/>
                        <div className="form-group">
                            <label>End Date</label>
                            <input value={project.endDate}
                                   onChange={(e) => {
                                       setProject((prevState) => ({...prevState, endDate: e.target.value}))
                                   }}
                                   type="date" name="endDate" id="endDate"
                                   className="form-control input-group-sm" placeholder="End Date"/>
                        </div>
                        <hr className="colorgraph"/>
                        <div className="form-group">
                            <input value={project.description}
                                   onChange={(e) => {
                                       setProject((prevState) => ({...prevState, description: e.target.value}))
                                   }}
                                   type="text" name="description" id="description"
                                   className="form-control input-group-sm"
                                   placeholder="Description"/>
                        </div>
                        <hr className="colorgraph"/>
                        <div className="form-group">
                            <div className="mb-3">
                                <select
                                    value={project.status}
                                    onChange={(e) => {
                                        setProject((prevState) => ({...prevState, status: e.target.value}))
                                    }}
                                    id="statusSelect"
                                    className="form-select"
                                    required
                                >
                                    <option value="" disabled>Select a status</option>
                                    {allProjectStatus().map((status) => (
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
                                    value={project.departmentId || ''}
                                    onChange={(e) => {
                                        setProject((prevState) => ({...prevState, departmentId: e.target.value}))
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
                                <button type="submit"
                                        className="btn btn-lg btn-success btn-block">Submit
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
export default ProjectForm;