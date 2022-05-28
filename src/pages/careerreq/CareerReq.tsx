import React, { useEffect, useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next'
import { useHistory } from 'react-router';
import { ApiGet, ApiPut } from '../../helper/API/ApiData';
import CareerReqList from './CareerReqList'

export interface careerReqListData {
    id: string,
    position: string,
    requirement: string,
    experience: string
}

export interface careerReqestData {
    id: string,
    position: string,
    career_requirement: string,
    current_company: string,
    resume: string
}
const CareerReq = () => {

    const history = useHistory();
    const [careerReqData, setCareerReqData] = useState<careerReqListData[]>([])
    const [careerReqestData, setCareerReqestData] = useState<careerReqestData[]>([])
    const [totalSize, setTotalSize] = useState<number>(0);
    const [careerListId, setCareerListId] = useState<any>([]);

    const recentHostBtn = () => {
        history.push("/addcareerreq")
    }

    const getCareerListData = (per_page = 10, page_number = 1) => {
        ApiGet(`career/get-filtered-career-requirement?per_page=${per_page}&page_number=${page_number}`)
            .then((res: any) => {
                setTotalSize(res.data && res.data.count);
                setCareerReqData(res.data.careerRequirement.map((x: any, index: any) => {
                    return {
                        id: x.id,
                        no_id: res.data.count - (page_number - 1) * per_page - index,
                        position: x.position,
                        requirement: x.requirement,
                        experience: x.experience
                    }
                }))
            })
    }



    const getCreerRequestListData = (per_page = 10, page_number = 1) => {
        ApiGet(`career/get-filtered-career-request?per_page=${per_page}&page_number=${page_number}`)
            .then((res: any) => {
                setTotalSize(res.data && res.data.count);
                setCareerReqestData(res.data.careerrequest.map((x: any, index: any) => {
                    return {
                        id: x.id,
                        no_id: res.data.count - (page_number - 1) * per_page - index,
                        position: x.position,
                        career_requirement: x.career_requirement,
                        current_company: x.current_company,
                        resume: x.resume
                    }
                }))
                console.log("requestdata", res);

            })
    }

    const selectRow = {
        mode: "checkbox",
        onSelect: (isSelect: any, rows: any, e: any) => {
            const index = careerListId.findIndex(
                (item: any) => item.id === isSelect.id
            );
            if (index !== -1 && index !== undefined) {
                careerListId.splice(index, 1);
            } else {
                careerListId.push({ id: isSelect.id });
            }
        },
        onSelectAll: (isSelect: any, rows: any, e: any) => {
            if (isSelect === true) {
                rows.map((x: any) => (
                    careerListId.push({ id: x.id })
                ));
            } else {
                setCareerListId([]);
            }
        },
    };

    const deleteCareer = () => {
        if (careerListId.length > 0) {
            ApiPut(`career/delete-career-requirement`, {
                id: careerListId.map((m: any) => m.id).join(","),
            }).then((res: any) => {
                getCareerListData()
                setCareerListId([])
            })
        }
    }

    useEffect(() => {
        getCareerListData()
    }, [])

    useEffect(() => {
        getCreerRequestListData()
    }, [])
    // const products = [
    //     {
    //         id: 1,
    //         member_position: "DF",
    //         requirement: "hhvf",
    //         experience: 2,
    //         action: "view",

    //     }
    // ]
    // const products1 = [
    //     {
    //         name: "pooja",
    //         first_name: "DF",
    //         last_name: "fghdfc",
    //         email_id: "pooja@gmail.com",
    //         position: 2,
    //         experience: 2,
    //         current_company: "DF",
    //         resume: "",
    //     }
    // ]


    // const columns = [{
    //     dataField: 'id',
    //     text: 'ID'
    // }, {
    //     dataField: 'member_position',
    //     text: 'Member Position '
    // }, {
    //     dataField: 'requirement',
    //     text: 'Requirement'
    // }, {
    //     dataField: 'experience',
    //     text: 'Experience '
    // }, {

    //     dataField: 'action',
    //     text: 'Blog View'

    // }

    // ];


    // const columns1 = [
    //     {
    //         dataField: 'name',
    //         text: 'Name'
    //     }, {
    //         dataField: 'first_name',
    //         text: 'First Name '
    //     }, {
    //         dataField: 'last_name',
    //         text: 'Last Name '
    //     }, {
    //         dataField: 'email_id',
    //         text: 'Email Id '
    //     }, {
    //         dataField: 'position',
    //         text: 'Position '
    //     }, {
    //         dataField: 'experience',
    //         text: 'Experience '
    //     }, {
    //         dataField: 'current_company',
    //         text: 'Current Company'
    //     }, {
    // dataField: 'resume',
    // text: 'Resume',
    // formatter: BlogImage,
    //     }
    // ];

    return (
        <div className="pv-projectview" >
            <div className="pv-project-btn">
                <div>
                    <h5 className="font-27-bold text-left">Career Requirement</h5>
                </div>
                <div className="btn-primary-pv  ml-auto">
                    <Button className="dash-bg-pink btn btn-primary" onClick={recentHostBtn}>  Create</Button>

                    <Button className="dash-bg-pink btn btn-primary" onClick={deleteCareer}>
                        Delete
                    </Button>
                </div>


            </div>

            {/* <div className="pv-view">
                <BootstrapTable
                    keyField='id'
                    data={products}
                    columns={columns}
                />
            </div> */}
            <div>
                <h5 className="font-27-bold text-left pv-career"></h5>
            </div>
            {/* <div className="pv-view">
                <BootstrapTable
                    keyField='id'
                    data={products1}
                    columns={columns1}

                />

            </div> */}
            <Container fluid className="p-0">
                <Row className="dashtable-pv">
                    <CareerReqList
                        data={careerReqData}
                        getUserListManagement={getCareerListData}
                        totalSize={totalSize}
                        selectRow={selectRow}
                        datas={careerReqestData}
                        getCreerReq={getCreerRequestListData}
                    />
                </Row>
            </Container>

            {/* <Container fluid className="p-0">
                <Row className="dashtable-pv">
                    <CareerReqList
                        data={careerReqestData}
                        totalSize={totalSize}
                        selectRow={selectRow}
                        getCreerReq={getCreerRequestListData}
                    />
                </Row>
            </Container> */}


        </div >
    )
}

export default CareerReq
