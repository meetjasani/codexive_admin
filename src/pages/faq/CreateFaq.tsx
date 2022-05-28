import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { ApiGet, ApiPost, ApiPut } from '../../helper/API/ApiData';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

const CreateFaq = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    const history = useHistory()
    const [faqData, setFaqData] = useState({
        question: "",
        answer: "",
    })
    useEffect(() => {
        if (id != null && id != undefined) {
            getCategoryById()
        }
    }, [id])


    const getCategoryById = () => {
        ApiGet(`faq/get-faq/${id}`)
            .then((res: any) => {
                setFaqData({
                    ...faqData,
                    question: res.data?.question,
                    answer: res.data?.answer
                })
            })
    }



    const handleData = (e: any) => {
        setFaqData({
            ...faqData,
            [e.target.name]: e.target.value
        })
    }

    const handleSaveData = () => {
        if (id != null && id != undefined) {
            ApiPut(`faq/edit-faq/${id}`, faqData)
                .then((response: any) => {
                    goToFaq()
                    toast.success("Success!")
                }).catch((error: any) => {
                    toast.error("Fail!")
                });
        } else {
            ApiPost(`faq/add-faq`, faqData)
                .then((response: any) => {
                    goToFaq()
                    toast.success("Success!")
                }).catch((error: any) => {
                    toast.error("Fail!")
                });

        }
    }

    const goToFaq = () => {
        history.push("/faq")
    }

    return (
        <div>
            <table className=" pv-dashtable mt-3 custom-table-border">

                <tr className="font-18-bold pv-title-table">
                    <th>Question</th>
                    <td> <input type="text" placeholder="Please enter question" value={faqData.question} onChange={(e) => handleData(e)} name="question" /></td>
                </tr>
                <tr className="font-18-bold pv-title-table">
                    <th>Answer</th>
                    <td> <input type="text" placeholder="Please enter answer" value={faqData.answer} onChange={(e) => handleData(e)} name="answer" /></td>
                </tr>

            </table>

            <div className="text-center ">

                <Button type="" className=" pv-main-btn-img btn-secondary" onClick={handleSaveData}>Save</Button>

            </div>
        </div>
    )
}

export default CreateFaq
