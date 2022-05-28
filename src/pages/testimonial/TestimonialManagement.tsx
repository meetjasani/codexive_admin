import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { ApiGet, ApiPost, ApiPut } from '../../helper/API/ApiData';
import { toast } from 'react-toastify';

const TestimonialManagement = () => {

    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    const history = useHistory();
    const [testimonialData, setTestimonialData] = useState({
        id: "",
        name: "",
        testimonial: "",
        position: ""
    })
    const [selectedFile, setSelectedFile] = useState<File>();
    const [profileImages, setProfileImages] = useState({
        displayImage: "",
        image: ""
    });

    const handleChange = (e: any) => {
        setTestimonialData({
            ...testimonialData,
            [e.target.name]: e.target.value
        })
    }

    const getTestimonialById = () => {
        ApiGet(`testimonial/get-testimonial-by-id/${id}`)
            .then((res: any) => {
                setTestimonialData({
                    ...testimonialData,
                    id: res.data.id,
                    name: res.data.name,
                    testimonial: res.data.testimonial,
                    position: res.data.position
                })
                setProfileImages({
                    displayImage: res.data.image[0].displayImage,
                    image: res.data.image[0].image
                })
            })
    }

    const goToList = () => {
        history.push("/testimonial")
    }

    const attechImage = () => {
        document.getElementById("attechImage")?.click();
    };

    const uploadImage = () => {
        let formData = new FormData();
        if (selectedFile) {
            formData.append('image', selectedFile);
            ApiPost("general/file-and-image-upload", formData)
                .then((res: any) => {
                    setProfileImages({
                        displayImage: res.display_url,
                        image: res.url
                    })
                    setSelectedFile(undefined)
                }).catch((error) => {
                    console.log("error", error);

                })
        }
    }

    const saveBlog = () => {
        const body = {
            name: testimonialData.name,
            testimonial: testimonialData.testimonial,
            position: testimonialData.position,
            image: profileImages.image
        }
        if (id === "" || !id) {
            ApiPost(`testimonial/add-testimonial`, body)
                .then((response: any) => {
                    goToList()
                    toast.success("Success!")
                }).catch((error: any) => {
                    toast.error("Fail!")
                });
        } else {
            ApiPut(`testimonial/edit-testimonial/${id}`, body)
                .then((response: any) => {
                    toast.success("Success!")
                    goToList()
                }).catch((error: any) => {
                    toast.error("Fail!")
                });
        }
    }

    useEffect(() => {
        if (selectedFile) {
            uploadImage()
        }
    }, [selectedFile])

    useEffect(() => {
        if (id) {
            getTestimonialById()
        }
    }, [id])


    return (
        <div className="pv-blogdetali">
            <div className="pv-blog-title">
                <p>Testimonial Detalis</p>
            </div>
            <div className="pv-all-img">
                <div className="align-items-center d-flex pv-blog">
                    <div>
                        <h5 className="font-27-bold text-left">Profile Image</h5>
                    </div>
                </div>
                <div className="pv-blog-image">
                    {profileImages?.displayImage ?
                        <img src={profileImages?.displayImage} alt="" className='static-user' />
                        :
                        <img src="./img/user.png" alt="" className='static-user' />
                    }
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


                    <div className="pv-rel-TestimonialManagement">
                        <div className="pv-cricle-TestimonialManagement">
                            <img src="./img/dry-clean.png" alt="" onClick={attechImage} />
                        </div>
                        <div className="pv-camera-TestimonialManagement">
                            <div className="" />
                            <img src="./img/camera.png" alt="" onClick={attechImage} />

                        </div>
                    </div>


                </div>

                <table className=" pv-dashtable mt-3 custom-table-border">
                    <tr className="font-18-bold pv-title-table">
                        <th>Name</th>
                        <td>
                            <input
                                type="text"
                                placeholder="Please enter title"
                                value={testimonialData.name}
                                name="name"
                                onChange={(e) => handleChange(e)}
                            />
                        </td>
                    </tr>
                    <tr className="font-18-bold pv-title-table">
                        <th>Testimonial</th>
                        <td>
                            <textarea
                                className="w-100 border-0"
                                placeholder="Please enter description"
                                rows={5}
                                value={testimonialData.testimonial}
                                name="testimonial"
                                onChange={(e) => handleChange(e)}
                            />
                        </td>
                    </tr>
                    <tr className="font-18-bold pv-title-table">
                        <th>Position</th>
                        <td>
                            <input
                                type="text"
                                placeholder="Please enter title"
                                value={testimonialData.position}
                                name="position"
                                onChange={(e) => handleChange(e)}
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

export default TestimonialManagement
