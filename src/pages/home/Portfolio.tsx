import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import { toast } from 'react-toastify';

const Portfolio = () => {
    const [portfolioData, setportfolioData] = useState({
        title: "",
        description: ""
    })

    const getDataById = () => {
        ApiGet(`homePortfolio/get-home-portfolio`)
            .then((res: any) => {
                if (res.data.length == 0) {
                    setportfolioData({
                        title: "",
                        description: ""
                    })
                } else {
                    setportfolioData({
                        title: res.data.title,
                        description: res.data.description
                    })
                }
            })
    }

    useEffect(() => {
        getDataById()
    }, [])

    const handleSave = () => {
        ApiPost(`homePortfolio/add-home-portfolio`, portfolioData)
            .then((response: any) => {
                toast.success("Success!")
            }).catch((error: any) => {
                toast.error("Fail!")
            });
    }
    return (
        <div>
            <div className="pv-blogdetali">
                <div className="pv-blog-title">
                    <p>HomePage Portfolio</p>
                </div>


                <table className=" pv-dashtable mt-3 custom-table-border">

                    <tr className="font-18-bold pv-title-table">
                        <th>title</th>
                        <td> <input type="text" placeholder="Please enter title" name="title" value={portfolioData.title} onChange={(e) => setportfolioData({ ...portfolioData, title: e.target.value })} /></td>
                    </tr>

                    <tr className="font-18-bold pv-title-table">
                        <th>Description</th>
                        <td > <input type="text" placeholder="Please enter description" name="description" value={portfolioData.description} onChange={(e) => setportfolioData({ ...portfolioData, description: e.target.value })} /></td>
                    </tr>

                </table>



                <div className="text-center ">

                    <Button type="" className=" pv-main-btn-img btn-secondary" onClick={handleSave} >Save</Button>

                </div>

            </div>
        </div>
    )
}

export default Portfolio
