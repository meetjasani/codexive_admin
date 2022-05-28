import React from 'react'
import { useHistory } from 'react-router';
import RemotePagination from '../../component/RemotePagination/RemotePagination';
import { TechListData } from './allTech'

interface Props {
    data: TechListData[];
    getUserListManagement: (page: any, sizePerPage: any) => void;
    totalSize?: number;
    selectRow?: any;
    rowEvents?: (tableRowEvents: any) => void;
}

const TechList: React.FC<Props> = ({ data, getUserListManagement, totalSize, selectRow, rowEvents }) => {
    const history = useHistory();

    const linkEditFollow = (
        cell: any,
        row: any,
        rowIndex: any,
        formatExtraData: any
    ) => {
        return (
            <a className="action-link see-details-link" onClick={() => { history.push(`/add_tech?id=${row.id}`) }}> Edit</a>
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
            dataField: "type",
            text: "Technology Type",
        },
        {
            dataField: "name",
            text: "Technology",
        },
        {
            dataField: "image",
            text: "Technology Image",
            formatter: linkImageFollow,
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

export default TechList