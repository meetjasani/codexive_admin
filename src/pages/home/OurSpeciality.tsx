import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import { BlockPicker } from 'react-color'
import { toast } from 'react-toastify';
interface whyprops {
    details: string;
    main_title: string;
    left_menu: {
        image: string;
        title: string;
        displayImage: string;
        color: string;
        gradientColor: string;
    }[];
    right_menu: {
        statistics: string;
        percentage: number;
        color: string;
    }[]
}

function OurSpeciality() {


    const [whySection, setWhySection] = useState<whyprops>(
        {
            details: "",
            main_title: "",
            left_menu: [{
                image: "",
                displayImage: "",
                title: "",
                color: "",
                gradientColor: ""
            }],
            right_menu: [{
                statistics: "",
                percentage: 0,
                color: ""
            }]
        }
    );

    const [fileIndex, setFileIndex] = useState(0)
    const [selectedMainFile, setSelectedMainFile] = useState<File>();

    const handleChange = (event: any, inputName: string) => {
        if (inputName === "details") {
            setWhySection({ ...whySection, details: event.target.value });
        }
        if (inputName === "main_title") {
            setWhySection({ ...whySection, main_title: event.target.value });
        }
    }

    const handleLeftChange = (index: number, event: any, inputName: string) => {
        const tempData = [...whySection.left_menu]
        if (inputName === "title") {
            tempData[index].title = event.target.value;
        } if (inputName === "color") {
            tempData[index].color = event;
        } if (inputName === "gradientColor") {
            tempData[index].gradientColor = event;
        }
        setWhySection({ ...whySection, left_menu: tempData });
    }

    const handleRightChange = (index: number, event: any, inputName: string) => {
        const tempData = [...whySection.right_menu]
        if (inputName === "statistics") {
            tempData[index].statistics = event.target.value;
        }
        if (inputName === "percentage") {
            tempData[index].percentage = event.target.value;
        }
        if (inputName === "color") {
            tempData[index].color = event;
        }
        setWhySection({ ...whySection, right_menu: tempData });
    }

    const handleadddsection = (index: number) => {
        const tempData = [...whySection.left_menu]
        tempData.push(
            {
                image: "",
                displayImage: "",
                title: "",
                color: "",
                gradientColor: ""
            }
        )
        setWhySection({ ...whySection, left_menu: tempData });
    }

    const handleaddStatistics = (index: number) => {
        const tempData = [...whySection.right_menu]
        tempData.push(
            {
                statistics: "",
                percentage: 0,
                color: "",
            }
        )
        setWhySection({ ...whySection, right_menu: tempData });
    }

    const handleRemovesection = (index: number) => {
        const tempData = [...whySection.left_menu]
        if (tempData.length > 1) {
            tempData.splice(index, 1);
            setWhySection({ ...whySection, left_menu: tempData });
        }
    }

    const handleRemoveStatistics = (index: number) => {
        const tempData = [...whySection.right_menu]
        if (tempData.length > 1) {
            tempData.splice(index, 1);
            setWhySection({ ...whySection, right_menu: tempData });
        }
    }

    const handleSave = () => {
        let displayImage: any = [];
        const tempData = [...whySection.left_menu]
        const temp = tempData.map((why: any) => {
            displayImage.push(why.displayImage)
            delete why.displayImage;
            return why
        })
        let body = { ...whySection, left_menu: temp }
        ApiPost(`home/add-speciality-section`, body)
            .then((response: any) => {
                toast.success("Success!")
                let temp = [...whySection.left_menu];
                temp = temp.map((x: any, index: number) => {
                    return {
                        ...x,
                        displayImage: displayImage[index]
                    }
                })
                setWhySection({ ...whySection, left_menu: temp })
            }).catch((error: any) => {
                toast.error("Fail!")
                let temp = [...whySection.left_menu];
                temp = temp.map((x: any, index: number) => {
                    return {
                        ...x,
                        displayImage: displayImage[index]
                    }
                })
                setWhySection({ ...whySection, left_menu: temp })
            });
    }
    const getDataById = () => {
        ApiGet(`home/get-speciality-section`)
            .then((res: any) => {
                console.log("res", res.data);

                if (Object.keys(res.data).length === 0) {
                    setWhySection({
                        main_title: "",
                        details: "",
                        left_menu: [{
                            image: "",
                            displayImage: "",
                            title: "",
                            color: "",
                            gradientColor: ""
                        }],
                        right_menu: [{
                            statistics: "",
                            percentage: 0,
                            color: ""
                        }]
                    })
                } else {
                    let data = res.data
                    delete data?.id
                    setWhySection(data)
                }
            })
    }

    useEffect(() => {
        getDataById()
    }, [])

    const uploadImage = (index: number) => {
        let formData = new FormData();
        if (selectedMainFile) {
            formData.append('image', selectedMainFile);
            ApiPost("general/file-and-image-upload", formData)
                .then((res: any) => {
                    const tempData = [...whySection.left_menu]
                    tempData[index].displayImage = res?.display_url
                    tempData[index].image = res?.url;
                    setWhySection({ ...whySection, left_menu: tempData });
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

    const attechImage = (index: number) => {
        document.getElementById(`attechMainImage${index}`)?.click();
    };


    return (
        <div className="pv-blogdetali">
            <div className="pv-blog-title">
                <p>Our Speciality</p>
            </div>
            <table className=" pv-dashtable mt-3 custom-table-border at-division">
                <tr className="font-18-bold pv-title-table">
                    <th>Main Title</th>
                    <td colSpan={10}> <input type="text" placeholder="Please enter main title" name="main_title" value={whySection.main_title} onChange={(event) => { handleChange(event, "main_title"); }} /></td>
                </tr>

                <tr className="font-18-bold pv-title-table">
                    <th>Description</th>
                    <td colSpan={10}>  <input type="text" placeholder="Please enter description" name="details" value={whySection.details} onChange={(event) => { handleChange(event, "details"); }} /></td>
                </tr>
                {whySection?.left_menu.map((leftItem: any, index: number) => (
                    <tr className="font-18-bold pv-title-table">
                        <th>Card {index}</th>
                        <th>Title</th>
                        <td> <input type="text" placeholder="Please enter title" name="title" value={leftItem.title} onChange={(event) => { handleLeftChange(index, event, "title"); }} /></td>

                        <th>Image</th>
                        <td>
                            <Button type="" className="dash-bg-pink" onClick={() => attechImage(index)}> Upload</Button>
                            <div className="rel-pv"><img className="pv-Speciality mt-3" src={leftItem?.displayImage == "" ? "./img/1139.png" : leftItem?.displayImage} alt="" />
                                <div>
                                    <input className="mt-4 mb-2 " hidden id={`attechMainImage${index}`} type="file" name="specialityfile" onChange={(e) => {
                                        if (!e.target.files || e.target.files.length === 0) {
                                            setSelectedMainFile(undefined);
                                            return;
                                        }
                                        setFileIndex(index)
                                        setSelectedMainFile(e.target.files[0]);
                                    }} />
                                </div>

                            </div>
                            upload image=60*60
                        </td>

                        <th>color</th>
                        {/* <td> <input type="text" placeholder="Please enter title" name="title" value={leftItem.color} onChange={(event) => { handleLeftChange(index, event, "color"); }} /></td> */}
                        <td>    <BlockPicker color={leftItem?.color} onChangeComplete={({ hex }) => handleLeftChange(index, hex, "color")} /></td>
                        <th>gradient Color</th>
                        {/* <td> <input type="text" placeholder="Please enter title" name="title" value={leftItem.gradientColor} onChange={(event) => { handleLeftChange(index, event, "gradientColor"); }} /></td> */}
                        <td>  <BlockPicker color={leftItem?.gradientColor} onChangeComplete={({ hex }) => handleLeftChange(index, hex, "gradientColor")} /></td>
                        <td>  <div className="w-100 justify-content-end d-flex">
                            {whySection.left_menu.length > 0 && (
                                <>
                                    {/* <Button type="" className=" pv-main-btn-img btn-success" onClick={() => { }}> Edit</Button> */}
                                    <Button type="" className=" pv-main-btn-img btn-danger" onClick={() => {
                                        handleRemovesection(index);
                                    }}>delete</Button>
                                </>
                            )}
                            {whySection.left_menu.length - 1 === index && (
                                <Button type="" className=" pv-main-btn-img btn-secondary" onClick={() => handleadddsection(index)}>+ Add</Button>
                            )}

                        </div></td>
                    </tr>
                ))}

                {whySection?.right_menu.map((rightItem: any, index: number) => (
                    <tr className="font-18-bold pv-title-table">
                        <th colSpan={3}>Division Statistics {index}</th>
                        <th>Statistics</th>
                        <td> <input type="text" placeholder="Please enter statistics" name="statistics" value={rightItem.statistics} onChange={(event) => { handleRightChange(index, event, "statistics"); }} /></td>

                        <th>Percentage</th>
                        <td> <input type="number" placeholder="Please enter percentage" name="percentage" value={rightItem.percentage} onChange={(event) => { handleRightChange(index, event, "percentage"); }} /></td>

                        <th>color</th>
                        {/* <td> <input type="text" placeholder="Please enter color" name="colr" value={rightItem.color} onChange={(event) => { handleRightChange(index, event, "color"); }} /></td> */}
                        <td >  <BlockPicker color={rightItem?.color} onChangeComplete={({ hex }) => handleRightChange(index, hex, "color")} /></td>
                        <td>  <div className="w-100 justify-content-end d-flex">
                            {whySection.right_menu.length > 0 && (
                                <>
                                    {/* <Button type="" className=" pv-main-btn-img btn-success" onClick={() => { }}> Edit</Button> */}
                                    <Button type="" className=" pv-main-btn-img btn-danger" onClick={() => {
                                        handleRemoveStatistics(index);
                                    }}>delete</Button>
                                </>
                            )}
                            {whySection.right_menu.length - 1 === index && (
                                <Button type="" className=" pv-main-btn-img btn-secondary" onClick={() => handleaddStatistics(index)}>+ Add</Button>
                            )}

                        </div></td>
                    </tr>
                ))}
            </table>
            <div className="text-center ">
                <Button type="" className=" pv-main-btn-img btn-secondary" onClick={handleSave}>Save</Button>
                {/* <Button type="" className=" pv-main-btn-img btn-success" onClick={() => { }}> Edit</Button> */}
                {/* <Button type="" className="pv-main-btn-img  btn-info" onClick={() => { }}> Hide</Button> */}
                {/* <Button type="" className=" pv-main-btn-img  btn-danger" onClick={() => { }}> Detal</Button> */}
            </div>
        </div >
    )
}

export default OurSpeciality
