import { Select } from 'antd';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { ApiGet, ApiPost, ApiPut } from '../../helper/API/ApiData';
import 'antd/dist/antd.css';
import { Option } from 'antd/lib/mentions';
import { toast } from 'react-toastify';
import { TechnologieEnum } from '../../helper/constant';


const BlogRegistration = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    const history = useHistory();
    const [blogData, setBlogData] = useState({
        id: "",
        title: "",
        details: "",
    })
    const [selectedFile, setSelectedFile] = useState<File>();
    const [imagesArr, setImagesArr] = useState<any[]>([]);
    const [technologyArr, setTechnologyArr] = useState<any[]>([]);
    const [technologyValue, setTechnologyValue] = useState<any[]>([]);

    const handleChange = (e: any) => {
        setBlogData({
            ...blogData,
            [e.target.name]: e.target.value
        })
    }

    const getBlogById = () => {
        ApiGet(`blog/get-blog-by-id/${id}`)
            .then((res: any) => {
                setBlogData({
                    ...blogData,
                    id: res.data.id,
                    title: res.data.title,
                    details: res.data.details
                })
                setTechnologyValue(res.data.technologies.split(','))
                setImagesArr(res.data.image)
            })
    }

    const getTechnologyCategory = () => {
        ApiGet(`category/categoryDropDownByParent/${TechnologieEnum}`)
            .then((res: any) => {
                setTechnologyArr(res.data ? res.data : [])
            })
    }

    const saveBlog = () => {
        let images = imagesArr.map((da) => da.image).join(',')
        const body = {
            title: blogData.title,
            details: blogData.details,
            technologies: technologyValue.map((da) => da).join(','),
            image: images
        }
        if (id === "" || !id) {
            ApiPost(`blog/add-blog`, body)
                .then((response: any) => {
                    goToList()
                    toast.success("Success!")
                }).catch((error: any) => {
                    toast.error("Fail!")
                });
        } else {
            ApiPut(`blog/edit-blog/${id}`, body)
                .then((response: any) => {
                    toast.success("Success!")
                    goToList()
                }).catch((error: any) => {
                    toast.error("Fail!")
                });

        }
    }

    const goToList = () => {
        history.push("/blog")
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
    }

    const attechImage = () => {
        document.getElementById("attechImage")?.click();
    };

    useEffect(() => {
        if (selectedFile) {
            uploadImage()
        }
    }, [selectedFile])

    const removeImg = (index: number) => {
        let data = [...imagesArr]
        if (index > -1) {
            let v1 = data.splice(index, 1)
            setImagesArr(data)
        }
    }

    const handleChangeSelect = (e: any) => {
        setTechnologyValue(e)
    }

    useEffect(() => {
        getTechnologyCategory()
        if (id) {
            getBlogById()
        }
    }, [id])

    return (
        <div className="pv-blogdetali">
            <div className="pv-blog-title">
                <p>Blog Detalis</p>
            </div>
            <div className="pv-all-img">
                <div className="align-items-center d-flex pv-blog">
                    <div>
                        <h5 className="font-27-bold text-left">Images</h5>
                    </div>
                    <div className="ml-auto">
                        <Button type="" className="dash-bg-pink" onClick={attechImage}> Upload</Button>
                    </div>
                </div>
                <div className="pv-blog-image">
                    <div className="pv-box">
                        {imagesArr.map((item: any, index: number) =>
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
                        <th>Title</th>
                        <td>
                            <input
                                type="text"
                                placeholder="Please enter title"
                                value={blogData.title}
                                name="title"
                                onChange={(e) => handleChange(e)}
                            />
                        </td>
                    </tr>
                    <tr className="font-18-bold pv-title-table">
                        <th>Description</th>
                        <td>
                            <textarea
                                className="w-100 border-0"
                                placeholder="Please enter description"
                                rows={5}
                                value={blogData.details}
                                name="details"
                                onChange={(e) => handleChange(e)}
                            />
                        </td>
                    </tr>
                    <tr className="font-18-bold pv-title-table">
                        <th>Technologies</th>
                        <td>
                            <Select
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
                                value="Codexive"
                                disabled
                            />
                        </td>
                    </tr>

                </table>
                <div className="text-center ">
                    <Button type="" className=" pv-main-btn-img btn-secondary" onClick={goToList}> Back</Button>
                    <Button type="" className=" pv-main-btn-img btn-success" onClick={saveBlog}> Save</Button>
                </div>
            </div>

        </div>
    )
}

export default BlogRegistration