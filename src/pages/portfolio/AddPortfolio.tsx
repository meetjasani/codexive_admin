import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Select } from 'antd';
import 'antd/dist/antd.css';
import { Option } from 'antd/lib/mentions';
import { useHistory } from 'react-router';
import { ApiGet, ApiPost, ApiPut } from '../../helper/API/ApiData';
import { TechnologieEnum } from '../../helper/constant';
import { toast } from 'react-toastify';

const AddPortfolio = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    const history = useHistory();
    const [portfolioData, setPortfolioData] = useState({
        name: "",
        introduction: "",
    })
    const [mainImage, setMainImage] = useState({
        displayImage: "",
        image: ""
    })
    const [selectedFile, setSelectedFile] = useState<File>();
    const [technologyArr, setTechnologyArr] = useState<any[]>([]);
    const [technologyValue, setTechnologyValue] = useState<any[]>([]);
    const [selectedMainFile, setSelectedMainFile] = useState<File>();
    const [imagesArr, setImagesArr] = useState<any>([]);
    const [featuresArr, setFeaturesArr] = useState([""])

    const handleChange = (e: any) => {
        setPortfolioData({
            ...portfolioData,
            [e.target.name]: e.target.value
        })
    }

    const getTechnologyCategory = () => {
        ApiGet(`category/categoryDropDownByParent/${TechnologieEnum}`)
            .then((res: any) => {
                setTechnologyArr(res.data ? res.data : [])
            })
    }

    const handleChangeSelect = (e: any) => {
        setTechnologyValue(e)
    }

    const getPortfolioById = () => {
        ApiGet(`portfolio/get-company-portfolio-by-id/${id}`)
            .then((res: any) => {
                setPortfolioData({
                    ...portfolioData,
                    name: res.data.name,
                    introduction: res.data.introduction,
                })
                setFeaturesArr(res.data.key_features.split(','))
                setTechnologyValue(res.data.technical_overview.split(','))
                setMainImage(res.data.main_image)
                setImagesArr(res.data.image)
            })
    }

    const savePortfolio = () => {
        let images = imagesArr.map((da: any) => da.image).join(',')
        const portfolioImage = {
            key_features: featuresArr,
            main_image: mainImage?.image,
            image: images,
            technical_overview: technologyValue.map((da) => da).join(',')
        }
        const body = { ...portfolioData, ...portfolioImage }
        if (id === "" || !id) {
            ApiPost(`portfolio/add-company-portfolio`, body)
                .then((response: any) => {
                    goToList()
                    toast.success("Success!")
                }).catch((error: any) => {
                    toast.error("Fail!")
                });
        } else {
            ApiPut(`portfolio/edit-company-portfolio/${id}`, body)
                .then((response: any) => {
                    toast.success("Success!")
                    goToList()
                }).catch((error: any) => {
                    toast.error("Fail!")
                });
        }
    }

    const goToList = () => {
        history.push("/portfolio")
    }

    const handleKeyFeature = (e: any, index: number) => {
        let tempData = [...featuresArr]
        tempData[index] = e.target.value
        setFeaturesArr(tempData)
    }

    const uploadImage = () => {
        let formData = new FormData();
        if (selectedFile) {
            formData.append('image', selectedFile);
            ApiPost("general/file-and-image-upload", formData)
                .then((res: any) => {
                    setImagesArr([
                        ...imagesArr,
                        {
                            displayImage: res.display_url,
                            image: res.url
                        }
                    ])
                    setSelectedFile(undefined)
                }).catch((error) => {
                    console.log("error", error);
                })
        }

        if (selectedMainFile) {
            formData.append('image', selectedMainFile);
            ApiPost("general/file-and-image-upload", formData)
                .then((res: any) => {
                    setMainImage({
                        displayImage: res.display_url,
                        image: res.url
                    })
                    setSelectedMainFile(undefined)
                }).catch((error) => {
                    console.log("error", error);
                })
        }
    }

    const attechImage = (type: string) => {
        if (type == "mainImage") {
            document.getElementById("attechMainImage")?.click();
        } else {
            document.getElementById("attechImage")?.click();
        }
    };

    useEffect(() => {
        if (selectedFile) {
            uploadImage()
        }
    }, [selectedFile])

    useEffect(() => {
        if (selectedMainFile) {
            uploadImage()
        }
    }, [selectedMainFile])

    const handleFetureAdd = () => {
        setFeaturesArr([
            ...featuresArr,
            ""
        ])
    }

    const handleFetureDelete = (index: number) => {
        let data = [...featuresArr]
        if (index > -1) {
            let v1 = data.splice(index, 1)
            setFeaturesArr(data)
        }
    }

    const removeImg = (index: number) => {
        let data = [...imagesArr]
        if (index > -1) {
            let v1 = data.splice(index, 1)
            setImagesArr(data)
        }
    }

    useEffect(() => {
        getTechnologyCategory()
        if (id) {
            getPortfolioById()
        }
    }, [id])


    return (
        <div className="pv-blogdetali">
            <div className="pv-blog-title">
                <p>Portfolio Detalis</p>
            </div>
            <div className="pv-all-img">
                <div className="align-items-center d-flex pv-blog">
                    <div>
                        <h5 className="font-27-bold text-left">Main Images</h5>
                    </div>
                    <div className="ml-auto">
                        <Button type="" className="dash-bg-pink" onClick={() => attechImage("mainImage")}> Upload</Button>
                    </div>
                </div>
                <div className="pv-blog-image">
                    {mainImage?.displayImage != "" && <div className="pv-box">
                        <div className="pv-rel">
                            <div className="blog-img">
                                <img src={mainImage?.displayImage} alt="" />
                            </div>
                        </div>
                    </div>
                    }
                    <div className="ml-auto">
                        <input
                            id="attechMainImage"
                            type="file"
                            hidden
                            onChange={(e: any) => {
                                if (!e.target.files || e.target.files.length === 0) {
                                    setSelectedMainFile(undefined);
                                    return;
                                }
                                setSelectedMainFile(e.target.files[0]);
                            }}
                            alt="img"
                            accept="*"
                            className="login-input"
                        />
                    </div>
                </div>
            </div>
            <div className="pv-all-img">
                <div className="align-items-center d-flex pv-blog">
                    <div>
                        <h5 className="font-27-bold text-left">Images</h5>
                    </div>
                    <div className="ml-auto">
                        <Button type="" className="dash-bg-pink" onClick={() => attechImage("images")}> Upload</Button>
                    </div>
                </div>
                <div className="pv-blog-image">
                    <div className="pv-box">
                        {imagesArr && imagesArr.map((item: any, index: number) =>
                            <div className="pv-rel">
                                <div className="blog-img">
                                    <img src={item?.displayImage} alt="" />
                                    <div className="close-btn">
                                        <img src="./img/close (1).png" alt="" onClick={() => removeImg(index)} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="ml-auto">
                        <input
                            id="attechImage"
                            type="file"
                            hidden
                            onChange={(e: any) => {
                                if (!e.target.files || e.target.files.length === 0) {
                                    setSelectedFile(undefined);
                                    return;
                                }
                                setSelectedFile(e.target.files[0]);
                            }}
                            alt="img"
                            accept="*"
                            className="login-input"
                        />
                    </div>
                </div>

                <table className=" pv-dashtable mt-3 custom-table-border">
                    <tr className="font-18-bold pv-title-table">
                        <th>Portfolio Name</th>
                        <td>
                            <input
                                type="text"
                                placeholder="Please enter portfolio name"
                                value={portfolioData.name}
                                name="name"
                                onChange={(e) => handleChange(e)}
                            />
                        </td>
                    </tr>
                    <tr className="font-18-bold pv-title-table">
                        <th>Portfolio Description</th>
                        <td>
                            <textarea
                                className="w-100 border-0"
                                placeholder="Please enter Portfolio description"
                                rows={5}
                                value={portfolioData.introduction}
                                name="introduction"
                                onChange={(e) => handleChange(e)}
                            />
                        </td>
                    </tr>
                    {featuresArr.map((feature: string, index: number) => (
                        <tr className="font-18-bold pv-title-table">
                            <th>Portfolio Features</th>
                            <td >
                                <div className="pv-addportfolio-1">
                                    <input
                                        className="pv-addportfolio"
                                        type="text"
                                        placeholder="Please enter portfolio features"
                                        value={feature}
                                        name="key_features"
                                        onChange={(e) => handleKeyFeature(e, index)}
                                    />
                                    {index != 0 && <Button className="btn-danger" onClick={() => handleFetureDelete(index)} >-</Button>}
                                    {(index == featuresArr.length - 1) && <Button className="pv-btn" onClick={handleFetureAdd} >+</Button>}
                                </div>
                            </td>
                        </tr>
                    ))}
                    <tr className="font-18-bold pv-title-table">
                        <th>Portfolio Technical Overview</th>
                        <td>
                            <Select
                                className="pv-select-addportfolio"
                                mode="multiple"
                                allowClear
                                style={{ width: '100%' }}
                                placeholder="Please select"
                                value={technologyValue}
                                onChange={(e) => handleChangeSelect(e)}
                            >
                                {technologyArr && technologyArr.map((data: any) => (
                                    <Option key={data?.id} value={data?.id} >{data?.category}</Option>
                                ))}
                            </Select>
                        </td>
                    </tr>

                    <tr className="font-18-bold pv-title-table">
                        <th>Created by </th>
                        <td>
                            <input
                                type="text"
                                placeholder="created by "
                                value={moment(new Date()).format('YYYY.MM.DD HH:mm').toString()}
                                disabled
                            />
                        </td>
                    </tr>

                </table>
                <div className="text-center ">
                    <Button type="" className=" pv-main-btn-img btn-secondary" onClick={goToList}> Back</Button>
                    <Button type="" className=" pv-main-btn-img btn-success" onClick={savePortfolio}> Save</Button>
                </div>
            </div>

        </div>
    )
}

export default AddPortfolio