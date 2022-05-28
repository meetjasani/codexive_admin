import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { ApiGet, ApiPut } from '../../helper/API/ApiData'
import PortfolioList from './PortfolioList'

export interface PortfolioListData {
    id: string;
    name: string;
    introduction: string
    created_at: string
    key_features: string
    technical_overview: string
    main_image: string
    image: string
}

const Portfolio = () => {
    const history = useHistory();
    const [portfolioData, setPortfolioData] = useState<PortfolioListData[]>([])
    const [totalSize, setTotalSize] = useState<number>(0);
    const [portfolioListId, setPortfolioListId] = useState<any>([]);


    const getPortfolioListData = (page_number = 1, per_page = 10) => {
        ApiGet(`portfolio/get-company-portfolio-by-admin?per_page=${per_page}&page_number=${page_number}`)
            .then((res: any) => {
                setTotalSize(res.data && res.data.count);
                setPortfolioData(res.data.portfolios.map((x: any, index: any) => {
                    return {
                        id: x.id,
                        no_id: res.data.count - (page_number - 1) * per_page - index,
                        created_at: moment(x.created_at).format("YYYY-MM-DD"),
                        name: x.name,
                        key_features: x.key_features,
                        technical_overview: x.technical_overview,
                        main_image: x.main_image,
                        image: x.image,
                        introduction: x.introduction,
                    };
                }));
            })
    }

    const selectRow = {
        mode: "checkbox",
        onSelect: (isSelect: any, rows: any, e: any) => {
            const index = portfolioListId.findIndex(
                (item: any) => item.id === isSelect.id
            );
            if (index !== -1 && index !== undefined) {
                portfolioListId.splice(index, 1);
            } else {
                portfolioListId.push({ id: isSelect.id });
            }
        },
        onSelectAll: (isSelect: any, rows: any, e: any) => {
            if (isSelect === true) {
                rows.map((x: any) => (
                    portfolioListId.push({ id: x.id })
                ));
            } else {
                setPortfolioListId([]);
            }
        },
    };

    const CreateUser = () => [
        history.push('/add_portfolio')
    ]

    const deleteUsers = () => {
        if (portfolioListId.length > 0) {
            ApiPut(`portfolio/delete-company-portfolio-by-admin`, {
                id: portfolioListId.map((m: any) => m.id).join(","),
            }).then((res: any) => {
                getPortfolioListData()
                setPortfolioListId([])
            });
        }
    }

    useEffect(() => {
        getPortfolioListData()
    }, [])

    return (
        <div className="all-sort-table">
            <div className=" single-direct-table">
                <div className="align-items-center d-flex">
                    <Container fluid>
                        <Row className="align-items-center">
                            <h1 className="font-27-bold text-left">Portfolio List</h1>

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
                    <Row className="dashtable-pv ">
                        <div className="pv-portfolio">
                            <PortfolioList
                                data={portfolioData}
                                getUserListManagement={getPortfolioListData}
                                totalSize={totalSize}
                                selectRow={selectRow}
                            />
                        </div>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Portfolio
