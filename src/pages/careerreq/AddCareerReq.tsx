import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { ApiGet, ApiPatch, ApiPost, ApiPut } from '../../helper/API/ApiData';

const AddCareerReq = () => {

    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    const history = useHistory();
    const [careerData, setCarrerData] = useState({
        id: "",
        position: "",
        requirement: "",
        experience: ""
    })

    const recentHostBtn = () => {
        history.push("/careereq")
    }

    const handleChange = (e: any) => {
        setCarrerData({
            ...careerData,
            [e.target.name]: e.target.value
        })
    }

    const getCareerReqById = () => {
        ApiGet(`career/get-career-requirement-by-id/${id}`)
            .then((res: any) => {
                setCarrerData({
                    ...careerData,
                    position: res.data.position,
                    requirement: res.data.requirement,
                    experience: res.data.experience
                })
            })
    }
    const saveCareer = () => {
        if (id === "" || !id) {
            const body = {
                position: careerData.position,
                requirement: careerData.requirement.toString(),
                experience: careerData.experience
            }

            ApiPost(`career/add-career-requirement`, body)
                .then((res: any) => {
                    goToList()
                    toast.success("Success!")
                }).catch((error: any) => {
                    toast.error("Fail!")
                });
        } else {
            const body = {
                position: careerData.position,
                requirement: careerData.requirement.toString(),
                experience: careerData.experience
            }
            ApiPut(`career/edit-career-requirement/${id}`, body)
                .then((res: any) => {
                    toast.success("Success!")
                    goToList()
                }).catch((error: any) => {
                    toast.error("Fail!")
                });
        }
    }

    const goToList = () => {
        history.push('/careereq')
    }

    useEffect(() => {
        if (id != null && id != undefined) {
            getCareerReqById()
        }
    }, [id])

    return (
        <div className="pv-blogdetali">
            <div className="pv-blog-title">
                <p>Add Career Requirement</p>
            </div>

            <table className=" pv-dashtable mt-3 custom-table-border">

                <tr className="font-18-bold pv-title-table">
                    <th>Member Position</th>
                    <td>
                        <input
                            name="position"
                            type="text"
                            placeholder="Please enter position"
                            value={careerData.position}
                            onChange={(e) => handleChange(e)}
                        />
                    </td>
                </tr>
                <tr className="font-18-bold pv-title-table">
                    <th>Requirement </th>
                    <td>
                        <input
                            name="requirement"
                            type="number"
                            placeholder="Please enter requirement"
                            value={careerData.requirement}
                            onChange={(e) => handleChange(e)}
                        />
                    </td>
                </tr>
                <tr className="font-18-bold pv-title-table">
                    <th>Experience</th>
                    <td> <input
                        name="experience"
                        type="text"
                        placeholder="Please enter experience"
                        value={careerData.experience}
                        onChange={(e) => handleChange(e)}
                    /></td>
                </tr>
            </table>

            <div className="text-center ">

                <Button className=" pv-main-btn-img btn-secondary" onClick={recentHostBtn}> Back</Button>
                <Button className=" pv-main-btn-img btn-success" onClick={saveCareer}> Save</Button>

            </div>


        </div>
    )
}

export default AddCareerReq