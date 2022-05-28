import React, { useEffect, useState } from 'react'
import MessageCKEditor from '../../component/MessageCKEditor';
import { Button } from 'react-bootstrap';
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import { toast } from 'react-toastify';

const PrivacyPolicy = () => {
    const [details, setDetail] = useState("")
    const handleChange = (newData: any) => {
        setDetail(newData)
    };
    const uniqueIdState = "";


    const getDataById = () => {
        ApiGet(`policy/get-privacy-policy`)
            .then((res: any) => {
                setDetail(res.data?.details)
            })
    }
    useEffect(() => {
        getDataById()
    }, [])

    const handleEditMessage = (messageId: string, messageContent: string, title: string) => {
        setDetail(messageContent)
    };

    const handleSave = () => {
        let newDetail = {
            details
        }
        ApiPost(`policy/add-privacy-policy`, newDetail)
            .then((response: any) => {
                toast.success("Success!")
            }).catch((error: any) => {
                toast.error("Fail!")
            });
    }

    return (
        <div className="pv-projectview" >
            <div className="pv-blogdetali">
                <div className="pv-blog-title">
                    <p>Privacy Policy</p>
                </div>
                <table className=" pv-dashtable mt-3 custom-table-border">

                    <tr className="font-18-bold pv-title-table">
                        <th>Privacy Policy</th>
                        <td>
                            <MessageCKEditor
                                onChange={handleChange}
                                onEdit={handleEditMessage}
                                data={details}
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

        </div>

    )
}

export default PrivacyPolicy
