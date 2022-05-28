import React from 'react'
import { useHistory } from 'react-router';
import Buttons from '../../component/Buttons/Buttons';
import RemotePagination from '../../component/RemotePagination/RemotePagination';
import { UserListData } from './UserManagement'

interface Props {
    data: UserListData[];
    getUserListManagement: (page: any, sizePerPage: any) => void;
    totalSize?: number;
    selectRow?: any;
    rowEvents?: (tableRowEvents: any) => void;
}

const UserList: React.FC<Props> = ({ data, getUserListManagement, totalSize, selectRow, rowEvents }) => {
    const history = useHistory();

    const linkEditFollow = (
        cell: any,
        row: any,
        rowIndex: any,
        formatExtraData: any
    ) => {
        return (
            // <a className="action-link see-details-link" > Edit </a>
            <a className="action-link see-details-link" onClick={() => { history.push(`/user?id=${row.id}`) }}> Edit</a>
        );
    };

    const columns = [
        {
            dataField: "no_id",
            text: "Sr no.",
        },
        {
            dataField: "first_name",
            text: "First Name",
        },
        {
            dataField: "last_name",
            text: "Last Name",
        },
        {
            dataField: "email",
            text: "Email",
        },
        {
            dataField: "role_type",
            text: "Role Type",
        },
        {
            dataField: "created_at",
            text: "Created date",
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

export default UserList
