import React from 'react'
import { useHistory } from 'react-router';
import Buttons from '../../component/Buttons/Buttons';
import RemotePagination from '../../component/RemotePagination/RemotePagination';
import { parentCategory } from '../../helper/util';
import { PortfolioListData } from './Portfolio';

interface Props {
    data: PortfolioListData[];
    getUserListManagement: (page: any, sizePerPage: any) => void;
    totalSize?: number;
    selectRow?: any;
    rowEvents?: (tableRowEvents: any) => void;
}

const PortfolioList: React.FC<Props> = ({ data, getUserListManagement, totalSize, selectRow, rowEvents }) => {
    const history = useHistory();

    const linkEditFollow = (
        cell: any,
        row: any,
        rowIndex: any,
        formatExtraData: any
    ) => {
        return (
            <a className="action-link see-details-link" onClick={() => { history.push(`/add_portfolio?id=${row.id}`) }}> Edit</a>
        );
    };

    const linkParentCategoryId = (
        cell: any,
        row: any,
        rowIndex: any,
        formatExtraData: any
    ) => {
        console.log("ccc", parentCategory(data, row?.parent_category_id))
        return (
            parentCategory(data, row?.parent_category_id)
        );
    };

    const PortfolioImage = (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
        let image = row.main_image ? row.main_image.displayImage : ""
        return (
            <img src={image} alt="" />
        )
    }

    const PortfolioImages = (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
        let image = row?.image[0]?.displayImage || ""
        return (
            <img src={image} alt="" />
        )
    }

    const columns = [{
        dataField: 'no_id',
        text: 'ID'
    }, {
        dataField: 'name',
        text: 'Portfolio Name'
    }, {
        dataField: 'introduction',
        text: 'Description'
    }, , {
        dataField: 'key_features',
        text: 'Portfolio Features'
    }, {
        dataField: 'technical_overview',
        text: 'Portfolio Technical Overview'
    }, {
        dataField: 'main_image',
        text: 'Portfolio Main Image',
        formatter: PortfolioImage,
    }, {
        dataField: 'image',
        text: 'Portfolio Images',
        formatter: PortfolioImages,
    }, {
        dataField: 'created_at',
        text: 'Date'
    }, {
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

export default PortfolioList
