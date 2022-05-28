import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import { toast } from 'react-toastify';
interface whyprops {
    image: string;
    title: string;
    details: string;
    displayImage: string,
}

function HowWeWork() {
    const [whySection, setWhySection] = useState<whyprops[]>([
        {
            image: "",
            title: "",
            details: "",
            displayImage: "",
        }
    ]);
    const [fileIndex, setFileIndex] = useState(0)
    const [selectedMainFile, setSelectedMainFile] = useState<File>();


    const handleChange = (index: number, event: any, inputName: string) => {
        const values = [...whySection];
        if (inputName === "title") {
            values[index].title = event.target.value;
        }
        if (inputName === "details") {
            values[index].details = event.target.value;
        }
        setWhySection(values);
    }

    useEffect(() => {
        console.log(whySection)
    }, [whySection])

    const handleadddsection = () => {
        const values = [...whySection];
        values.push({
            image: "",
            title: "",
            details: "",
            displayImage: "",
        })
        setWhySection(values);
    }

    const handleRemovesection = (id: any, index: any) => {
        if (whySection.length > 1) {
            const values = [...whySection];
            values.splice(index, 1);
            setWhySection(values);
        }
    }

    const uploadImage = (index: number) => {
        let formData = new FormData();
        if (selectedMainFile) {
            formData.append('image', selectedMainFile);
            ApiPost("general/file-and-image-upload", formData)
                .then((res: any) => {
                    const values = [...whySection];
                    values[index].displayImage = res?.display_url;
                    values[index].image = res?.url;
                    setWhySection(values);
                    setSelectedMainFile(undefined)
                }).catch((error) => {
                    console.log("error", error);
                })
        }
    }

    const attechImage = (index: number) => {
        document.getElementById(`attechMainImage${index}`)?.click();
    };

    useEffect(() => {
        if (selectedMainFile) {
            uploadImage(fileIndex)
        }
    }, [selectedMainFile, fileIndex])

    const handleSave = () => {
        let displayImage: any = [];
        const tempData = whySection.map((why: any) => {
            displayImage.push(why.displayImage)
            delete why.displayImage;
            return why
        })
        ApiPost(`home/add-howWork-section`, { workSection: tempData })
            .then((response: any) => {
                toast.success("Success!")
                let temp = [...whySection];
                temp = temp.map((x: any, index: number) => {
                    return {
                        ...x,
                        displayImage: displayImage[index]
                    }
                })
                setWhySection(temp)
            }).catch((error: any) => {
                toast.error("Fail!")
                let temp = [...whySection];
                temp = temp.map((x: any, index: number) => {
                    return {
                        ...x,
                        displayImage: displayImage[index]
                    }
                })
                setWhySection(temp)
            });
    }

    const getDataById = () => {
        ApiGet(`home/get-howWork-section`)
            .then((res: any) => {
                if (res.data.length == 0) {
                    setWhySection([{
                        image: "",
                        title: "",
                        details: "",
                        displayImage: "",
                    }])
                } else {
                    setWhySection(res.data?.map((item: any) => {
                        return {
                            title: item.title,
                            details: item.details,
                            image: item?.image?.image,
                            displayImage: item?.image?.displayImage,
                        }
                    }))
                }
            })
    }

    useEffect(() => {
        getDataById()
    }, [])

    return (
        <div className="pv-blogdetali">
            <div className="pv-blog-title">
                <p>How We Work</p>
            </div>

            {whySection.map((input: any, index: number) => (
                <>
                    <table className=" pv-dashtable mt-3 custom-table-border">
                        <tr className="font-18-bold pv-title-table ">
                            <th>Image</th>
                            <td>

                                <div className="rel-pv"><img className="pv-work-image mt-3" src={input?.displayImage == "" ? "./img/1139.png" : input?.displayImage} alt="" />
                                    <div>
                                        <input className="mt-4 mb-2 " type="file" hidden id={`attechMainImage${index}`} name="choosefile" value={input.howweworkfile} onChange={(e) => {
                                            if (!e.target.files || e.target.files.length === 0) {
                                                setSelectedMainFile(undefined);
                                                return;
                                            }
                                            setFileIndex(index)
                                            setSelectedMainFile(e.target.files[0]);
                                        }} />
                                    </div>
                                </div>
                                upload image=50*39
                                <div className="ml-auto pv-hero-btn">
                                    <Button type="" className="dash-bg-pink" onClick={() => attechImage(index)}> Upload</Button>
                                </div>
                            </td>
                        </tr>

                        <tr className="font-18-bold pv-title-table">
                            <th>Title</th>
                            <td> <input type="text" placeholder="Please enter title" name="title" value={input.title} onChange={(event) => { handleChange(index, event, "title"); }} /></td>
                        </tr>

                        <tr className="font-18-bold pv-title-table">
                            <th>Description</th>
                            <td><textarea className="w-100 border-0" placeholder="Please enter description" value={input.details} rows={5} name="details" onChange={(event) => handleChange(index, event, "details")} /></td>
                        </tr>
                    </table>


                    <div className="w-100 justify-content-end d-flex">
                        {whySection.length > 0 && (
                            <>
                                {/* <Button type="" className=" pv-main-btn-img btn-success" onClick={() => { }}> Edit</Button> */}
                                <Button type="" className=" pv-main-btn-img btn-danger" onClick={() => {
                                    handleRemovesection(input.id, index);
                                }}>delete</Button>
                            </>
                        )}
                        {whySection.length - 1 === index && (
                            <Button type="" className=" pv-main-btn-img btn-secondary" onClick={handleadddsection}>+ Add Section</Button>
                        )}

                    </div>
                </>
            ))}
            <div className="text-center ">
                <Button type="" className=" pv-main-btn-img btn-secondary" onClick={handleSave}>Save</Button>
                {/* <Button type="" className=" pv-main-btn-img btn-success" onClick={() => { }}> Edit</Button> */}
                {/* <Button type="" className="pv-main-btn-img  btn-info" onClick={() => { }}> Hide</Button> */}
                {/* <Button type="" className=" pv-main-btn-img  btn-danger" onClick={() => { }}> delete</Button> */}
            </div>

        </div>
    )
}

export default HowWeWork
