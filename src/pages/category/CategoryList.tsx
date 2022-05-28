import React from 'react'
import { useHistory } from 'react-router';
import RemotePagination from '../../component/RemotePagination/RemotePagination';
import { CategoryListData } from './Category'

interface Props {
    data: CategoryListData[];
    getUserListManagement: (page: any, sizePerPage: any) => void;
    totalSize?: number;
    selectRow?: any;
    rowEvents?: (tableRowEvents: any) => void;
}

const CategoryList: React.FC<Props> = ({ data, getUserListManagement, totalSize, selectRow, rowEvents }) => {
    const history = useHistory();

    const linkEditFollow = (
        cell: any,
        row: any,
        rowIndex: any,
        formatExtraData: any
    ) => {
        return (
            <a className="action-link see-details-link" onClick={() => { history.push(`/add_category?id=${row.id}`) }}> Edit</a>
        );
    };

    const linkParentCategoryIdFollow = (
        cell: any,
        row: any,
        rowIndex: any,
        formatExtraData: any
    ) => {
        return (
            row?.parent_category_id == "0" ? "" : row?.parent_category_id
        );
    };


    const columns = [
        {
            dataField: "no_id",
            text: "Sr no.",
        },
        {
            dataField: "category",
            text: "Category",
        },
        {
            dataField: "parent_category_id",
            text: "Parent Category Id",
            formatter: linkParentCategoryIdFollow
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

export default CategoryList
