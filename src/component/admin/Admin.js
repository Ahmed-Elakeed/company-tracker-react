import "./Admin.css";
import {useEffect, useState} from "react";
import * as AdminService from "../../service/AdminService";
import type {ApiGenericResponse} from "../../dto/ApiGenericResponse";
import type {AdminDTO} from "../../dto/AdminDTO";


const Admin = () => {
    const [admins, setAdmins] = useState([])
    useEffect(() => {
        const fetchDataFromApi = async () => {
            try {
                const data = await AdminService.fetchAllAdmins();
                console.log('Fetched data:', data);
                return data;
            } catch (error) {
                // Handle error
            }
        };
        fetchDataFromApi().then((response: ApiGenericResponse) => {
            setAdmins(response?.data)
        });
    }, []);
    return (
        <div>
            <h3 style={{color: '#a30505'}}>Admins</h3>
            <a href="/true" className="btn btn-success"
               style={{float: "right", marginRight: "5px", marginBottom: "5px"}}>Add Admin</a>
            <table className="table">
                <thead className="thead-dark">
                <tr>
                    <th style={{backgroundColor: 'black', color: 'white'}} scope="col">#</th>
                    <th style={{backgroundColor: 'black', color: 'white'}} scope="col">Name</th>
                    <th style={{backgroundColor: 'black', color: 'white'}} scope="col">Email</th>
                    <th style={{backgroundColor: 'black', color: 'white'}} scope="col">Role</th>
                    <th style={{backgroundColor: 'black', color: 'white'}} scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {admins.map((admin:AdminDTO) => (
                    <tr key={admin.id}>
                        <td>{admin.id}</td>
                        <td>{admin.name}</td>
                        <td>{admin.email}</td>
                        <td>{admin.role}</td>
                        <td>
                            <button className="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    );
}
export default Admin;