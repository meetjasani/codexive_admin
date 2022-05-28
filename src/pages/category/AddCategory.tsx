import React, { useEffect, useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router';
import { ApiGet, ApiPatch, ApiPost, ApiPut } from '../../helper/API/ApiData';
import { TechType } from '../../helper/constant';
import { toast } from 'react-toastify';

const AddCategory = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    const history = useHistory();
    const [categoryData, setCategoryData] = useState({
        category: "",
        category_type: "",
        parent_category_id: "",
    })
    const [getTechData, setGetTechData] = useState({
        Category: [],
        Services: []
    })
    const [getCategory, setGetCategory] = useState([])
    const [disable, setDisable] = useState(false)

    useEffect(() => {
        getTechnologyCall()
    }, [])

    useEffect(() => {
        if (id != null && id != undefined) {
            getCategoryById()
        }
    }, [id])

    useEffect(() => {
        // if (categoryData.category != "" && categoryData.parent_category_id != "") {
        //     setDisable(false)
        // } else {
        //     setDisable(true)
        // }
    }, [disable, categoryData])

    const getTechnologyCall = () => {
        ApiGet(`tech/getTechnologyByType`)
            .then((res: any) => {
                setGetTechData(res.data)
            })
    }

    const getCategoryById = () => {
        ApiGet(`category/categoryDropDownById/${id}`)
            .then((res: any) => {
                setCategoryData({
                    ...categoryData,
                    category: res.data?.category,
                    category_type: res.data?.category_type,
                    parent_category_id: res.data?.parent_category_id
                })
            })
    }

    const handleChnage = (e: any) => {
        setCategoryData({
            ...categoryData,
            [e.target.name]: e.target.value
        })
    }

    const handleSave = () => {
        if (id != null && id != undefined) {
            ApiPut(`category/edit-category/${id}`, categoryData)
                .then((response: any) => {
                    toast.success("Success!")
                    goToList()
                }).catch((error: any) => {
                    toast.error("Fail!")
                });
        } else {
            ApiPost(`category/add-category`, categoryData)
                .then((response: any) => {
                    goToList()
                    toast.success("Success!")
                }).catch((error: any) => {
                    toast.error("Fail!")
                });

        }
    }

    const goToList = () => {
        history.push('/category_list')
    }

    return (
        <div className="all-sort-table">
            <Container fluid>
                <Row className="">
                    <h1 className="font-27-bold">Category</h1>
                </Row>
            </Container>
            <table className=" pv-dashtable mt-3 custom-table-border">

                <tr className="font-18-bold pv-title-table">
                    <th> <label>Category</label></th>
                    <td>
                        <input
                            name="category"
                            type='text'
                            placeholder='Please enter category'
                            value={categoryData.category}
                            onChange={(e) => handleChnage(e)}
                        />
                    </td>
                </tr>
                <tr className="font-18-bold pv-title-table">
                    <th><label>Type</label></th>
                    <td>
                        <select id="category" className='pmselect-input' name="category" value={categoryData.category_type} onChange={(e) => setCategoryData({
                            ...categoryData,
                            category_type: e.target.value
                        })}>
                            <option value="">Select</option>
                            {TechType.length > 0 && TechType.map((type: any) => (
                                <option value={type?.value}>{type?.label}</option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr className="font-18-bold pv-title-table">
                    <th><label>Parant Category</label></th>
                    {console.log(getTechData)}
                    <td>
                        <select id="category" className='pmselect-input' name="category" value={categoryData.parent_category_id} onChange={(e) => setCategoryData({
                            ...categoryData,
                            parent_category_id: e.target.value
                        })}>
                            <option value="">Select</option>
                            {categoryData.category_type == "Category" ?
                                getTechData && getTechData.Category.length > 0 && getTechData.Category.map((category: any) => (
                                    <option value={category?.label}>{category?.label}</option>
                                ))
                                :
                                (categoryData.category_type == "Services" ?
                                    getTechData && getTechData.Services.length > 0 && getTechData.Services.map((services: any) => (
                                        <option value={services?.label}>{services?.label}</option>
                                    ))
                                    : null)
                            }
                        </select>
                    </td>
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

export default AddCategory
