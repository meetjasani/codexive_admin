import React, { useEffect, useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import { useHistory } from 'react-router';
import { ApiGet, ApiPut } from '../../helper/API/ApiData';
import TeamMemberList from './TeamMemberList';

export interface teamMemberListData {
    id: string,
    id_number: string
    image: string,
    firstname: string,
    lastname: string,
    skill: string,
    member_type: string,
}
const TeamMember = () => {

    const history = useHistory();
    const [teamMember, setTeamMember] = useState<teamMemberListData[]>([])
    const [totalSize, setTotalSize] = useState<number>(0);
    const [teamMemberListId, setTeamMemberListId] = useState<any>([]);


    const recentHostBtn = () => {
        history.push("/editteammember")
    }

    const deleteUsers = () => {
        if (teamMemberListId.length > 0) {
            ApiPut(`team/delete-team-member`, {
                id: teamMemberListId.map((m: any) => m.id).join(","),
            }).then((res: any) => {
                getTeamMemberListData()
                setTeamMemberListId([])
            });
        }
    }
    const BlogImage = (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
        return (
            <img className="pv-td-img" src="./img/Filip_profile_circle.png" alt="" />
        )
    }

    const getTeamMemberListData = (per_page = 10, page_number = 1) => {
        ApiGet(`team/get-filtered-team?per_page=${per_page}&page_number=${page_number}`)
            .then((res: any) => {
                console.log("******", res);
                setTotalSize(res.data && res.data.count);
                setTeamMember(res.data.team.map((x: any, index: any) => {
                    return {
                        id: x.id,
                        no_id: res.data.count - (page_number - 1) * per_page - index,
                        id_number: x.id_number,
                        image: x.image,
                        firstname: x.first_name,
                        lastname: x.last_name,
                        skill: x.skill,
                        member_type: x.member_type
                    };
                }));

            })
    }

    useEffect(() => {
        getTeamMemberListData()
    }, [])
    const selectRow = {
        mode: "checkbox",
        onSelect: (isSelect: any, rows: any, e: any) => {
            const index = teamMemberListId.findIndex(
                (item: any) => item.id === isSelect.id
            );
            if (index !== -1 && index !== undefined) {
                teamMemberListId.splice(index, 1);
            } else {
                teamMemberListId.push({ id: isSelect.id });
            }
        },
        onSelectAll: (isSelect: any, rows: any, e: any) => {
            if (isSelect === true) {
                rows.map((x: any) => (
                    teamMemberListId.push({ id: x.id })
                ));
            } else {
                setTeamMemberListId([]);
            }
        },
    };
    return (
        <div className="pv-projectview">
            <div className="pv-project-btn">
                {/* <div>
                    <h5 className="font-27-bold text-left">Team Member</h5>
                </div>
                <div className="ml-auto">
                    <Button type="" className="dash-bg-pink btn btn-primary" onClick={recentHostBtn}>   Create  </Button>
                </div>
                <div className="ml-auto">
                    <Button type="" className="pv-dash-bg-pink" onClick={recentHostBtn}>  Add Member</Button>
                </div> */}
                <Container fluid>
                    <Row className="align-items-center">
                        <h1 className="font-27-bold text-left">Team Member List</h1>

                        <div className="btn-primary-pv  ml-auto">
                            <Button className="dash-bg-pink btn btn-primary" onClick={recentHostBtn}>
                                Create
                            </Button>

                            <Button className="dash-bg-pink btn btn-primary" onClick={deleteUsers}>
                                Delete
                            </Button>
                        </div>

                    </Row>
                </Container>
            </div>
            {/* <div className="pv-view">
                <BootstrapTable
                    keyField='id'
                    data={products}
                    columns={columns}
                />
            </div> */}
            <TeamMemberList
                data={teamMember}
                getUserListManagement={getTeamMemberListData}
                totalSize={totalSize}
                selectRow={selectRow}
            />




        </div>
    )
}

export default TeamMember
