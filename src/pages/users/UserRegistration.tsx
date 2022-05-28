import React, { useEffect, useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router';
import { ApiGet, ApiPatch, ApiPost } from '../../helper/API/ApiData';
import { toast } from 'react-toastify';

const UserRegistration = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    const history = useHistory();
    const [userData, setUserData] = useState({
        id: "",
        email: "",
        first_name: "",
        last_name: "",
        role_type: "",
    })
    const [change_password, setChange_password] = useState<boolean>(false)
    const getUserById = () => {
        ApiGet(`admin/${id}`)
            .then((res: any) => {
                setUserData({
                    ...userData,
                    id: res.data.id,
                    email: res.data.email,
                    first_name: res.data.first_name,
                    last_name: res.data.last_name,
                    role_type: res.data.role_type
                })
            })
    }

    const handleChnage = (e: any) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const saveUser = () => {

        if (id === "" || !id) {
            const body = {
                email: userData.email,
                first_name: userData.first_name,
                last_name: userData.last_name,
                role_type: userData.role_type
            }
            ApiPost(`admin/addUser`, body)
                .then((response: any) => {
                    toast.success("Success!")
                    goToList()
                }).catch((error: any) => {
                    toast.error("Fail!")
                });
        } else {
            const body = {
                email: userData.email,
                first_name: userData.first_name,
                last_name: userData.last_name,
                role_type: userData.role_type,
                password_chnage: change_password
            }
            ApiPatch(`admin/editUser/${id}`, body)
                .then((response: any) => {
                    goToList()
                    toast.success("Success!")
                }).catch((error: any) => {
                    toast.error("Fail!")
                });

        }
    }

    const goToList = () => {
        history.push('/users_list')
    }

    useEffect(() => {
        console.log("userData userData userData userData", userData);
    }, [userData])

    useEffect(() => {
        if (id) {
            getUserById()
        }
    }, [id])



    return (
        <div className="all-sort-table">
            <Container fluid>
                <Row className="">
                    <h1 className="font-27-bold">User</h1>
                </Row>
            </Container>
            <table className=" pv-dashtable mt-3 custom-table-border">

                <tr className="font-18-bold pv-title-table">
                    <th> <label>First Name</label></th>
                    <td> <input
                        name="first_name"
                        type='text'
                        placeholder='Please enter first name'
                        value={userData.first_name}
                        onChange={(e) => handleChnage(e)}
                    /></td>
                </tr>
                <tr className="font-18-bold pv-title-table">
                    <th><label>Last Name</label></th>
                    <td><input
                        name="last_name"
                        type='text'
                        placeholder='Please enter last name'
                        value={userData.last_name}
                        onChange={(e) => handleChnage(e)}
                    /></td>
                </tr>
                <tr className="font-18-bold pv-title-table">
                    <th> <label>Email</label></th>
                    <td> <input
                        name="email"
                        type='text'
                        placeholder='Please enter email'
                        value={userData.email}
                        onChange={(e) => handleChnage(e)}
                    /></td>
                </tr>
                <tr className="font-18-bold pv-title-table">
                    <th> <label>Role Type</label></th>
                    <td>
                        {/* <input
                        name="role_type"
                        type='text'
                        value={userData.role_type}
                        onChange={(e) => handleChnage(e)}
                    />  */}
                        <select
                            name="role_type"
                            className="pv-select"
                            value={userData.role_type}
                            onChange={(e) => handleChnage(e)}
                        >
                            {/* <option value="ADMIN">Admin</option> */}
                            <option value="SEO">SEO</option>
                        </select></td>
                </tr>
            </table>
            {id &&
                <div className="pv-checkbox">
                    <label className="pv-password">
                        <input
                            type="checkbox"
                            name="change_password"
                            id="change_password"
                            checked={change_password}
                            onChange={(e) => {
                                setChange_password(e.target.checked)
                            }}
                        />
                        <p>Want to change password</p>
                    </label>
                </div>
            }


            <div className="text-center">
                <Button className=" pv-main-btn-img btn-secondary" onClick={goToList}>
                    Back
                </Button>
                <Button className=" pv-main-btn-img btn-success" onClick={saveUser}>
                    Save
                </Button>
            </div>
        </div>
    )
}

export default UserRegistration
