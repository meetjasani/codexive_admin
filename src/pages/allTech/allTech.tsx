import React, { useEffect, useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { ApiGet, ApiPut } from '../../helper/API/ApiData'
import TechList from './TechList'

export interface TechListData {
    id: string;
    name: string;
    type: string
    image: string
}



const AllTech = () => {
    const history = useHistory();
    const [techData, setTechData] = useState<TechListData[]>([])
    const [totalSize, setTotalSize] = useState<number>(0);
    const [techListId, setTechListId] = useState<any>([]);


    const getTechnologyListData = (page_number = 1, per_page = 10) => {
        ApiGet(`tech/getAlltechnology?per_page=${per_page}&page_number=${page_number}`)
            .then((res: any) => {
                setTotalSize(res.data && res.data.count);
                setTechData(res.data.alltechnology.map((x: any, index: any) => {
                    return {
                        id: x.id,
                        no_id: res.data.count - (page_number - 1) * per_page - index,
                        created_at: x.created_at,
                        name: x.name,
                        type: x.type,
                        image: x.image,
                        firstColor: x.firstColor,
                        secondColor: x.secondColor,
                    };
                }));
            })
    }

    const selectRow = {
        mode: "checkbox",
        onSelect: (isSelect: any, rows: any, e: any) => {
            const index = techListId.findIndex(
                (item: any) => item.id === isSelect.id
            );
            if (index !== -1 && index !== undefined) {
                techListId.splice(index, 1);
            } else {
                techListId.push({ id: isSelect.id });
            }
        },
        onSelectAll: (isSelect: any, rows: any, e: any) => {
            if (isSelect === true) {
                rows.map((x: any) => (
                    techListId.push({ id: x.id })
                ));
            } else {
                setTechListId([]);
            }
        },
    };

    const CreateUser = () => [
        history.push('/add_tech')
    ]

    const deleteUsers = () => {
        if (techListId.length > 0) {
            ApiPut(`tech/delete-technology`, {
                id: techListId.map((m: any) => m.id).join(","),
            }).then((res: any) => {
                getTechnologyListData()
                setTechListId([])
            });
        }
    }

    useEffect(() => {
        getTechnologyListData()
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
                        <TechList
                            data={techData}
                            getUserListManagement={getTechnologyListData}
                            totalSize={totalSize}
                            selectRow={selectRow}
                        />
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default AllTech
