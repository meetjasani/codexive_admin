import React from 'react'
import { useHistory } from 'react-router';
import RemotePagination from '../../component/RemotePagination/RemotePagination';
import { ServicesListData } from './services'

interface Props {
    data: ServicesListData[];
    getUserListManagement: (page: any, sizePerPage: any) => void;
    totalSize?: number;
    selectRow?: any;
    rowEvents?: (tableRowEvents: any) => void;
}

const ServicesList: React.FC<Props> = ({ data, getUserListManagement, totalSize, selectRow, rowEvents }) => {
    const history = useHistory();

    const linkEditFollow = (
        cell: any,
        row: any,
        rowIndex: any,
        formatExtraData: any
    ) => {
        return (
            <a className="action-link see-details-link" onClick={() => { history.push(`/add_services?id=${row.id}`) }}> Edit</a>
        );
    };

    const linkImageFollow = (
        cell: any,
        row: any,
        rowIndex: any,
        formatExtraData: any
    ) => {
        return (
            <img alt="" src={row.image}></img>
        );
    };

    const secondlinkImageFollow = (
        cell: any,
        row: any,
        rowIndex: any,
        formatExtraData: any
    ) => {
        return (
            <img alt="" src={row.image_second}></img>
        );
    };


    const columns = [
        {
            dataField: "no_id",
            text: "Sr no.",
        },
        {
            dataField: "main_service",
            text: "Main Service",
        },
        {
            dataField: "sub_services",
            text: "Sub Services",
        },
        {
            dataField: "title",
            text: "Title",
        },
        {
            dataField: "description",
            text: "Description",
        },
        {
            dataField: "image",
            text: "Image",
            formatter: linkImageFollow,
        },
        {
            dataField: "title_second",
            text: "Title 1",
        },
        {
            dataField: "description_second",
            text: "Description 1",
        },
        {
            dataField: "image_second",
            text: "Image 1",
            formatter: secondlinkImageFollow,
        },
        {
            dataField: "id",
            text: "Edit",
            formatter: linkEditFollow,
        }
    ];

    const handleTableChange = (pagenumber: number, sizeperpage: number) => {
        getUserListManagement(pagenumber, sizeperpage);
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

        </div>
    )
}

export default ServicesList
