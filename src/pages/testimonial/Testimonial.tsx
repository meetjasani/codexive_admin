import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import Buttons from '../../component/Buttons/Buttons'
import { ApiGet, ApiPut } from '../../helper/API/ApiData';
import TestimonialList from './TestimonialList';

export interface TestimonialListData {
    id: string;
    no_id: string;
    created_at: string
    title: string
    details: string
    technologies: string
    image: string
}

const Testimonial = () => {
    const history = useHistory();
    const [testimonialData, setTestimonialData] = useState<TestimonialListData[]>([])
    const [totalSize, setTotalSize] = useState<number>(0);
    const [testimonialListId, settesTimonialListId] = useState<any>([]);

    const getTestimonialListData = (page_number = 1, per_page = 10) => {
        ApiGet(`testimonial/get-testimonial-by-admin?per_page=${per_page}&page_number=${page_number}`)
            .then((res: any) => {
                console.log("res.data res.data res.data res.data res.data", res);

                setTotalSize(res.data && res.data.count);
                setTestimonialData(res.data &&
                    res.data.testimonials &&
                    res.data.testimonials.map((x: any, index: any) => {
                        return {
                            id: x.id,
                            no_id: res.data.count - (page_number - 1) * per_page - index,
                            name: x.name,
                            testimonial: x.testimonial,
                            position: x.position,
                            image: x.image
                        };
                    }))
            })
    }

    const selectRow = {
        mode: "checkbox",
        onSelect: (isSelect: any, rows: any, e: any) => {
            const index = testimonialListId.findIndex(
                (item: any) => item.id === isSelect.id
            );
            if (index !== -1 && index !== undefined) {
                testimonialListId.splice(index, 1);
            } else {
                testimonialListId.push({ id: isSelect.id });
            }
        },
        onSelectAll: (isSelect: any, rows: any, e: any) => {
            if (isSelect === true) {
                rows.map((x: any) => (
                    testimonialListId.push({ id: x.id })
                ));
            } else {
                settesTimonialListId([]);
            }
        },
    };

    const deleteTestimonial = () => {
        if (testimonialListId.length > 0) {
            ApiPut(`testimonial/delete-testimonial-by-admin`, {
                id: testimonialListId.map((m: any) => m.id).join(","),
            }).then((res: any) => {
                getTestimonialListData()
                settesTimonialListId([])
            });
        }
    }

    const createTestimonial = () => {
        history.push("/testimonial_registration")
    }

    useEffect(() => {
        getTestimonialListData()
    }, [])

    return (
        <div className="pv-projectview">
            <div className="pv-project-btn">
                <div>
                    <h5 className="font-27-bold text-left">Testimonial</h5>
                </div>
                <div className="btn-primary-pv ml-auto">
                    <Buttons type="" ButtonStyle="dash-bg-pink btn btn-primary" onClick={createTestimonial}>  Create </Buttons>
                    <Buttons type="" ButtonStyle="dash-bg-pink btn btn-primary" onClick={deleteTestimonial}>  Delete </Buttons>
                </div>
            </div>
            <div className="pv-view">
                <TestimonialList
                    data={testimonialData}
                    getTestimonialListDataManagement={getTestimonialListData}
                    totalSize={totalSize}
                    selectRow={selectRow}
                />
            </div>

        </div>
    )
}

export default Testimonial