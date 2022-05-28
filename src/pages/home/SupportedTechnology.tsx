import React, { useEffect, useState } from 'react'
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';

interface technologyprops {
    image: string;
    title: string;
    displayImage: string,
}

const SupportedTechnology = () => {
    const [technologySection, setTechnologySection] = useState<technologyprops[]>([
        {
            image: "",
            title: "",
            displayImage: "",
        }
    ]);
    const [fileIndex, setFileIndex] = useState(0)
    const [selectedMainFile, setSelectedMainFile] = useState<File>();

    const handleChange = (index: number, event: any, inputName: string) => {
        const values = [...technologySection];
        if (inputName === "title") {
            values[index].title = event.target.value;
        }
        setTechnologySection(values);
    }

    const handleadddsection = () => {
        const values = [...technologySection];
        values.push({
            image: "",
            title: "",
            displayImage: "",
        })
        setTechnologySection(values);
    }

    const handleRemovesection = (id: any, index: any) => {
        if (technologySection.length > 1) {
            const values = [...technologySection];
            values.splice(index, 1);
            setTechnologySection(values);
        }
    }

    const uploadImage = (index: number) => {
        let formData = new FormData();
        if (selectedMainFile) {
            formData.append('image', selectedMainFile);
            ApiPost("general/file-and-image-upload", formData)
                .then((res: any) => {
                    const values = [...technologySection];
                    values[index].displayImage = res?.display_url;
                    values[index].image = res?.url;
                    setTechnologySection(values);
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
        const tempData = technologySection.map((tech: any) => {
            displayImage.push(tech.displayImage)
            delete tech.displayImage;
            return tech
        })
        ApiPost(`technology/add-supported-technology`, { technology: tempData })
            .then((response: any) => {
                toast.success("Success!")
                let temp = [...technologySection];
                temp = temp.map((x: any, index: number) => {
                    return {
                        ...x,
                        displayImage: displayImage[index]
                    }
                })
                setTechnologySection(temp)
            }).catch((error: any) => {
                toast.error("Fail!")
                let temp = [...technologySection];
                temp = temp.map((x: any, index: number) => {
                    return {
                        ...x,
                        displayImage: displayImage[index]
                    }
                })
                setTechnologySection(temp)
            });
    }

    const getDataById = () => {
        ApiGet(`technology/get-supported-technology`)
            .then((res: any) => {
                if (res.data.length == 0) {
                    setTechnologySection([{
                        image: "",
                        title: "",
                        displayImage: "",
                    }])
                } else {
                    setTechnologySection(res.data?.map((item: any) => {
                        return {
                            title: item.title,
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

            {technologySection.map((input: any, index: number) => (
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

                    </table>


                    <div className="w-100 justify-content-end d-flex">
                        {technologySection.length > 0 && (
                            <>
                                <Button type="" className=" pv-main-btn-img btn-danger" onClick={() => {
                                    handleRemovesection(input.id, index);
                                }}>delete</Button>
                            </>
                        )}
                        {technologySection.length - 1 === index && (
                            <Button type="" className=" pv-main-btn-img btn-secondary" onClick={handleadddsection}>+ Add Section</Button>
                        )}

                    </div>
                </>
            ))}
            <div className="text-center ">
                <Button type="" className=" pv-main-btn-img btn-secondary" onClick={handleSave}>Save</Button>
            </div>

        </div>
    )
}

export default SupportedTechnology
