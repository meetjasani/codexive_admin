import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { ApiGet, ApiPut } from '../../helper/API/ApiData';
import ReactHtmlParser from 'react-html-parser';
import { Button, Container, Row } from 'react-bootstrap'
import ClientList from './ClientList';

export interface ClientListData {
    id: string;
    image: string;
    displayImage: string;
    clientInfo: string,
}

const OurClient = () => {

    const history = useHistory();
    const [clientData, setClientData] = useState<ClientListData[]>([])
    const [totalSize, setTotalSize] = useState<number>(0);
    const [clientListId, setClientListId] = useState<any>([]);

    const getClientData = (page_number = 1, per_page = 10) => {
        ApiGet(`client/getAllClient?per_page=${per_page}&page_number=${page_number}`)
            .then((res: any) => {
                if (res.data.client.length == 0) {
                    setClientData([])
                } else {
                    setTotalSize(res.data && res.data.count);
                    setClientData(res.data?.client.map((x: any, index: any) => {
                        return {
                            id: x.id,
                            no_id: res.data.count - (page_number - 1) * per_page - index,
                            created_at: x.created_at,
                            clientInfo: ReactHtmlParser(x?.clientInfo),
                            image: x.image,
                            displayImage: x.displayImage
                        };
                    }));
                }

            })
    }

    const selectRow = {
        mode: "checkbox",
        onSelect: (isSelect: any, rows: any, e: any) => {
            const index = clientListId.findIndex(
                (item: any) => item.id === isSelect.id
            );
            if (index !== -1 && index !== undefined) {
                clientListId.splice(index, 1);
            } else {
                clientListId.push({ id: isSelect.id });
            }
        },
        onSelectAll: (isSelect: any, rows: any, e: any) => {
            if (isSelect === true) {
                rows.map((x: any) => (
                    clientListId.push({ id: x.id })
                ));
            } else {
                setClientListId([]);
            }
        },
    };

    const CreateClient = () => [
        history.push('/add_client')
    ]

    const deleteClient = () => {
        if (clientListId.length > 0) {
            ApiPut(`client/delete-client`, {
                id: clientListId.map((m: any) => m.id).join(","),
            }).then((res: any) => {
                getClientData()
                setClientListId([])
            });
        }
    }

    useEffect(() => {
        getClientData()
    }, [])
    return (
        <div>
            <div className="all-sort-table">
                <div className=" single-direct-table">
                    <div className="align-items-center d-flex">
                        <Container fluid>
                            <Row className="align-items-center">
                                <h1 className="font-27-bold text-left">Our Client List</h1>

                                <div className="btn-primary-pv  ml-auto">
                                    <Button className="dash-bg-pink btn btn-primary" onClick={CreateClient}>
                                        Create
                                    </Button>

                                    <Button className="dash-bg-pink btn btn-primary" onClick={deleteClient}>
                                        Delete
                                    </Button>
                                </div>

                            </Row>
                        </Container>
                    </div>

                    <Container fluid className="p-0">
                        <Row className="dashtable-pv">
                            <ClientList
                                data={clientData}
                                getClientDataManagement={getClientData}
                                totalSize={totalSize}
                                selectRow={selectRow}
                            />
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    )
}

export default OurClient
