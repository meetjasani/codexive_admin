import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import { useHistory } from 'react-router';
import { ApiGet, ApiPut } from '../../helper/API/ApiData';
import FaqList from './FaqList'

export interface faqListData {
    id: string;
    question: string;
    answer: string
}
function Faq() {
    const history = useHistory();
    const createFaq = () => { history.push("/create_faq") }

    const [faqData, setFaqData] = useState<faqListData[]>([])
    const [totalSize, setTotalSize] = useState<number>(0);
    const [faqListId, setFaqListId] = useState<any>([]);





    const getFaqListManagement = (page_number = 1, per_page = 10) => {


        ApiGet(`faq/get-faq?per_page=${per_page}&page_number=${page_number}`)
            .then((res: any) => {
                setTotalSize(res.data && res.data.count);
                setFaqData(res.data.faq.map((x: any, index: any) => {
                    return {
                        id: x.id,
                        no_id: res.data.count - (page_number - 1) * per_page - index,
                        question: x.question,
                        answer: x.answer,
                    };
                }));
            })

    }

    const selectRow = {
        mode: "checkbox",
        onSelect: (isSelect: any, rows: any, e: any) => {
            const index = faqListId.findIndex(
                (item: any) => item.id === isSelect.id
            );
            if (index !== -1 && index !== undefined) {
                faqListId.splice(index, 1);
            } else {
                faqListId.push({ id: isSelect.id });
            }
        },
        onSelectAll: (isSelect: any, rows: any, e: any) => {
            if (isSelect === true) {
                rows.map((x: any) => (
                    faqListId.push({ id: x.id })
                ));
            } else {
                setFaqListId([]);
            }
        },
    };

    const deleteFaq = () => {
        if (faqListId.length > 0) {
            ApiPut(`faq/delete-faq`, {
                id: faqListId.map((m: any) => m.id).join(","),
            }).then((res: any) => {
                getFaqListManagement()
                setFaqListId([])
            });
        }
    }

    useEffect(() => {
        getFaqListManagement()
    }, [])


    return (
        <div className="pv-projectview" >

            <div className="pv-project-btn">
                <div>
                    <h5 className="font-27-bold text-left">FAQ</h5>
                </div>

                <div className="btn-primary-pv  ml-auto">
                    <Button className="dash-bg-pink btn btn-primary" onClick={createFaq}>
                        Create
                    </Button>

                    <Button className="dash-bg-pink btn btn-primary" onClick={deleteFaq}>
                        Delete
                    </Button>
                </div>
            </div>


            <div className="pv-view">
                <FaqList
                    data={faqData}
                    getFaqListManagement={getFaqListManagement}
                    totalSize={totalSize}
                    selectRow={selectRow}
                />
            </div>

        </div>
    )
}

export default Faq
