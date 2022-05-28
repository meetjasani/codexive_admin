import React, { useEffect, useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router';
import { ApiGet, ApiPatch, ApiPost, ApiPut } from '../../helper/API/ApiData';
import { TechType } from '../../helper/constant';
import { toast } from 'react-toastify';
import { BlockPicker } from 'react-color';

interface techData {
    type: string,
    name: string,
    image: string,
    displayImage?: string,
    firstColor: string,
    secondColor: string,
}

const AddTech = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    const history = useHistory();
    const [selectedMainFile, setSelectedMainFile] = useState<File>();
    const [techData, setTechData] = useState<techData>({
        type: "",
        name: "",
        image: "",
        displayImage: "",
        firstColor: "",
        secondColor: "",
    })

    useEffect(() => {
        if (id != null && id != undefined) {
            getTechnologyById()
        }
    }, [id])

    const getTechnologyById = () => {
        ApiGet(`tech/getTechnologyById/${id}`)
            .then((res: any) => {
                setTechData({
                    ...techData,
                    type: res.data?.type,
                    name: res.data?.name,
                    image: res.data?.image?.image,
                    displayImage: res.data?.image?.displayImage,
                    firstColor: res.data?.firstColor,
                    secondColor: res.data?.secondColor,
                })
            })
    }

    const handleChnage = (e: any) => {
        setTechData({
            ...techData,
            [e.target.name]: e.target.value
        })
    }

    const handleSave = () => {
        let body = techData
        let displayImage = body.displayImage
        delete body.displayImage
        if (id != null && id != undefined) {
            ApiPut(`tech/edit-technology/${id}`, body)
                .then((response: any) => {
                    goToList()
                }).catch((error: any) => {
                    toast.error("Fail!")
                    setTechData({ ...techData, displayImage: displayImage })
                });
        } else {
            ApiPost(`tech/add-technology`, body)
                .then((response: any) => {
                    goToList()
                }).catch((error: any) => {
                    toast.error("Fail!")
                    setTechData({ ...techData, displayImage: displayImage })
                });

        }
    }

    const goToList = () => {
        history.push('/tech_list')
    }

    const uploadImage = () => {
        let formData = new FormData();
        if (selectedMainFile) {
            formData.append('image', selectedMainFile);
            ApiPost("general/file-and-image-upload", formData)
                .then((res: any) => {
                    setTechData({ ...techData, image: res.url, displayImage: res.display_url });
                    setSelectedMainFile(undefined)
                }).catch((error) => {
                    console.log("error", error);
                })
        }
    }

    useEffect(() => {
        if (selectedMainFile) {
            uploadImage()
        }
    }, [selectedMainFile])

    const attechImage = () => {
        document.getElementById(`attechImage`)?.click();
    };

    return (
        <div className="all-sort-table">
            <Container fluid>
                <Row className="">
                    <h1 className="font-27-bold">Category</h1>
                </Row>
            </Container>
            <table className=" pv-dashtable mt-3 custom-table-border">
                <tr className="font-18-bold pv-title-table">
                    <th><label>Technology Type</label></th>
                    <td colSpan={5}>
                        <select id="category" className='pmselect-input' name="type" value={techData.type} onChange={(e) => handleChnage(e)}>
                            <option value="">Select</option>
                            {TechType.length > 0 && TechType.map((type: any) => (
                                <option value={type?.value}>{type?.label}</option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr className="font-18-bold pv-title-table">
                    <th> <label>Technology Name</label></th>
                    <td colSpan={5}>
                        <input
                            name="name"
                            type='text'
                            placeholder='Please enter technology name'
                            value={techData.name}
                            onChange={(e) => handleChnage(e)}
                        />
                    </td>
                </tr>
                <tr className="font-18-bold pv-title-table ">
                    <th>Technology Image</th>
                    <td colSpan={5}>
                        <Button type="" className="dash-bg-pink" onClick={() => attechImage()}> Upload</Button>

                        <div className="rel-pv"><img className="pv-Choose-Us mt-3" src={techData?.displayImage == "" ? "./img/1139.png" : techData?.displayImage} alt="" />
                            <input className="mt-4 mb-4" hidden id={`attechImage`} type="file" name="choosefile"
                                onChange={(e) => {
                                    if (!e.target.files || e.target.files.length === 0) {
                                        setSelectedMainFile(undefined);
                                        return;
                                    }
                                    setSelectedMainFile(e.target.files[0]);
                                }}
                            />
                        </div>
                        <div className="ml-auto pv-hero-btn">
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>First color</th>
                    <td>    <BlockPicker color={techData?.firstColor} onChangeComplete={({ hex }) => setTechData({ ...techData, firstColor: hex })} /></td>
                    <th>Second Color</th>
                    <td>  <BlockPicker color={techData?.secondColor} onChangeComplete={({ hex }) => setTechData({ ...techData, secondColor: hex })} /></td>
                </tr>
            </table>

            <div className="text-center">
                <Button className=" pv-main-btn-img btn-secondary" onClick={goToList}>
                    Back
                </Button>
                <Button className=" pv-main-btn-img btn-success" onClick={handleSave}>
                    Save
                </Button>
            </div>
        </div >
    )
}

export default AddTech