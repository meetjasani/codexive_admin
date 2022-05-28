import React from 'react'
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import RemotePagination from '../../component/RemotePagination/RemotePagination';
import { careerReqestData, careerReqListData } from './CareerReq';

interface Props {
    data: careerReqListData[];
    datas: careerReqestData[];
    getUserListManagement: (page: any, sizePerPage: any) => void;
    getCreerReq: (page: any, sizePerPage: any) => void;
    totalSize?: number;
    selectRow?: any;
    rowEvents?: (tableRowEvents: any) => void;
}

const CategoryList: React.FC<Props> = ({ data, datas, getUserListManagement, getCreerReq, totalSize, selectRow, rowEvents }) => {
    const history = useHistory();

    const linkEditFollow = (
        cell: any,
        row: any,
        rowIndex: any,
        formatExtraData: any
    ) => {
        return (
            <a className="action-link see-details-link" onClick={() => { history.push(`/addcareerreq?id=${row.id}`) }}> Edit</a>
        );
    };


    const downloadFile = (url: any) => {

        fetch(url)
            .then((response) => response.blob())
            .then((blob) => {
                const fileName: string = Math.floor(Math.random() * 10000000000).toString();
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = fileName;
                link.click();
            })
            .catch(console.error);
    };


    const ResumeLink = (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
        return (
            <a onClick={() => downloadFile(row.resume)}>Resume Link</a>
        )
    }

    const columns1 = [
        {
            dataField: "no_id",
            text: "Sr no.",
        },
        {
            dataField: "position",
            text: "Position",
        },
        {
            dataField: "career_requirement",
            text: "Career Requirement",
        },
        {
            dataField: "current_company",
            text: "Current Company",
        },
        {
            dataField: 'resume',
            text: 'Resume',
            formatter: ResumeLink,
        }
    ];

    const columns = [
        {
            dataField: "no_id",
            text: "Sr no.",
        },
        {
            dataField: "position",
            text: "Position",
        },
        {
            dataField: "requirement",
            text: "Requirement",
        },
        {
            dataField: "experience",
            text: "experience",
        },
        {
            dataField: "id",
            text: "Edit",
            formatter: linkEditFollow,
        }
    ];

    const handleTableChange = (pagenumber: number, sizeperpage: number) => {
        getUserListManagement(pagenumber, sizeperpage);
        getCreerReq(pagenumber, sizeperpage)
    };

    return (
        <div>

            <div className="user-list checkbox-margin">
                <RemotePagination
                    data={data}
                    columns={columns}
                    totalSize={totalSize ?? 0}
                    onTableChange={(page, sizePerPage) =>
                        handleTableChange(page, sizePerPage)
                    }
                    pagesizedropdownflag
                    selectRow={selectRow}
                    rowEvents={rowEvents}
                    pageName=""
                    showCheckbox={true}
                />
            </div>
            <div className="user-list checkbox-margin">
                <RemotePagination
                    data={datas}
                    columns={columns1}
                    totalSize={totalSize ?? 0}
                    onTableChange={(page, sizePerPage) =>
                        handleTableChange(page, sizePerPage)
                    }
                    pagesizedropdownflag
                    selectRow={selectRow}
                    rowEvents={rowEvents}
                    pageName=""
                    showCheckbox={false}
                />
            </div>

        </div>
    )
}

export default CategoryList
