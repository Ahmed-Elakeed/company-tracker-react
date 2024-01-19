import './Project.css';
import {useEffect, useState} from "react";
import type {ApiGenericResponse} from "../../dto/ApiGenericResponse";
import * as ProjectService from "../../service/ProjectService";

const Project = () => {
    const [projects, setProjects] = useState([])
    useEffect(() => {
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
    }, []);
    return (
        <div>
            <h3 style={{color: '#a30505'}}>Projects</h3>
            <a href="/true" className="btn btn-success"
               style={{float: "right", marginRight: "5px", marginBottom: "5px"}}>Add Project</a>
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
                {projects?.map((project) => (
                    <tr>
                        <td>{project.id}</td>
                        <td>{project.name}</td>
                        <td>{new Date(project.startDate).toDateString()}</td>
                        <td>{new Date(project.endDate).toDateString()}</td>
                        <td>{project.description}</td>
                        <td>{project.status}</td>
                        <td>{project.departmentName}</td>
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
export default Project;