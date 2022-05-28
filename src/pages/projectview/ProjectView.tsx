import React from 'react'
import "./ProjectView.css";
import { ConeStriped } from 'react-bootstrap-icons';
import BootstrapTable from 'react-bootstrap-table-next'
import { Button } from 'react-bootstrap';



function ProjectView() {

    const recentHostBtn = () => {

    }



    const products = [
        {
            id: 1,
            name: "pooja",
            project_name: "codexive",
            post_date: "19-12-2021",
            email_id: "pooja@gmail.com",
            action: "view",

        }
    ]


    const columns = [{
        dataField: 'id',
        text: 'ID'
    }, {
        dataField: 'name',
        text: 'Name'
    }, {
        dataField: 'project_name',
        text: 'Project Name'
    }, {
        dataField: 'post_date',
        text: 'Post Date'
    }, {
        dataField: 'email_id',
        text: 'Email ID'
    }, {
        dataField: 'action',
        text: 'Action'
    }

    ];

    return (
        <div className="pv-projectview">
            <div className="pv-project-btn">
                <div>
                    <h5 className="font-27-bold text-left">Project Requirement</h5>
                </div>
                <div className="ml-auto">
                    <Button type="" className="pv-dash-bg-pink" onClick={() => { recentHostBtn() }}> View More </Button>
                </div>
            </div>
            <div className="">
                <BootstrapTable
                    keyField='id'
                    data={products}
                    columns={columns}
                />
            </div>
        </div>

    )
}

export default ProjectView
