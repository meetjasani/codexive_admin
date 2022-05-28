import React from 'react'
import { Container, Row } from 'react-bootstrap'
import "./dashboard.css"

import TotalUserCount from '../../component/Tables/TotalUserCount'
import ReHostItinerary from '../../component/Tables/ReHostItinerary'

function Dashboard() {
    return (
        <>
            {/* <div className="col-12 p-0">
                <div className="bg-navigation">
                    <h2 className="text-white">대시보드</h2>
                </div>
            </div> */}

            <Container fluid>
                <Row className="">
                    <TotalUserCount />
                </Row>
            </Container>

            <Container fluid className="">
                <Row className="all-sort-table">
                    <ReHostItinerary />

                </Row>
            </Container>



        </>
    )
}

export default Dashboard
