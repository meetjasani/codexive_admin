import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import { toast } from 'react-toastify';
import MessageCKEditor from '../../component/MessageCKEditor';

function Setting() {
    const [settingData, setSettingData] = useState<any>(
        {
            username: "",
            password: "",
            discription: "",
            setting: [
                {
                    form_name: "Home",
                    is_active: false
                },
                {
                    form_name: "About_Us",
                    is_active: false
                },
                {
                    form_name: "Career",
                    is_active: false
                },
                {
                    form_name: "Services",
                    is_active: false
                },
                {
                    form_name: "Portfolio",
                    is_active: false
                },
                {
                    form_name: "Blog",
                    is_active: false
                },
                {
                    form_name: "Team",
                    is_active: false
                },
                {
                    form_name: "Testimonial",
                    is_active: false
                },
                {
                    form_name: "Contact_Us",
                    is_active: false
                },
                {
                    form_name: "Get_Quote",
                    is_active: false
                },
                {
                    form_name: "Homepage",
                    is_active: false
                },
                {
                    form_name: "WhyChoose",
                    is_active: false
                },
                {
                    form_name: "AboutUs",
                    is_active: false
                },
                {
                    form_name: "Specialty",
                    is_active: false
                },
                {
                    form_name: "Howwork",
                    is_active: false
                },
                {
                    form_name: "Portfoliamain",
                    is_active: false
                },
                {
                    form_name: "Ceoexpert",
                    is_active: false
                },
                {
                    form_name: "OurCustomer",
                    is_active: false
                },
                {
                    form_name: "Ourslide",
                    is_active: false
                },
            ]
        }
    );
    const [featuresArr, setFeaturesArr] = useState([""])
    const [talkData, setTalkData] = useState<any>("")
    const uniqueIdState = "";


    const handleadddsection = () => {
        setFeaturesArr([
            ...featuresArr,
            ""
        ])
    }
    const handleTalkChange = (newData: any) => {
        setTalkData(newData)
    }
    const handleRemovesection = (index: any) => {
        let data = [...featuresArr]
        if (featuresArr.length > 0) {
            let v1 = data.splice(index, 1)
            setFeaturesArr(data)
        }
    }

    const handleKeyFeature = (e: any, index: number) => {
        let tempData = [...featuresArr]
        tempData[index] = e.target.value
        setFeaturesArr(tempData)
    }

    const handleSave = () => {
        let body = { ...settingData, key_point: featuresArr.map((da) => da).join(','), let_s_talk: talkData }

        ApiPost(`general/add-setting`, body)
            .then((response: any) => {
                toast.success("Success!")
            }).catch((error: any) => {
                toast.error("Fail!")
            });
    }

    const getDataById = () => {
        ApiGet(`general/get-setting-by-id`)
            .then((res: any) => {
                if (Object.keys(res.data).length === 0) {
                    setSettingData({
                        username: "",
                        password: "",
                        discription: "",
                        key_point: "",
                        setting: [
                            {
                                form_name: "Home",
                                is_active: false
                            },
                            {
                                form_name: "About_Us",
                                is_active: false
                            },
                            {
                                form_name: "Career",
                                is_active: false
                            },
                            {
                                form_name: "Services",
                                is_active: false
                            },
                            {
                                form_name: "Portfolio",
                                is_active: false
                            },
                            {
                                form_name: "Blog",
                                is_active: false
                            },
                            {
                                form_name: "Team",
                                is_active: false
                            },
                            {
                                form_name: "Testimonial",
                                is_active: false
                            },
                            {
                                form_name: "Contact_Us",
                                is_active: false
                            },
                            {
                                form_name: "Get_Quote",
                                is_active: false
                            },
                            {
                                form_name: "Homepage",
                                is_active: false
                            },
                            {
                                form_name: "WhyChoose",
                                is_active: false
                            },
                            {
                                form_name: "AboutUs",
                                is_active: false
                            },
                            {
                                form_name: "Specialty",
                                is_active: false
                            },
                            {
                                form_name: "Howwork",
                                is_active: false
                            },
                            {
                                form_name: "Portfoliamain",
                                is_active: false
                            },
                            {
                                form_name: "Ceoexpert",
                                is_active: false
                            },
                            {
                                form_name: "OurCustomer",
                                is_active: false
                            },
                            {
                                form_name: "Ourslide",
                                is_active: false
                            },
                        ]
                    })
                    setTalkData("")
                } else {
                    const data = res.data
                    if (data.setting.length == 0) {
                        data.setting = [
                            {
                                form_name: "Home",
                                is_active: false
                            },
                            {
                                form_name: "About_Us",
                                is_active: false
                            },
                            {
                                form_name: "Career",
                                is_active: false
                            },
                            {
                                form_name: "Services",
                                is_active: false
                            },
                            {
                                form_name: "Portfolio",
                                is_active: false
                            },
                            {
                                form_name: "Blog",
                                is_active: false
                            },
                            {
                                form_name: "Team",
                                is_active: false
                            },
                            {
                                form_name: "Testimonial",
                                is_active: false
                            },
                            {
                                form_name: "Contact_Us",
                                is_active: false
                            },
                            {
                                form_name: "Get_Quote",
                                is_active: false
                            },
                            {
                                form_name: "Homepage",
                                is_active: false
                            },
                            {
                                form_name: "WhyChoose",
                                is_active: false
                            },
                            {
                                form_name: "AboutUs",
                                is_active: false
                            },
                            {
                                form_name: "Specialty",
                                is_active: false
                            },
                            {
                                form_name: "Howwork",
                                is_active: false
                            },
                            {
                                form_name: "Portfoliamain",
                                is_active: false
                            },
                            {
                                form_name: "Ceoexpert",
                                is_active: false
                            },
                            {
                                form_name: "OurCustomer",
                                is_active: false
                            },
                            {
                                form_name: "Ourslide",
                                is_active: false
                            },
                        ]
                    }
                    data.setting = data.setting.map((setting: any) => {
                        return {
                            ...setting,
                            is_active: setting.is_active == "true" ? true : false
                        }
                    })
                    setTalkData(data?.let_s_talk)
                    setSettingData(data)
                    setFeaturesArr(res.data.key_point)
                }
            })
    }

    useEffect(() => {
        getDataById()
    }, [])

    const handleChange = (event: any, inputName: string) => {
        if (inputName === "emailSetting") {
            setSettingData({ ...settingData, [event.target.name]: event.target.value })
        }
        if (inputName === "careerSetting") {
            setSettingData({ ...settingData, [event.target.name]: event.target.value })
        }
    }

    const handleMenuChange = (index: number, event: any, inputName: string) => {
        if (inputName === "menuSetting") {
            const tempdata = [...settingData.setting];
            tempdata[index].form_name = event.target.value;
            setSettingData({ ...settingData, setting: tempdata });
        }
        if (inputName === "menuSettingActive") {
            const tempdata = [...settingData.setting];
            tempdata[index].is_active = event.target.checked;
            setSettingData({ ...settingData, setting: tempdata });
        }
    }

    return (
        <div className="pv-blogdetali">
            <div className="pv-blog-title">
                <p>Email Settings</p>
            </div>
            <table className=" pv-dashtable mt-3 custom-table-border">
                <tr className="font-18-bold pv-title-table">
                    <th>Username</th>
                    <td> <input type="text" placeholder="Please enter username" name="username" value={settingData.username} onChange={(event) => { handleChange(event, "emailSetting"); }} /></td>
                </tr>
                <tr className="font-18-bold pv-title-table">
                    <th>Password</th>
                    <td> <input type="password" placeholder="Please enter username" name="password" value={settingData.password} onChange={(event) => { handleChange(event, "emailSetting"); }} /></td>
                </tr>

            </table>
            <div className="pv-blog-title mt-5">
                <p>Career Settings</p>
            </div>
            <table className=" pv-dashtable mt-3 custom-table-border">
                <tr className="font-18-bold pv-title-table">
                    <th>Discription</th>
                    <td> <input type="text" placeholder="Please enter discription" name="discription" value={settingData.discription} onChange={(event) => { handleChange(event, "careerSetting"); }} /></td>
                </tr>
                {featuresArr && featuresArr.length > 0 && featuresArr.map((feature: any, index: number) => (
                    <tr className="font-18-bold pv-title-table">
                        <th>Key Point</th>
                        <td> <input type="text" placeholder="Please enter key point" name="key_point" value={feature} onChange={(e) => handleKeyFeature(e, index)} />
                            {featuresArr.length > 0 && <Button className="btn-danger" onClick={() => handleRemovesection(index)} >-</Button>}
                            {(index == featuresArr.length - 1) && <Button className="pv-btn" onClick={handleadddsection} >+</Button>}
                        </td>
                    </tr>
                ))}
                <tr className="font-18-bold pv-title-table">
                    <th>Let's Talk</th>
                    <td>
                        <MessageCKEditor
                            onChange={handleTalkChange}
                            data={talkData}
                            uniqueid={uniqueIdState}
                            fullToolbar={true}
                        />

                        {/* <textarea placeholder="Please enter lets talk" name="let_s_talk" value={settingData.let_s_talk} onChange={(event) => { handleChange(event, "careerSetting"); }} /> */}
                    </td>
                </tr>
            </table>

            <div className="pv-blog-title mt-5">
                <p>Menu Settings</p>
            </div>
            <table className=" pv-dashtable mt-3 custom-table-border">
                {settingData?.setting.map((item: any, index: number) => (
                    <>
                        <tr className="font-18-bold pv-title-table">
                            <th>Form Name</th>
                            <td> <input type="text" readOnly placeholder="Please enter form_name" name="form_name" value={item?.form_name} onChange={(event) => { handleMenuChange(index, event, "menuSetting"); }} /></td>
                            <td> <input type="checkbox" name="is_active" checked={item?.is_active} onChange={(event) => { handleMenuChange(index, event, "menuSettingActive"); }} /></td>
                            <div className="w-100 justify-content-end d-flex">
                                {/* {settingData?.setting.length - 1 === index && (
                                    <Button type="" className=" pv-main-btn-img btn-secondary" onClick={handleadddsection}>+ Add Section</Button>
                                )} */}
                            </div>
                        </tr>
                    </>
                ))}
            </table>

            <div className="text-center ">
                <Button type="" className=" pv-main-btn-img btn-secondary" onClick={handleSave}>Save</Button>
            </div>

        </div>
    )
}

export default Setting
