import React, { useEffect, useState } from 'react'

import BootstrapTable from 'react-bootstrap-table-next'
import { useHistory } from 'react-router';
import Buttons from '../../component/Buttons/Buttons';
import { ApiGet, ApiPut } from '../../helper/API/ApiData';
import BlogList from './BlogList';

export interface BlogListData {
    id: string;
    no_id: string;
    created_at: string
    title: string
    details: string
    technologies: string
    image: string
}

function Blog() {

    const history = useHistory();
    const [blogdata, setBlogdata] = useState<BlogListData[]>([])
    const [totalSize, setTotalSize] = useState<number>(0);
    const [blogListId, setBlogListId] = useState<any>([]);

    const getBlogListData = (page_number = 1, per_page = 10) => {
        ApiGet(`blog/get-blogs-by-admin?per_page=${per_page}&page_number=${page_number}`)
            .then((res: any) => {
                setTotalSize(res.data && res.data.count);
                // setBlogdata(res.data.blogs)
                setBlogdata(res.data &&
                    res.data.blogs &&
                    res.data.blogs.map((x: any, index: any) => {
                        return {
                            id: x.id,
                            no_id: res.data.count - (page_number - 1) * per_page - index,
                            title: x.title,
                            details: x.details,
                            technologies: x.technologies,
                            image: x.image
                        };
                    }))
            })
    }

    const selectRow = {
        mode: "checkbox",
        onSelect: (isSelect: any, rows: any, e: any) => {
            const index = blogListId.findIndex(
                (item: any) => item.id === isSelect.id
            );
            if (index !== -1 && index !== undefined) {
                blogListId.splice(index, 1);
            } else {
                blogListId.push({ id: isSelect.id });
            }
        },
        onSelectAll: (isSelect: any, rows: any, e: any) => {
            if (isSelect === true) {
                rows.map((x: any) => (
                    blogListId.push({ id: x.id })
                ));
            } else {
                setBlogListId([]);
            }
        },
    };

    const deleteBlog = () => {
        if (blogListId.length > 0) {
            ApiPut(`blog/delete-blog-by-admin`, {
                id: blogListId.map((m: any) => m.id).join(","),
            }).then((res: any) => {
                getBlogListData()
                setBlogListId([])
            });
        }
    }

    const createBlog = () => {
        history.push("/blog_registration")

    }

    useEffect(() => {
        getBlogListData()
    }, [])

    return (
        <div className="pv-projectview">
            <div className="pv-project-btn">
                <div>
                    <h5 className="font-27-bold text-left">Blog</h5>
                </div>
                <div className="btn-primary-pv ml-auto">
                    <Buttons type="" ButtonStyle="dash-bg-pink btn btn-primary" onClick={createBlog}>  Create </Buttons>
                    <Buttons type="" ButtonStyle="dash-bg-pink btn btn-primary" onClick={deleteBlog}>  Delete </Buttons>
                </div>
            </div>
            <div className="pv-blog">
                <BlogList
                    data={blogdata}
                    getBlogListDataManagement={getBlogListData}
                    totalSize={totalSize}
                    selectRow={selectRow}
                />
            </div>

        </div>

    )
}

export default Blog
