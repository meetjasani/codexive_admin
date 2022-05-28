import React from 'react'
import { useHistory } from 'react-router';
import RemotePagination from '../../component/RemotePagination/RemotePagination';
import { ClientListData } from './OurClient';


interface Props {
    data: ClientListData[];
    getClientDataManagement: (page: any, sizePerPage: any) => void;
    totalSize?: number;
    selectRow?: any;
    rowEvents?: (tableRowEvents: any) => void;
}

const ClientList: React.FC<Props> = ({ data, getClientDataManagement, totalSize, selectRow, rowEvents }) => {

    const history = useHistory();

    const linkEditFollow = (
        cell: any,
        row: any,
        rowIndex: any,
        formatExtraData: any
    ) => {
        return (
            <a className="action-link see-details-link" onClick={() => { history.push(`/add_client?id=${row.id}`) }}> Edit</a>
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


    const columns = [
        {
            dataField: "no_id",
            text: "Sr no.",
        },
        {
            dataField: "clientInfo",
            text: "Description",
        },
        {
            dataField: "image",
            text: "Image",
            formatter: linkImageFollow,
        },
        {
            dataField: "id",
            text: "Edit",
            formatter: linkEditFollow,
        }
    ];

    const handleTableChange = (pagenumber: number, sizeperpage: number) => {
        getClientDataManagement(pagenumber, sizeperpage);
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

export default ClientList
