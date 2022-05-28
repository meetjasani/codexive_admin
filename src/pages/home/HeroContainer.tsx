import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import MessageCKEditor from '../../component/MessageCKEditor';
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import { toast } from 'react-toastify';
function HeroContainer() {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    const uniqueIdState = "";
    const [title, settitle] = useState("");
    const [openTextEditor, setOpenTextEditor] = useState(false);
    const [mainImage, setMainImage] = useState({
        displayImage: "",
        image: ""
    })
    const [detail, setDetail] = useState("")
    const [selectedMainFile, setSelectedMainFile] = useState<File>();
    const [editId, setEditId] = useState("");
    const handleChange = (newData: any) => {
        setDetail(newData)
    };
    const getDataById = () => {
        ApiGet(`home/get-hero-section`)
            .then((res: any) => {
                setDetail(res.data?.details)
                settitle(res.data?.title)
                setMainImage(res.data.image)
            })
    }
    useEffect(() => {
        getDataById()
    }, [])
    const uploadImage = () => {
        let formData = new FormData();
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
    const handleSave = () => {
        const portfolioImage = {
            title,
            details: detail,
            image: mainImage?.image,
        }
        ApiPost(`home/add-hero-section`, portfolioImage)
            .then((response: any) => {
                toast.success("Success!")
            }).catch((error: any) => {
                toast.error("Fail!")
            });
    }
    useEffect(() => {
        if (selectedMainFile) {
            uploadImage()
        }
    }, [selectedMainFile])
    const attechImage = () => {
        document.getElementById("attechMainImage")?.click();
    };
    const handleEditMessage = (messageId: string, messageContent: string, title: string) => {
        window.scrollTo(0, 0);
        setOpenTextEditor(true);
        setEditId(messageId);
        setDetail(messageContent)
    };
    return (
        <div className="pv-blogdetali">
            <div className="pv-blog-title">
                <p>Hero Container</p>
            </div>
            <table className=" pv-dashtable mt-3 custom-table-border">
                <tr className="font-18-bold pv-title-table ">
                    <th>Image</th>
                    <td>

                        <div className="rel-pv"><img className="pv-hero-image mt-3" src={mainImage?.displayImage == "" ? "./img/1139.png" : mainImage?.displayImage} alt="" />
                            <input id="attechMainImage"
                                hidden className="mt-4 mb-2" type="file" onChange={(e) => {
                                    if (!e.target.files || e.target.files.length === 0) {
                                        setSelectedMainFile(undefined);
                                        return;
                                    }
                                    setSelectedMainFile(e.target.files[0]);
                                }} />
                        </div>
                        upload image=670*355
                        <div className="ml-auto pv-hero-btn">
                            <Button type="" className="dash-bg-pink " onClick={attechImage}> Upload</Button>
                        </div>

                    </td>
                </tr>
                <tr className="font-18-bold pv-title-table">
                    <th>Title</th>
                    <td> <input type="text" value={title} onChange={(e) => settitle(e.target.value)} placeholder="Please enter title" /></td>
                </tr>
                <tr className="font-18-bold pv-title-table">
                    <th>Description</th>
                    <td>
                        <MessageCKEditor
                            onChange={handleChange}
                            onEdit={handleEditMessage}
                            data={detail}
                            uniqueid={uniqueIdState}
                            fullToolbar={true}
                        />
                    </td>
                </tr>
            </table>
            <div className="text-center ">
                <Button type="" className=" pv-main-btn-img btn-secondary" onClick={handleSave}>Save</Button>
                {/* <Button type="" className=" pv-main-btn-img btn-success" onClick={() => { }}> Edit</Button> */}
                {/* <Button type="" className="pv-main-btn-img  btn-info" onClick={() => { }}> Hide</Button> */}
                {/* <Button type="" className=" pv-main-btn-img  btn-danger" onClick={() => { }}> delete</Button> */}
            </div>
        </div>
    )
}
export default HeroContainer