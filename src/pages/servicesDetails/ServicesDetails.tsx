import React, { useEffect, useState } from 'react'
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import { toast } from 'react-toastify';
import MessageCKEditor from '../../component/MessageCKEditor';
import { Button } from 'react-bootstrap';

const ServicesDetails = () => {

    const [title, settitle] = useState("");
    const [detail, setDetail] = useState("")
    const [description, setDescription] = useState("")

    const uniqueIdState = "";
    const handleChange = (newData: any) => {
        setDescription(newData)
    };
    const handleDetailChange = (newData: any) => {
        setDetail(newData)
    };
    const getDataById = () => {
        ApiGet(`servicesDetails/get-services-details`)
            .then((res: any) => {
                setDetail(res.data?.details)
                settitle(res.data?.title)
                setDescription(res.data?.description)
            })
    }
    useEffect(() => {
        getDataById()
    }, [])

    const handleSave = () => {
        const newServiceData = {
            title,
            details: detail,
            description
        }
        ApiPost(`servicesDetails/add-services-details`, newServiceData)
            .then((response: any) => {
                toast.success("Success!")
            }).catch((error: any) => {
                toast.error("Fail!")
            });
    }

    return (
        <div className="pv-blogdetali">
            <div className="pv-blog-title">
                <p>Services Details</p>
            </div>
            <table className=" pv-dashtable mt-3 custom-table-border">

                <tr className="font-18-bold pv-title-table">
                    <th>Title</th>
                    <td> <input type="text" value={title} onChange={(e) => settitle(e.target.value)} placeholder="Please enter title" /></td>
                </tr>
                <tr className="font-18-bold pv-title-table">
                    <th>Description</th>
                    <td>
                        <MessageCKEditor
                            onChange={handleChange}
                            data={description}
                            uniqueid={uniqueIdState}
                            fullToolbar={true}
                        />
                    </td>
                </tr>

                <tr className="font-18-bold pv-title-table">
                    <th>Details</th>
                    <td>
                        <MessageCKEditor
                            onChange={handleDetailChange}
                            data={detail}
                            uniqueid={uniqueIdState}
                            fullToolbar={true}
                        />
                    </td>
                </tr>
            </table>
            <div className="text-center ">
                <Button type="" className=" pv-main-btn-img btn-secondary" onClick={handleSave}>Save</Button>
            </div>
        </div>
    )
}

export default ServicesDetails
