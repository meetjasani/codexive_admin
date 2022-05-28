import React, { useEffect, useState } from 'react'

import { Button } from 'react-bootstrap';
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import { toast } from 'react-toastify';

export interface FooterData {
    description: string;
    socialIcon: {
        facebook: string,
        instagram: string,
        twitter: string,
        linkedIn: string
    };
    contactInfo: {
        location: string,
        contact_no: string,
        email: string,
        opening_time: string
    };
    copyRight: string;
}

function FooterSocialIcon() {
    const [footerData, setFooterData] = useState<FooterData>({
        description: "",
        socialIcon: {
            facebook: "",
            instagram: "",
            twitter: "",
            linkedIn: ""
        },
        contactInfo: {
            location: "",
            contact_no: "",
            email: "",
            opening_time: ""
        },
        copyRight: ""
    });

    const handleChange = (event: any, inputName: string) => {
        if (inputName === "description") {
            setFooterData({ ...footerData, description: event.target.value })
        }
        if (inputName === "socialIcon") {
            setFooterData({ ...footerData, socialIcon: { ...footerData.socialIcon, [event.target.name]: event.target.value } })
        }
        if (inputName === "contactInfo") {
            setFooterData({ ...footerData, contactInfo: { ...footerData.contactInfo, [event.target.name]: event.target.value } })
        }
        if (inputName === "copyright") {
            setFooterData({ ...footerData, copyRight: event.target.value })
        }
    }

    const handleSave = async () => {
        await ApiPost(`home/add-footer-section`, footerData)
            .then((response: any) => {
                toast.success("Success!")
            }).catch((error: any) => {
                toast.error("Fail!")
            });
    }
    const getDataById = async () => {
        await ApiGet(`home/get-footer-section`)
            .then((res: any) => {
                if (Object.keys(res.data).length === 0) {
                    setFooterData({
                        description: "",
                        socialIcon: {
                            facebook: "",
                            instagram: "",
                            twitter: "",
                            linkedIn: ""
                        },
                        contactInfo: {
                            location: "",
                            contact_no: "",
                            email: "",
                            opening_time: ""
                        },
                        copyRight: ""
                    })
                } else {
                    const data = res.data
                    delete data.id
                    setFooterData(data)
                }
            })

    }
    useEffect(() => {
        getDataById()
    }, [])

    return (
        <div className="pv-blogdetali">
            <div className="pv-blog-title">
                <p>Footer Details</p>
            </div>

            <table className=" pv-dashtable mt-3 custom-table-border">
                <tr className="font-18-bold pv-title-table">
                    <th >Description</th>
                    <td colSpan={5}> <input type="text" placeholder="Please enter description" value={footerData.description} onChange={(event) => { handleChange(event, "description"); }} /></td>
                </tr>
                <tr className="font-18-bold pv-title-table">
                    <th rowSpan={4}>Social Icon</th>
                    <th>Facebook</th>
                    <td> <input type="text" placeholder="Please enter facebook" name="facebook" value={footerData.socialIcon?.facebook} onChange={(event) => { handleChange(event, "socialIcon"); }} /></td>
                </tr>
                <tr className="font-18-bold pv-title-table">
                    <th>Instagram</th>
                    <td> <input type="text" placeholder="Please enter instagram" name="instagram" value={footerData.socialIcon?.instagram} onChange={(event) => { handleChange(event, "socialIcon"); }} /></td>
                </tr>
                <tr className="font-18-bold pv-title-table">
                    <th>Twitter</th>
                    <td> <input type="text" placeholder="Please enter twitter" name="twitter" value={footerData.socialIcon?.twitter} onChange={(event) => { handleChange(event, "socialIcon"); }} /></td>
                </tr>
                <tr className="font-18-bold pv-title-table">
                    <th>LinkedIn</th>
                    <td> <input type="text" placeholder="Please enter linkedin" name="linkedIn" value={footerData.socialIcon?.linkedIn} onChange={(event) => { handleChange(event, "socialIcon"); }} /></td>
                </tr>

                <tr className="font-18-bold pv-title-table">
                    <th rowSpan={4}>Contect Info</th>
                    <th>Location</th>
                    <td> <input type="text" placeholder="Please enter location" name="location" value={footerData.contactInfo?.location} onChange={(event) => { handleChange(event, "contactInfo"); }} /></td>
                </tr>
                <tr className="font-18-bold pv-title-table">
                    <th>Contact No</th>
                    <td> <input type="text" placeholder="Please enter contact_no" name="contact_no" value={footerData.contactInfo?.contact_no} onChange={(event) => { handleChange(event, "contactInfo"); }} /></td>
                </tr>
                <tr className="font-18-bold pv-title-table">
                    <th>Email</th>
                    <td> <input type="text" placeholder="Please enter email" name="email" value={footerData.contactInfo?.email} onChange={(event) => { handleChange(event, "contactInfo"); }} /></td>
                </tr>
                <tr className="font-18-bold pv-title-table">
                    <th>Opening Time</th>
                    <td> <input type="text" placeholder="Please enter opening time" name="opening_time" value={footerData.contactInfo?.opening_time} onChange={(event) => { handleChange(event, "contactInfo"); }} /></td>
                </tr>

                <tr className="font-18-bold pv-title-table">
                    <th >CopyRight</th>
                    <td colSpan={5}> <input type="text" name="copyRight" placeholder="Please enter copyright description" value={footerData.copyRight} onChange={(event) => { handleChange(event, "copyright"); }} /></td>
                </tr>

            </table>

            <div className="text-center ">
                <Button type="" className=" pv-main-btn-img btn-secondary" onClick={handleSave}>Save</Button>
            </div>
        </div>
    )
}

export default FooterSocialIcon
