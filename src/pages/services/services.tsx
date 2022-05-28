import React, { useEffect, useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { ApiGet, ApiPut } from '../../helper/API/ApiData'
import ServicesList from './servicesList'
import ReactHtmlParser from 'react-html-parser';

export interface ServicesListData {
    id: string;
    main_service: string,
    sub_services: string,
    title: string,
    description: string,
    image: string,
    title_second: string,
    description_second: string,
    image_second: string
}

const Services = () => {
    const history = useHistory();
    const [serviceData, setServiceData] = useState<ServicesListData[]>([])
    const [totalSize, setTotalSize] = useState<number>(0);
    const [serviceListId, setServiceListId] = useState<any>([]);

    const getCategoryListData = (page_number = 1, per_page = 10) => {
        ApiGet(`service/getAllService?per_page=${per_page}&page_number=${page_number}`)
            .then((res: any) => {
                setTotalSize(res.data && res.data.count);
                setServiceData(res.data.services.map((x: any, index: any) => {
                    return {
                        id: x.id,
                        no_id: res.data.count - (page_number - 1) * per_page - index,
                        created_at: x.created_at,
                        main_service: x.main_service,
                        sub_services: x.sub_services,
                        title: x.title,
                        description: ReactHtmlParser(x?.description),
                        image: x.image,
                        title_second: x.title_second,
                        description_second: ReactHtmlParser(x.description_second),
                        image_second: x.image_second
                    };
                }));
            })
    }

    const selectRow = {
        mode: "checkbox",
        onSelect: (isSelect: any, rows: any, e: any) => {
            const index = serviceListId.findIndex(
                (item: any) => item.id === isSelect.id
            );
            if (index !== -1 && index !== undefined) {
                serviceListId.splice(index, 1);
            } else {
                serviceListId.push({ id: isSelect.id });
            }
        },
        onSelectAll: (isSelect: any, rows: any, e: any) => {
            if (isSelect === true) {
                rows.map((x: any) => (
                    serviceListId.push({ id: x.id })
                ));
            } else {
                setServiceListId([]);
            }
        },
    };

    const CreateUser = () => [
        history.push('/add_services')
    ]

    const deleteUsers = () => {
        if (serviceListId.length > 0) {
            ApiPut(`service/delete-service`, {
                id: serviceListId.map((m: any) => m.id).join(","),
            }).then((res: any) => {
                getCategoryListData()
                setServiceListId([])
            });
        }
    }

    useEffect(() => {
        getCategoryListData()
    }, [])

    return (
        <div className="all-sort-table">
            <div className=" single-direct-table">
                <div className="align-items-center d-flex">
                    <Container fluid>
                        <Row className="align-items-center">
                            <h1 className="font-27-bold text-left">Services List</h1>

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
                        <ServicesList
                            data={serviceData}
                            getUserListManagement={getCategoryListData}
                            totalSize={totalSize}
                            selectRow={selectRow}
                        />
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Services
