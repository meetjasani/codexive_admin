import React, { useEffect, useState } from 'react'
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import { toast, ToastContainer } from 'react-toastify';
import { Button } from 'react-bootstrap';

interface customerprops {
    title: string;
    description: string;
    customer: {
        image: string;
        name: string;
        displayImage: string;
        customer_title: string;
        customer_description: string;
    }[];
}
const OurCustomer = () => {
    const [customerSection, setCustomerSection] = useState<customerprops>(
        {
            title: "",
            description: "",
            customer: [{
                image: "",
                name: "",
                displayImage: "",
                customer_title: "",
                customer_description: ""
            }],
        }
    );

    const [fileIndex, setFileIndex] = useState(0)
    const [selectedMainFile, setSelectedMainFile] = useState<File>();

    const handleChange = (event: any, inputName: string) => {
        if (inputName === "title") {
            setCustomerSection({ ...customerSection, title: event.target.value });
        }
        if (inputName === "description") {
            setCustomerSection({ ...customerSection, description: event.target.value });
        }
    }

    const handleLeftChange = (index: number, event: any, inputName: string) => {
        const tempData = [...customerSection.customer]
        if (inputName === "name") {
            tempData[index].name = event.target.value;
        } if (inputName === "customer_title") {
            tempData[index].customer_title = event.target.value;
        } if (inputName === "customer_description") {
            tempData[index].customer_description = event.target.value;
        }
        setCustomerSection({ ...customerSection, customer: tempData });
    }


    const handleadddsection = (index: number) => {
        const tempData = [...customerSection.customer]
        tempData.push(
            {
                image: "",
                name: "",
                displayImage: "",
                customer_title: "",
                customer_description: ""
            }
        )
        setCustomerSection({ ...customerSection, customer: tempData });
    }


    const handleRemovesection = (index: number) => {
        const tempData = [...customerSection.customer]
        if (tempData.length > 1) {
            tempData.splice(index, 1);
            setCustomerSection({ ...customerSection, customer: tempData });
        }
    }



    const handleSave = () => {
        let displayImage: any = [];
        const tempData = [...customerSection.customer]
        const temp = tempData.map((why: any) => {
            displayImage.push(why.displayImage)
            delete why.displayImage;
            return why
        })
        let body = { ...customerSection, customer: temp }
        ApiPost(`customer/add-ourCustomer-section`, body)
            .then((response: any) => {
                toast.success("Success!")
                let temp = [...customerSection.customer];
                temp = temp.map((x: any, index: number) => {
                    return {
                        ...x,
                        displayImage: displayImage[index]
                    }
                })
                setCustomerSection({ ...customerSection, customer: temp })
            }).catch((error: any) => {
                toast.error("Fail!")
                let temp = [...customerSection.customer];
                temp = temp.map((x: any, index: number) => {
                    return {
                        ...x,
                        displayImage: displayImage[index]
                    }
                })
                setCustomerSection({ ...customerSection, customer: temp })
            });
    }
    const getDataById = () => {
        ApiGet(`customer/get-ourCustomer-section`)
            .then((res: any) => {

                if (Object.keys(res.data).length === 0) {
                    setCustomerSection({
                        title: "",
                        description: "",
                        customer: [{
                            image: "",
                            name: "",
                            displayImage: "",
                            customer_title: "",
                            customer_description: ""
                        }]
                    })
                } else {
                    let data = res.data
                    delete data?.id
                    setCustomerSection(data)
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
                    const tempData = [...customerSection.customer]
                    tempData[index].displayImage = res?.display_url
                    tempData[index].image = res?.url;
                    setCustomerSection({ ...customerSection, customer: tempData });
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
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover theme='colored' />
            <div className="pv-blog-title">
                <p>Our Speciality</p>
            </div>
            <table className=" pv-dashtable mt-3 custom-table-border at-division">
                <tr className="font-18-bold pv-title-table">
                    <th>Main Title</th>
                    <td colSpan={10}> <input type="text" placeholder="Please enter main title" name="main_title" value={customerSection.title} onChange={(event) => { handleChange(event, "title"); }} /></td>
                </tr>

                <tr className="font-18-bold pv-title-table">
                    <th>Description</th>
                    <td colSpan={10}>  <input type="text" placeholder="Please enter description" name="details" value={customerSection.description} onChange={(event) => { handleChange(event, "description"); }} /></td>
                </tr>
                {customerSection?.customer.map((leftItem: any, index: number) => (
                    <tr className="font-18-bold pv-title-table">
                        <th>Card {index}</th>
                        <th>Name</th>
                        <td> <input type="text" placeholder="Please enter name" name="name" value={leftItem.name} onChange={(event) => { handleLeftChange(index, event, "name"); }} /></td>

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

                        <th>Customer title</th>
                        <td> <input type="text" placeholder="Please enter title" name="customer_title" value={leftItem.customer_title} onChange={(event) => { handleLeftChange(index, event, "customer_title"); }} /></td>
                        <th>Customer description</th>
                        <td> <input type="text" placeholder="Please enter description" name="customer_description" value={leftItem.customer_description} onChange={(event) => { handleLeftChange(index, event, "customer_description"); }} /></td>
                        <td>  <div className="w-100 justify-content-end d-flex">
                            {customerSection.customer.length > 0 && (
                                <>
                                    {/* <Button type="" className=" pv-main-btn-img btn-success" onClick={() => { }}> Edit</Button> */}
                                    <Button type="" className=" pv-main-btn-img btn-danger" onClick={() => {
                                        handleRemovesection(index);
                                    }}>delete</Button>
                                </>
                            )}
                            {customerSection.customer.length - 1 === index && (
                                <Button type="" className=" pv-main-btn-img btn-secondary" onClick={() => handleadddsection(index)}>+ Add</Button>
                            )}

                        </div></td>
                    </tr>
                ))}
            </table>
            <div className="text-center ">
                <Button type="" className=" pv-main-btn-img btn-secondary" onClick={handleSave}>Save</Button>
            </div>
        </div >
    )
}


export default OurCustomer
