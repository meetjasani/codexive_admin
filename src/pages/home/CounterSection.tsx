import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import { BlockPicker } from 'react-color'
import { toast } from 'react-toastify';
interface counterprops {
    image: string;
    firstColor: string,
    secondColor: string,
    thirdColor: string,
    number_input: string;
    symbol: string,
    title: string;
    displayImage: string;
}

function CounterSection() {
    const [counterSection, setcounterSection] = useState<counterprops[]>([
        {
            image: "",
            firstColor: "",
            secondColor: "",
            thirdColor: "",
            number_input: "",
            symbol: "",
            title: "",
            displayImage: "",
        }
    ]);

    const [fileIndex, setFileIndex] = useState(0)
    const [selectedMainFile, setSelectedMainFile] = useState<File>();

    const uploadImage = (index: number) => {
        let formData = new FormData();
        if (selectedMainFile) {
            formData.append('image', selectedMainFile);
            ApiPost("general/file-and-image-upload", formData)
                .then((res: any) => {
                    const values = [...counterSection];
                    values[index].displayImage = res?.display_url;
                    values[index].image = res?.url;
                    setcounterSection(values);
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
        console.log(counterSection)
    }, [selectedMainFile, fileIndex, counterSection])


    const handleSave = () => {
        let displayImage: any = [];
        const tempData = counterSection.map((why: any) => {
            displayImage.push(why.displayImage)
            delete why.displayImage;
            return why
        })
        ApiPost(`home/add-counter-section`, { counterData: tempData })
            .then((response: any) => {
                toast.success("Success!")
                let temp = [...counterSection];
                temp = temp.map((x: any, index: number) => {
                    return {
                        ...x,
                        displayImage: displayImage[index]
                    }
                })
                setcounterSection(temp)
            }).catch((error: any) => {
                toast.error("Fail!")
                let temp = [...counterSection];
                temp = temp.map((x: any, index: number) => {
                    return {
                        ...x,
                        displayImage: displayImage[index]
                    }
                })
                setcounterSection(temp)
            });
    }

    const getDataById = () => {
        ApiGet(`home/get-counter-section`)
            .then((res: any) => {
                if (res.data.length == 0) {
                    setcounterSection([{
                        image: "",
                        firstColor: "",
                        secondColor: "",
                        thirdColor: "",
                        number_input: "",
                        symbol: "",
                        title: "",
                        displayImage: "",
                    }])
                } else {
                    setcounterSection(res.data?.map((item: any) => {
                        return {
                            title: item.title,
                            firstColor: item.firstColor,
                            secondColor: item.secondColor,
                            thirdColor: item.thirdColor,
                            symbol: item.symbol,
                            number_input: item.number_input,
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

    const handleChange = (index: number, event: any, inputName: string) => {
        const values = [...counterSection];
        if (inputName === "number_input") {
            values[index].number_input = event.target.value;
        }
        if (inputName === "symbol") {
            values[index].symbol = event.target.value;
        }
        if (inputName === "title") {
            values[index].title = event.target.value;
        }
        if (inputName === "firstColor") {
            values[index].firstColor = event;
        }
        if (inputName === "secondColor") {
            values[index].secondColor = event;
        }
        if (inputName === "thirdColor") {
            values[index].thirdColor = event;
        }

        setcounterSection(values);
    }

    const handleadddsection = () => {
        const values = [...counterSection];
        values.push({
            image: "",
            firstColor: "",
            secondColor: "",
            thirdColor: "",
            number_input: "",
            symbol: "",
            title: "",
            displayImage: ""
        })
        setcounterSection(values);
    }

    const handleRemovesection = (id: any, index: any) => {
        if (counterSection.length > 1) {
            const values = [...counterSection];
            values.splice(index, 1);
            setcounterSection(values);
        }
    }

    const attechImage = (index: number) => {
        document.getElementById(`attechMainImage${index}`)?.click();
    };

    return (
        <div className="pv-blogdetali">
            <div className="pv-blog-title">
                <p>Counter Section</p>
            </div>
            {counterSection.map((input: any, index: number) => (
                <>


                    <table className=" pv-dashtable mt-3 custom-table-border">


                        <tr className="font-18-bold pv-title-table ">
                            <th>Image</th>
                            <td colSpan={5}>
                                <div className="rel-pv"><img className="pv-Choose-Us mt-3" src={input?.displayImage == "" ? "./img/1139.png" : input?.displayImage} alt="" />
                                    <input className="mt-4 mb-4" hidden id={`attechMainImage${index}`} type="file" name="choosefile" value={input.choosefile}
                                        onChange={(e) => {
                                            if (!e.target.files || e.target.files.length === 0) {
                                                setSelectedMainFile(undefined);
                                                return;
                                            }
                                            setFileIndex(index)
                                            setSelectedMainFile(e.target.files[0]);
                                        }}
                                    />
                                </div>
                                upload image=70*70
                                <div className="ml-auto pv-hero-btn">
                                    <Button type="" className="dash-bg-pink" onClick={() => attechImage(index)}> Upload</Button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>First color</th>
                            <td>    <BlockPicker color={input?.firstColor} onChangeComplete={({ hex }) => handleChange(index, hex, "firstColor")} /></td>
                            <th>Second Color</th>
                            <td>  <BlockPicker color={input?.secondColor} onChangeComplete={({ hex }) => handleChange(index, hex, "secondColor")} /></td>
                            <th>Third Color</th>
                            <td>  <BlockPicker color={input?.thirdColor} onChangeComplete={({ hex }) => handleChange(index, hex, "thirdColor")} /></td>
                        </tr>


                        <tr className="font-18-bold pv-title-table">
                            <th>Number Input</th>
                            <td colSpan={5}> <input type="number" placeholder="Please enter Numbers" name="number_input" value={input.number_input} onChange={(event) => { handleChange(index, event, "number_input"); }} /></td>


                        </tr>
                        <tr className="font-18-bold pv-title-table">
                            <th>symbol</th>
                            <td colSpan={5}> <input type="text" placeholder="Please enter symbol" name="symbol" value={input.symbol} onChange={(event) => { handleChange(index, event, "symbol"); }} /></td>
                        </tr>


                        <tr className="font-18-bold pv-title-table">
                            <th>Title</th>
                            <td colSpan={5}> <input type="text" placeholder="Please enter title" name="title" value={input.title} onChange={(event) => { handleChange(index, event, "title"); }} /></td>
                        </tr>

                    </table>

                    <div className="w-100 justify-content-end d-flex">
                        {counterSection.length > 0 && (
                            <>
                                {/* <Button type="" className=" pv-main-btn-img btn-success" onClick={() => { }}> Edit</Button> */}
                                <Button type="" className=" pv-main-btn-img btn-danger" onClick={() => {
                                    handleRemovesection(input.id, index);
                                }}>delete</Button>
                            </>
                        )}
                        {counterSection.length - 1 === index && (
                            <Button type="" className=" pv-main-btn-img btn-secondary" onClick={handleadddsection}>+ Add Section</Button>
                        )}

                    </div>
                </>
            ))}

            <div className="text-center ">

                <Button type="" className=" pv-main-btn-img btn-secondary" onClick={handleSave}>Save</Button>

                {/* <Button type="" className=" pv-main-btn-img btn-success" onClick={() => { }}> Edit</Button> */}

                {/* <Button type="" className="pv-main-btn-img  btn-info" onClick={() => { }}> Hide</Button> */}

                {/* <Button type="" className=" pv-main-btn-img  btn-danger" onClick={() => { }}> Detal</Button> */}

            </div>

        </div>
    )
}

export default CounterSection
