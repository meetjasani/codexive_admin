import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ApiGet, ApiPost, ApiPut } from "../../helper/API/ApiData";
import { toast } from 'react-toastify';
import { Container, Row, Button } from 'react-bootstrap';
import MessageCKEditor from '../../component/MessageCKEditor';

const AddClient = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    const history = useHistory();
    const [clientData, setclientData] = useState({
        id: "",
        clientInfo: "",
    })
    const [selectedFile, setSelectedFile] = useState<File>();
    const [profileImages, setProfileImages] = useState({
        displayImage: "",
        image: ""
    });

    const handleChange = (newData: any) => {
        setclientData({ ...clientData, clientInfo: newData })
    };
    const uniqueIdState = "";

    const getTestimonialById = () => {
        ApiGet(`client/getClientById/${id}`)
            .then((res: any) => {
                setclientData({
                    ...clientData,
                    id: res.data.id,
                    clientInfo: res.data.clientInfo,
                })
                setProfileImages({
                    displayImage: res.data.image.displayImage,
                    image: res.data.image.image
                })
            })
    }

    const goToList = () => {
        history.push("/client")
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
            clientInfo: clientData.clientInfo,
            image: profileImages.image
        }
        if (id === "" || !id) {
            ApiPost(`client/add-client`, body)
                .then((response: any) => {
                    goToList()
                    toast.success("Success!")
                }).catch((error: any) => {
                    toast.error("Fail!")
                });
        } else {
            ApiPut(`client/edit-client/${id}`, body)
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
                <p>Client Detalis</p>
            </div>
            <div className="pv-all-img">
                <div className="align-items-center d-flex pv-blog">
                    <div>
                        <h5 className="font-27-bold text-left">Profile Image</h5>
                    </div>
                </div>

                <table className=" pv-dashtable mt-3 custom-table-border">

                    <tr className="font-18-bold pv-title-table ">
                        <th>Image</th>
                        <td>

                            <div className="rel-pv"><img className="pv-Choose-Us mt-3" src={profileImages?.displayImage == "" ? "./img/1139.png" : profileImages?.displayImage} alt="" />
                                <input className="mt-4 mb-4" hidden id={`attechImage`} type="file" name="choosefile"
                                    onChange={(e) => {
                                        if (!e.target.files || e.target.files.length === 0) {
                                            setSelectedFile(undefined);
                                            return;
                                        }
                                        setSelectedFile(e.target.files[0]);
                                    }}
                                />
                            </div>
                            upload image=70*70
                            <div className="ml-auto pv-hero-btn">
                                <Button type="" className="dash-bg-pink" onClick={() => attechImage()}> Upload</Button>
                            </div>
                        </td>
                    </tr>

                    <tr className="font-18-bold pv-title-table">
                        <th>cleint Info</th>

                        <td>
                            <MessageCKEditor
                                onChange={handleChange}
                                data={clientData.clientInfo}
                                uniqueid={uniqueIdState}
                                fullToolbar={true}
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

export default AddClient
