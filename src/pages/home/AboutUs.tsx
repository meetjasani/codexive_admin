import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import { whyprops } from './WhyChooseUs';
function AboutUs() {
    const [whySection, setWhySection] = useState<whyprops>({
        image: "",
        title: "",
        description: "",
        displayImage: "",
    });
    const [fileIndex, setFileIndex] = useState(0)
    const [selectedMainFile, setSelectedMainFile] = useState<File>();

    const handleChange = (event: any) => {
        setWhySection({ ...whySection, [event.target.name]: event.target.value });
    }

    const getDataById = () => {
        ApiGet(`home/get-about-section`)
            .then((res: any) => {
                if (Object.keys(res.data).length === 0) {
                    setWhySection({
                        image: "",
                        title: "",
                        description: "",
                        displayImage: "",
                    })
                } else {
                    setWhySection({
                        title: res.data.title,
                        description: res.data.description,
                        image: res.data?.image?.image,
                        displayImage: res.data?.image?.displayImage,
                    })
                }
            })
    }
    useEffect(() => {
        getDataById()
    }, [])

    const handleSave = () => {
        const tempData = whySection
        let displayImage = tempData.displayImage
        delete tempData.displayImage;
        ApiPost(`home/add-about-section`, tempData)
            .then((response: any) => {
                toast.success("Success!")
            }).catch((error: any) => {
                toast.error("Fail!")
                setWhySection({ ...whySection, displayImage })
            });
    }
    const attechImage = () => {
        document.getElementById(`attechMainImage`)?.click();
    };
    const uploadImage = (index: number) => {
        console.log(index)
        let formData = new FormData();
        if (selectedMainFile) {
            formData.append('image', selectedMainFile);
            ApiPost("general/file-and-image-upload", formData)
                .then((res: any) => {
                    setWhySection({ ...whySection, displayImage: res?.display_url, image: res?.url });
                    setSelectedMainFile(undefined)
                }).catch((error) => {
                    console.log("error", error);
                })
        }
    }
    useEffect(() => {
        if (selectedMainFile) {
            uploadImage(fileIndex)
        }
    }, [selectedMainFile, fileIndex])
    return (
        <div className="pv-blogdetali">
            <div className="pv-blog-title">
                <p>About Us</p>
            </div>
            <table className=" pv-dashtable mt-3 custom-table-border">
                <tr className="font-18-bold pv-title-table ">
                    <th>Image</th>
                    <td>
                        <div className="rel-pv"><img className="pv-About-Us mt-3" src={whySection?.displayImage == "" ? "./img/1139.png" : whySection?.displayImage} alt="" />
                            <input className="mt-4 mb-4" hidden id={`attechMainImage`} type="file" name="choosefile"
                                onChange={(e) => {
                                    if (!e.target.files || e.target.files.length === 0) {
                                        setSelectedMainFile(undefined);
                                        return;
                                    }
                                    setSelectedMainFile(e.target.files[0]);
                                }}
                            />
                        </div>
                        upload image=711*615
                        <div className="ml-auto pv-hero-btn">
                            <Button type="" className="dash-bg-pink" onClick={() => attechImage()}> Upload</Button>
                        </div>
                    </td>
                </tr>
                <tr className="font-18-bold pv-title-table">
                    <th>Title</th>
                    <td> <input type="text" placeholder="Please enter title" name="title" value={whySection.title} onChange={(event) => { handleChange(event); }} /></td>
                </tr>
                <tr className="font-18-bold pv-title-table">
                    <th>Description</th>
                    <td><textarea className="w-100 border-0" placeholder="Please enter description" value={whySection.description} rows={5} name="description" onChange={(event) => { handleChange(event); }} /></td>
                </tr>
            </table>
            <div className="text-center ">
                <Button type="" className=" pv-main-btn-img btn-secondary" onClick={handleSave}>Save</Button>
                {/* <Button type="" className=" pv-main-btn-img btn-success" onClick={() => { }}> Edit</Button> */}
                {/* <Button type="" className="pv-main-btn-img  btn-info" onClick={() => { }}> Hide</Button> */}
                {/* <Button type="" className=" pv-main-btn-img  btn-danger" onClick={() => { }}> Detal</Button> */}
            </div>
        </div>
    )
}



tbody >

{
    item.projectImgs.map((data: any, index: any) =>
        <tr>
            <img src={data[index]} alt='' />

        </tr>

    )
}

                                                </tbody >
export default AboutUs