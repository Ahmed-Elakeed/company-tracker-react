import "./Admin.css";
import React, {useEffect, useState} from "react";
import * as AdminService from "../../service/AdminService";
import type {ApiGenericResponse} from "../../dto/ApiGenericResponse";
import type {AdminDTO} from "../../dto/AdminDTO";
import Navbar from "../navbar/Navbar";
import * as SessionUtil from "../../util/SessionUtil";
import AdminForm from "./AdminForm/AdminForm";


const Admin = () => {
    const [admins, setAdmins] = useState([])
    const [adminFormProps, setAdminFormProps] = useState({
        flag: false,
        data: {name: "", email: "", role: ""}
    })
    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = () => {
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
            setAdmins(response?.data.filter(admin => {
                return admin.id !== SessionUtil.getAuthenticationData().id;
            }))
        });
    }

    const deleteAdmin = (adminId) => {
        if (window.confirm('Are sure you want to delete this item ?')) {
            const deleteAdmin = async () => {
                try {
                    return await AdminService.deleteAdminById(adminId);
                } catch (error) {
                    // Handle error
                }
            };
            deleteAdmin().then((response: ApiGenericResponse) => {
                if (response.responseCode === 200) {
                    setAdmins((prevState) => {
                        return prevState.filter(admin => {
                            return admin.id !== adminId
                        })
                    })
                }
            })
        }
    }
    const openAdminForm = (event) => {
        event.preventDefault()

        setAdminFormProps((prevState) => ({
            ...prevState,
            flag: true
        }));
    }
    const closeForm = (onlyCloseFlag) => {
        setAdminFormProps({
            flag: false,
            data: {name: "", email: "", role: ""}
        })
        if (!onlyCloseFlag) {
            fetchAdmins();
        }
    }
    return (
        <div>
            <Navbar/>
            <h3 style={{color: '#a30505'}}>Admins</h3>
            <a href="/true" className="btn btn-success"
               style={{float: "right", marginRight: "5px", marginBottom: "5px"}}
               onClick={openAdminForm}>Add Admin</a>
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
                {admins.map((admin: AdminDTO) => (
                    <tr key={admin.id}>
                        <td>{admin.id}</td>
                        <td>{admin.name}</td>
                        <td>{admin.email}</td>
                        <td>{admin.role}</td>
                        <td>
                            <button className="btn btn-danger"
                                    onClick={() => {
                                        deleteAdmin(admin.id)
                                    }}>Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {adminFormProps.flag &&
                <AdminForm closeForm={closeForm} formProps={adminFormProps}/>}
        </div>
    );
}
export default Admin;