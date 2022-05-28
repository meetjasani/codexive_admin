import React, { useEffect, useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { ApiGet, ApiPut } from '../../helper/API/ApiData'
import CategoryList from './CategoryList'

export interface CategoryListData {
    id: string;
    category: string;
    parent_category_id: string
}



const Category = () => {
    const history = useHistory();
    const [categoryData, setCategoryData] = useState<CategoryListData[]>([])
    const [totalSize, setTotalSize] = useState<number>(0);
    const [categoryListId, setCategoryListId] = useState<any>([]);


    const getCategoryListData = (page_number = 1, per_page = 10) => {
        ApiGet(`category/getallcategorybyadmin?per_page=${per_page}&page_number=${page_number}`)
            .then((res: any) => {
                setTotalSize(res.data && res.data.count);
                setCategoryData(res.data.category.map((x: any, index: any) => {
                    return {
                        id: x.id,
                        no_id: res.data.count - (page_number - 1) * per_page - index,
                        created_at: x.created_at,
                        category: x.category,
                        parent_category_id: x.parent_category_id,
                    };
                }));
            })
    }

    const selectRow = {
        mode: "checkbox",
        onSelect: (isSelect: any, rows: any, e: any) => {
            const index = categoryListId.findIndex(
                (item: any) => item.id === isSelect.id
            );
            if (index !== -1 && index !== undefined) {
                categoryListId.splice(index, 1);
            } else {
                categoryListId.push({ id: isSelect.id });
            }
        },
        onSelectAll: (isSelect: any, rows: any, e: any) => {
            if (isSelect === true) {
                rows.map((x: any) => (
                    categoryListId.push({ id: x.id })
                ));
            } else {
                setCategoryListId([]);
            }
        },
    };

    const CreateUser = () => [
        history.push('/add_category')
    ]

    const deleteUsers = () => {
        if (categoryListId.length > 0) {
            ApiPut(`category/delete-category`, {
                id: categoryListId.map((m: any) => m.id).join(","),
            }).then((res: any) => {
                getCategoryListData()
                setCategoryListId([])
            });
        }
    }

    useEffect(() => {
        getCategoryListData()
    }, [])

    return (
        <div className="all-sort-table">
            <div className=" single-direct-table">
                <div className="align-items-center d-flex">
                    <Container fluid>
                        <Row className="align-items-center">
                            <h1 className="font-27-bold text-left">User List</h1>

                            <div className="btn-primary-pv  ml-auto">
                                <Button className="dash-bg-pink btn btn-primary" onClick={CreateUser}>
                                    Create
                                </Button>

                                <Button className="dash-bg-pink btn btn-primary" onClick={deleteUsers}>
                                    Delete
                                </Button>
                            </div>

                        </Row>
                    </Container>
                </div>

                <Container fluid className="p-0">
                    <Row className="dashtable-pv">
                        <CategoryList
                            data={categoryData}
                            getUserListManagement={getCategoryListData}
                            totalSize={totalSize}
                            selectRow={selectRow}
                        />
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Category
