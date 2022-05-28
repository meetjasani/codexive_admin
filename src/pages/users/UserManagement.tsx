import React, { useEffect, useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { ApiGet, ApiPut } from '../../helper/API/ApiData'
import UserList from './UserList'

export interface UserListData {
    id: string;
    no_id: string;
    created_at: string
    email: string
    first_name: string
    last_name: string
    role_type: string
}

const UserManagement = () => {
    const history = useHistory();
    const [userdata, setUserdata] = useState<UserListData[]>([])
    const [totalSize, setTotalSize] = useState<number>(0);
    const [userListId, setUserListId] = useState<any>([]);


    const getUserListData = (page_number = 1, per_page = 10) => {
        ApiGet(`admin/auth/getFilteredUsers?per_page=${per_page}&page_number=${page_number}`)
            .then((res: any) => {
                setTotalSize(res.data && res.data.count);
                setUserdata(res.data.users)
                setUserdata(res.data &&
                    res.data.users &&
                    res.data.users.map((x: any, index: any) => {
                        return {
                            id: x.id,
                            no_id: res.data.count - (page_number - 1) * per_page - index,
                            created_at: x.created_at,
                            email: x.email,
                            first_name: x.first_name,
                            last_name: x.last_name,
                            role_type: x.role_type
                        };
                    }))
            })
    }

    const selectRow = {
        mode: "checkbox",
        onSelect: (isSelect: any, rows: any, e: any) => {
            const index = userListId.findIndex(
                (item: any) => item.id === isSelect.id
            );
            if (index !== -1 && index !== undefined) {
                userListId.splice(index, 1);
            } else {
                userListId.push({ id: isSelect.id });
            }
        },
        onSelectAll: (isSelect: any, rows: any, e: any) => {
            if (isSelect === true) {
                rows.map((x: any) => (
                    userListId.push({ id: x.id })
                ));
            } else {
                setUserListId([]);
            }
        },
    };

    const CreateUser = () => [
        history.push('/user')
    ]

    const deleteUsers = () => {
        if (userListId.length > 0) {
            ApiPut(`admin/auth/deleteUser`, {
                id: userListId.map((m: any) => m.id).join(","),
            }).then((res: any) => {
                getUserListData()
                setUserListId([])
            });
        }
    }

    useEffect(() => {
        getUserListData()
    }, [])

    return (
        <div className="all-sort-table">
            <div className=" single-direct-table">
                <div className="align-items-center d-flex">
                    <Container fluid>
                        <Row className="align-items-center">
                            <h1 className="font-27-bold text-left">User List</h1>

                            <div className="btn-primary-pv  ml-auto">
                                <Button className="dash-bg-pink btn btn-primary" onClick={CreateUser}>
                                    Create
                                </Button>

                                <Button className="dash-bg-pink btn btn-primary" onClick={deleteUsers}>
                                    Delete
                                </Button>
                            </div>

                        </Row>
                    </Container>
                </div>

                <Container fluid className="p-0">
                    <Row className="dashtable-pv">
                        <UserList
                            data={userdata}
                            getUserListManagement={getUserListData}
                            totalSize={totalSize}
                            selectRow={selectRow}
                        />
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default UserManagement
