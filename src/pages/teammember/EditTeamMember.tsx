import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router';
import InputField from '../../component/InputField/InputField';
import { ApiGet, ApiPatch, ApiPost, ApiPut } from '../../helper/API/ApiData';
import { MemberType } from '../../helper/constant';
import TeamMemberList from './TeamMemberList';
import { toast } from 'react-toastify';

function EditTeamMember() {

    const history = useHistory();
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    const [teamMemberData, setTeamMemberData] = useState({
        id_number: "",
        // image: "",
        first_name: "",
        last_name: "",
        skill: "",
        member_type: ""
    })
    const [profileImages, setProfileImages] = useState({
        display_image: "",
        image: ""
    });
    const [selectedFile, setSelectedFile] = useState<File>();
    const [imgSrc, setImgSrc] = useState("./img/Filip_profile_circle.png");
    const recentHostBtn = () => {
        history.push("/teammembers")
    }

    const handleInputChange = (e: any) => {
        setTeamMemberData({
            ...teamMemberData,
            [e.target.name]: e.target.value
        })
    }

    const getTeamMemberById = () => {
        ApiGet(`team/get-team-by-id/${id}`)
            .then((res: any) => {
                setTeamMemberData({
                    ...teamMemberData,
                    id_number: res.data.id_number,
                    // image: res.data.image,
                    first_name: res.data.first_name,
                    last_name: res.data.last_name,
                    skill: res.data.skill,
                    member_type: res.data.member_type
                })
                setProfileImages({
                    display_image: res.data.display_image,
                    image: res.data.image
                })
                // setSelectedFile(undefined)
            })
    }

    useEffect(() => {
        if (id) {
            getTeamMemberById()
        }
    }, [id])

    const Save = () => {
        if (id === "" || !id) {
            const body = {
                id_number: teamMemberData.id_number,
                image: profileImages.image,
                first_name: teamMemberData.first_name,
                last_name: teamMemberData.last_name,
                skill: teamMemberData.skill,
                member_type: teamMemberData.member_type
            }
            let formData = new FormData();
            if (selectedFile) {
                formData.append('avatar', selectedFile);
            }
            ApiPost(`team/add-team`, body)
                .then((res: any) => {
                    toast.success("Success!")
                    goToList()
                }).catch((error: any) => {
                    toast.error("Fail!")
                });
        } else {
            const body = {
                id_number: teamMemberData.id_number,
                image: profileImages.image,
                first_name: teamMemberData.first_name,
                last_name: teamMemberData.last_name,
                skill: teamMemberData.skill,
                member_type: teamMemberData.member_type
            }
            ApiPut(`team/edit-team/${id}`, body)
                .then((res: any) => {
                    goToList()
                    toast.success("Success!")
                }).catch((error: any) => {
                    toast.error("Fail!")
                });
        }
    }

    const goToList = () => {
        history.push("teammembers")
    }

    const uploadImage = () => {
        let formData = new FormData();

        if (selectedFile) {
            formData.append('image', selectedFile);
            ApiPost("general/file-and-image-upload", formData)
                .then((res: any) => {

                    setProfileImages({
                        display_image: res.display_url,
                        image: res.url
                    })
                    // setImgSrc(res.display_url)
                    // setTeamMemberData({ ...teamMemberData, image: res.url })
                    // setSelectedFile(undefined)
                }).catch((error) => {
                    console.log("error", error);
                })
        }
    }

    useEffect(() => {
        if (selectedFile) {
            uploadImage()
        }
    }, [selectedFile])


    const attechImage = () => {
        document.getElementById("attechImage")?.click();
    };
    return (
        <div className="pv-blogdetali">
            <div className="pv-blog-title">
                <p>Edit Team Member</p>
            </div>
            <table className=" pv-dashtable mt-3 custom-table-border">
                <tr className="font-18-bold pv-title-table ">
                    <th>Image</th>
                    <td>
                        <div>
                            <div className="rel-pv">
                                {profileImages?.display_image ?
                                    <img className="pv-td-image" src={profileImages.display_image} alt="" /> :
                                    <img className="pv-td-image" src="./img/user.png" alt="" />
                                }
                                <div className="pv-cricle-img">
                                    <img src="./img/dry-clean.png" alt="" onClick={attechImage} />
                                </div>
                                <div className="pv-camera-img" onClick={attechImage}>
                                    <img src="./img/camera.png" alt="" />

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
                            </div>
                        </div>
                    </td>
                </tr>
                <tr className="font-18-bold pv-title-table">
                    <th>ID Number</th>
                    <td> <input
                        name="id_number"
                        type="text"
                        placeholder="Please enter id"
                        value={teamMemberData.id_number}
                        onChange={(e) => handleInputChange(e)}
                    /></td>
                </tr>

                <tr className="font-18-bold pv-title-table">
                    <th>First Name</th>
                    <td> <input
                        name="first_name"
                        type="text"
                        placeholder="Please enter first name"
                        value={teamMemberData.first_name}
                        onChange={(e) => handleInputChange(e)}
                    /></td>
                </tr>
                <tr className="font-18-bold pv-title-table">
                    <th>Last Name </th>
                    <td> <input
                        name="last_name"
                        type="text"
                        placeholder="Please enter last name"
                        value={teamMemberData.last_name}
                        onChange={(e) => handleInputChange(e)}
                    /></td>
                </tr>
                <tr className="font-18-bold pv-title-table">
                    <th>Skill </th>
                    <td> <input
                        name="skill"
                        type="text"
                        placeholder="Please enter skill"
                        value={teamMemberData.skill}
                        onChange={(e) => handleInputChange(e)}
                    /></td>
                </tr>
                <tr className="font-18-bold pv-title-table">
                    <th>Member Position</th>
                    <td>
                        <select
                            id="team"
                            className='pmselect-input'
                            name="member_type"
                            value={teamMemberData.member_type}
                            onChange={(e) => setTeamMemberData({
                                ...teamMemberData,
                                member_type: e.target.value
                            })}>
                            <option value="">Select</option>
                            {MemberType.length > 0 && MemberType.map((team: any) => (
                                <option value={team?.value}>{team?.label}</option>
                            ))}
                        </select>
                    </td>
                </tr>
            </table>


            <div className="text-center ">

                <Button type="" className=" pv-main-btn-img btn-secondary" onClick={recentHostBtn}> Back</Button>

                <Button type="" className=" pv-main-btn-img btn-success" onClick={Save}> Save</Button>

                {/* <Button type="" className=" pv-main-btn-img  btn-danger" onClick={Delete}> delete</Button> */}

            </div>

        </div>
    )
}

export default EditTeamMember
