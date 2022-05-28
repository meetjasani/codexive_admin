import React from 'react'
import { useHistory } from 'react-router';
import RemotePagination from '../../component/RemotePagination/RemotePagination';
import { TestimonialListData } from './Testimonial'

interface Props {
    data: TestimonialListData[];
    getTestimonialListDataManagement: (page: any, sizePerPage: any) => void;
    totalSize?: number;
    selectRow?: any;
    rowEvents?: (tableRowEvents: any) => void;
}

const TestimonialList: React.FC<Props> = ({ data, getTestimonialListDataManagement, totalSize, selectRow, rowEvents }) => {

    const history = useHistory();

    const linkEditFollow = (
        cell: any,
        row: any,
        rowIndex: any,
        formatExtraData: any
    ) => {
        return (
            <a className="action-link see-details-link" onClick={() => { history.push(`/testimonial_registration?id=${row.id}`) }}> Edit</a>
        );
    };

    const BlogImage = (cell: any, row: any, rowIndex: any, formatExtraData: any) => {
        return (
            <img src={row.image} alt="" />
        )
    }

    const columns = [
        {
            dataField: "no_id",
            text: "Sr no.",
        },
        {
            dataField: 'image',
            text: 'Image',
            formatter: BlogImage,
        },
        {
            dataField: "name",
            text: "Name",
        },
        {
            dataField: "testimonial",
            text: "Testimonial",
        },
        {
            dataField: "position",
            text: "Position",
        },
        // {
        //     dataField: "created_at",
        //     text: "Created date",
        // },
        {
            dataField: "id",
            text: "Edit",
            formatter: linkEditFollow,
        }
    ];

    const handleTableChange = (pagenumber: number, sizeperpage: number) => {
        getTestimonialListDataManagement(pagenumber, sizeperpage);
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

export default TestimonialList
