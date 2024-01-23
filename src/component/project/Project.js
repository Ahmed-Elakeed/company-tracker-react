import './Project.css';
import React, {useEffect, useState} from "react";
import type {ApiGenericResponse} from "../../dto/ApiGenericResponse";
import * as ProjectService from "../../service/ProjectService";
import ProjectForm from "./projectForm/ProjectForm";
import type {ProjectDTO} from "../../dto/ProjectDTO";
import Navbar from "../navbar/Navbar";

const Project = () => {
    const [projects, setProjects] = useState([])
    const [projectFormProps, setProjectFormProps] = useState({
        flag: false,
        data: {name: "", startDate: "", endDate: "", description: "", status: "", departmentId: ""}
    })
    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = () => {
        const fetchDataFromApi = async () => {
            try {
                const data = await ProjectService.fetchAllProjects();
                console.log('Fetched data:', data);
                return data;
            } catch (error) {
                // Handle error
            }
        };
        fetchDataFromApi().then((response: ApiGenericResponse) => {
            setProjects(response?.data)
        });
    }

    const deleteProject=(projectId)=>{
        if (window.confirm('Are sure you want to delete this item ?')) {
            const deleteProject = async () => {
                try {
                    return await ProjectService.deleteProjectById(projectId);
                } catch (error) {
                    // Handle error
                }
            };
            deleteProject().then((response: ApiGenericResponse) => {
                if (response.responseCode === 200) {
                    setProjects((prevState) => {
                        return prevState.filter(project => {
                            return project.id !== projectId
                        })
                    })
                }
            })
        }
    }
    const openProjectForm = (event, project) => {
        event.preventDefault()
        if (project) {
            setProjectFormProps({
                flag: true,
                data: project
            })
        } else {
            setProjectFormProps((prevState) => ({
                ...prevState,
                flag: true
            }));
        }
    }
    const closeForm = (onlyCloseFlag) => {
        setProjectFormProps({
            flag: false,
            data: {name: "", startDate: "", endDate: "", description: "", status: "", departmentId: ""}
        })
        if (!onlyCloseFlag) {
            fetchProjects()
        }
    }
    return (
        <div>
            <Navbar/>
            <h3 style={{color: '#a30505'}}>Projects</h3>
            <a href="/true" className="btn btn-success"
               style={{float: "right", marginRight: "5px", marginBottom: "5px"}}
               onClick={openProjectForm}>Add Project</a>
            <table className="table">
                <thead className="thead-dark">
                <tr>
                    <th style={{backgroundColor: 'black', color: 'white'}} scope="col">#</th>
                    <th style={{backgroundColor: 'black', color: 'white'}} scope="col">Name</th>
                    <th style={{backgroundColor: 'black', color: 'white'}} scope="col">Start Date</th>
                    <th style={{backgroundColor: 'black', color: 'white'}} scope="col">End Date</th>
                    <th style={{backgroundColor: 'black', color: 'white'}} scope="col">Description</th>
                    <th style={{backgroundColor: 'black', color: 'white'}} scope="col">Status</th>
                    <th style={{backgroundColor: 'black', color: 'white'}} scope="col">Department</th>
                    <th style={{backgroundColor: 'black', color: 'white'}} scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {projects?.map((project:ProjectDTO) => (
                    <tr key={project.id}>
                        <td>{project.id}</td>
                        <td>{project.name}</td>
                        <td>{new Date(project.startDate).toDateString()}</td>
                        <td>{new Date(project.endDate).toDateString()}</td>
                        <td>{project.description}</td>
                        <td>{project.status}</td>
                        <td>{project.departmentName}</td>
                        <td>
                            <button className="btn btn-primary"
                                    onClick={(event) => {
                                        openProjectForm(event, project)
                                    }}>Update</button>
                            |
                            <button className="btn btn-danger"
                                    onClick={() => {
                                        deleteProject(project.id)
                                    }}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {projectFormProps.flag &&
                <ProjectForm closeForm={closeForm} formProps={projectFormProps}/>}
        </div>
    );
}
export default Project;