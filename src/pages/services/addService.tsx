import React, { useEffect, useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router';
import { ApiGet, ApiPatch, ApiPost, ApiPut } from '../../helper/API/ApiData';
import { toast } from 'react-toastify';
import MessageCKEditor from '../../component/MessageCKEditor';

const AddService = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");

    const uniqueIdState = "";
    const history = useHistory();
    const [serviceData, setServiceData] = useState<any>({
        main_service: "",
        sub_services: "",
        title: "",
        image: "",
        displayImage: "",
        title_second: "",
        image_second: "",
        displayImage_second: "",
    })
    const [detail, setDetail] = useState("")
    const [description, setDescription] = useState("")

    const [getCategoryData, setGetCategoryData] = useState([])
    const [selectedMainFile, setSelectedMainFile] = useState<File>();
    const [selectedMainFileSecond, setSelectedMainFileSecond] = useState<File>();
    const [getCategory, setGetCategory] = useState([])
    const [disable, setDisable] = useState(false)
    const [getTechData, setGetTechData] = useState({
        Category: [],
        Services: []
    })

    useEffect(() => {
        if (id != null && id != undefined) {
            getServiceById()
        }
    }, [id])

    useEffect(() => {
        getTechnologyCall()
    }, [])

    const handleDescriptionChange = (newData: any) => {
        setDescription(newData)
    };

    const handleDetailChange = (newData: any) => {
        setDetail(newData)
    };

    const uploadImage = () => {
        let formData = new FormData();
        if (selectedMainFile) {
            formData.append('image', selectedMainFile);
            ApiPost("general/file-and-image-upload", formData)
                .then((res: any) => {
                    setServiceData({ ...serviceData, image: res.url, displayImage: res.display_url });
                    setSelectedMainFile(undefined)
                }).catch((error) => {
                    console.log("error", error);
                })
        }
        if (selectedMainFileSecond) {
            formData.append('image', selectedMainFileSecond);
            ApiPost("general/file-and-image-upload", formData)
                .then((res: any) => {
                    setServiceData({ ...serviceData, image_second: res.url, displayImage_second: res.display_url });
                    setSelectedMainFile(undefined)
                }).catch((error) => {
                    console.log("error", error);
                })
        }
    }

    const getTechnologyCall = () => {
        ApiGet(`tech/getTechnologyByType`)
            .then((res: any) => {
                setGetTechData(res.data)
            })
    }

    useEffect(() => {
        if (selectedMainFile) {
            uploadImage()
        }
        if (selectedMainFileSecond) {
            uploadImage()
        }
    }, [selectedMainFile, selectedMainFileSecond])

    const attechImage = () => {
        document.getElementById(`attechImage`)?.click();
    };

    const attechImageSecond = () => {
        document.getElementById(`attechImageSecond`)?.click();
    };

    const getServiceById = () => {
        ApiGet(`service/getAllServiceById/${id}`)
            .then((res: any) => {
                if (Object.keys(res.data).length === 0) {
                    setServiceData({
                        main_service: "",
                        sub_services: "",
                        title: "",
                        image: "",
                        displayImage: "",
                        title_second: "",
                        image_second: "",
                        displayImage_second: "",
                    })
                    setDescription("")
                    setDetail("")
                } else {
                    setServiceData({
                        main_service: res.data?.main_service,
                        sub_services: res.data?.sub_services,
                        title: res.data?.title,
                        image: res.data?.image?.image,
                        displayImage: res.data?.image?.displayImage,
                        title_second: res.data?.title_second,
                        image_second: res.data?.image_second?.image,
                        displayImage_second: res.data?.image_second?.displayImage,
                    })
                    setDescription(res.data?.description)
                    setDetail(res.data?.description_second)
                }
            })
    }

    const handleChange = (e: any) => {
        setServiceData({
            ...serviceData,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        getCategoryCall()
    }, [])

    const getCategoryCall = () => {
        ApiGet(`category/categoryDropDown`)
            .then((res: any) => {
                setGetCategoryData(res.data)
            })
    }

    const handleSave = () => {
        let body = {
            ...serviceData,
            sub_services_id: serviceData.sub_services,
            description: description,
            description_second: detail
        };
        let displayImage = body.displayImage
        let displayImage_second = body.displayImage_second
        delete body.displayImage
        delete body.displayImage_second
        if (id != null && id != undefined) {
            ApiPut(`service/edit-Services/${id}`, body)
                .then((response: any) => {
                    goToList()
                    toast.success("Success!")
                }).catch((error: any) => {
                    toast.error("Fail!")
                    setServiceData({ ...serviceData, displayImage, displayImage_second })
                });
        } else {
            ApiPost(`service/add-service`, body)
                .then((response: any) => {
                    toast.success("Success!")
                    goToList()
                }).catch((error: any) => {
                    toast.error("Fail!")
                    setServiceData({ ...serviceData, displayImage, displayImage_second })
                });
        }
    }

    const goToList = () => {
        history.push('/services')
    }

    return (
        <div className="all-sort-table">
            <Container fluid>
                <Row className="">
                    <h1 className="font-27-bold">Services</h1>
                </Row>
            </Container>
            <table className=" pv-dashtable mt-3 custom-table-border">

                <tr className="font-18-bold pv-title-table">
                    <th> Main Services</th>
                    <td>
                        <select name="main_service" value={serviceData?.main_service} onChange={(e) => handleChange(e)}>
                            <option value="">Select</option>
                            {getTechData && getTechData.Services.length > 0 && getTechData.Services.map((service: any) => {
                                return <option value={service?.label}>{service?.label}</option>
                            })}
                        </select>
                    </td>
                </tr>
                <tr className="font-18-bold pv-title-table">
                    <th> Sub Services</th>
                    <td>
                        <select name="sub_services" value={serviceData?.sub_services} onChange={(e) => handleChange(e)}>
                            <option value="">Select</option>
                            {getCategoryData && getCategoryData.length > 0 && getCategoryData.filter((data: any) => data.parent_category_id == serviceData?.main_service).map((service: any) => {
                                return <option value={service?.id}>{service?.category}</option>
                            })}
                        </select>
                    </td>
                </tr>
                <tr className="font-18-bold pv-title-table">
                    <th> Sub Title</th>
                    <td>
                        <input
                            name="title"
                            type='text'
                            placeholder='Please enter sub title'
                            value={serviceData?.title}
                            onChange={(e) => handleChange(e)}
                        />
                    </td>
                </tr>

                <tr className="font-18-bold pv-title-table">
                    <th> Sub Description</th>
                    <td>
                        {/* <textarea
                            name="description"
                            placeholder='Please enter sub description'
                            value={serviceData?.description}
                            onChange={(e) => handleChange(e)}
                        /> */}
                        {console.log(serviceData?.description)
                        }
                        <MessageCKEditor
                            onChange={handleDescriptionChange}
                            data={description}
                            uniqueid={uniqueIdState}
                            fullToolbar={true}
                        />
                    </td>
                </tr>

                <tr className="font-18-bold pv-title-table ">
                    <th>Image</th>
                    <td>
                        <Button type="" className="dash-bg-pink" onClick={() => attechImage()}> Upload</Button>

                        <div className="rel-pv"><img className="pv-Choose-Us mt-3" src={serviceData?.displayImage == "" ? "./img/1139.png" : serviceData?.displayImage} alt="" />
                            <input className="mt-4 mb-4" hidden id={`attechImage`} type="file" name="choosefile"
                                onChange={(e) => {
                                    if (!e.target.files || e.target.files.length === 0) {
                                        setSelectedMainFile(undefined);
                                        return;
                                    }
                                    setSelectedMainFile(e.target.files[0]);
                                }}
                            />
                        </div>
                        <div className="ml-auto pv-hero-btn">
                        </div>
                    </td>
                </tr>

                <tr className="font-18-bold pv-title-table">
                    <th> Sub Title 1</th>
                    <td>
                        <input
                            name="title_second"
                            type='text'
                            placeholder='Please enter sub title'
                            value={serviceData?.title_second}
                            onChange={(e) => handleChange(e)}
                        />
                    </td>
                </tr>

                <tr className="font-18-bold pv-title-table">
                    <th> Sub Description 1</th>
                    <td>
                        <MessageCKEditor
                            onChange={handleDetailChange}
                            data={detail}
                            uniqueid={uniqueIdState}
                            fullToolbar={true}
                        />
                        {/* <textarea
                            name="description_second"
                            placeholder='Please enter sub description'
                            value={serviceData?.description_second}
                            onChange={(e) => handleChange(e)}
                        /> */}
                    </td>
                </tr>

                <tr className="font-18-bold pv-title-table ">
                    <th>Image 1</th>
                    <td>
                        <Button type="" className="dash-bg-pink" onClick={() => attechImageSecond()}> Upload</Button>

                        <div className="rel-pv"><img className="pv-Choose-Us mt-3" src={serviceData?.displayImage_second == "" ? "./img/1139.png" : serviceData?.displayImage_second} alt="" />
                            <input className="mt-4 mb-4" hidden id={`attechImageSecond`} type="file" name="choosefile"
                                onChange={(e) => {
                                    if (!e.target.files || e.target.files.length === 0) {
                                        setSelectedMainFileSecond(undefined);
                                        return;
                                    }
                                    setSelectedMainFileSecond(e.target.files[0]);
                                }}
                            />
                        </div>
                        <div className="ml-auto pv-hero-btn">
                        </div>
                    </td>
                </tr>

            </table>

            <div className="text-center">
                <Button className=" pv-main-btn-img btn-secondary" onClick={goToList}>
                    Back
                </Button>
                <Button disabled={disable} className=" pv-main-btn-img btn-success" onClick={handleSave}>
                    Save
                </Button>
            </div>
        </div >
    )
}

export default AddService
