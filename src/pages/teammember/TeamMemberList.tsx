import React from 'react'
import { useHistory } from 'react-router';
import Buttons from '../../component/Buttons/Buttons';
import RemotePagination from '../../component/RemotePagination/RemotePagination';
import { parentCategory } from '../../helper/util';
import { teamMemberListData } from './TeamMember';

interface Props {
    data: teamMemberListData[];
    getUserListManagement: (page: any, sizePerPage: any) => void;
    totalSize?: number;
    selectRow?: any;
    rowEvents?: (tableRowEvents: any) => void;
}

const TeamMemberList: React.FC<Props> = ({ data, getUserListManagement, totalSize, selectRow, rowEvents }) => {
    const history = useHistory();

    const linkEditFollow = (
        cell: any,
        row: any,
        rowIndex: any,
        formatExtraData: any
    ) => {
        return (
            <a className="action-link see-details-link" onClick={() => { history.push(`/editteammember?id=${row.id}`) }}> Edit</a>
        );
    };

    // const linkParentCategoryId = (
    //     cell: any,
    //     row: any,
    //     rowIndex: any,
    //     formatExtraData: any
    // ) => {
    //     console.log("ccc", parentCategory(data, row?.parent_category_id))
    //     return (
    //         parentCategory(data, row?.parent_category_id)
    //     );
    // };

    const TeamMemberImage = (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
        return (
            <img src={row.image} alt="" />
        )
    }

    const columns = [{
        dataField: 'no_id',
        text: 'ID'
    }, {
        dataField: 'id_number',
        text: 'Id Number'
    },
    {
        dataField: 'image',
        text: 'Member Image',
        formatter: TeamMemberImage,
    },
    {
        dataField: 'firstname',
        text: 'First Name'
    },
    {
        dataField: 'lastname',
        text: 'Last Name'
    },
    {
        dataField: 'skill',
        text: 'Skill'
    },
    {
        dataField: 'member_type',
        text: 'Member Position'
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

export default TeamMemberList
