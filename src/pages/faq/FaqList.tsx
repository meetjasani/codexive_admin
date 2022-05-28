import React from 'react'
import { useHistory } from 'react-router';
import RemotePagination from '../../component/RemotePagination/RemotePagination';
import { faqListData } from './Faq';

interface Props {
    data: faqListData[];
    getFaqListManagement: (page: any, sizePerPage: any) => void;
    totalSize?: number;
    selectRow?: any;
    rowEvents?: (tableRowEvents: any) => void;
}

const FaqList: React.FC<Props> = ({ data, getFaqListManagement, totalSize, selectRow, rowEvents }) => {
    console.log(data);

    const history = useHistory();

    const linkEditFollow = (
        cell: any,
        row: any,
        rowIndex: any,
        formatExtraData: any
    ) => {
        return (
            <a className="action-link see-details-link" onClick={() => { history.push(`/create_faq?id=${row.id}`) }}> Edit</a>
        );
    };


    const columns = [
        {
            dataField: "no_id",
            text: "Sr no.",
        },
        {
            dataField: 'question',
            text: 'Qusetion '
        }, {
            dataField: 'answer',
            text: 'Answer'
        },
        {
            dataField: "id",
            text: "Edit",
            formatter: linkEditFollow,
        }
    ];

    const handleTableChange = (pagenumber: number, sizeperpage: number) => {
        getFaqListManagement(pagenumber, sizeperpage);
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

export default FaqList
