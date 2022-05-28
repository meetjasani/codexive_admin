import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { ApiGet } from '../../helper/API/ApiData'
import Buttons from '../Buttons/Buttons'


function ReHostItinerary() {
    const history = useHistory();

    interface LatestSet {
        Name: string,
        NickName: string,
        TourTitle: string,
        RegDate: Date,
        Id: string,
    }

    const [tableData, setTableData] = useState<LatestSet[]>([])




    useEffect(() => {
        ApiGet('admin/hosting')
            .then((res: any) => {
                setTableData(res.data.map((x: any) => {
                    return {
                        Name: x.user.first_name + " " + x.user.last_name,
                        NickName: x.user.user_name,
                        TourTitle: x.itinerary.title,
                        RegDate: x.created_at.slice(0, 10) + " " + x.created_at.slice(11, 16),
                        Id: x.id,
                    }
                }).slice(0, 5))
            })
    }, [])


    const recentHostBtn = () => {
        history.push('/hosted-itinery')
    }



    return (

        <>
            <div className="single-direct-table">
                <div className="align-items-center d-flex">
                    <div>
                        <h5 className="font-27-bold text-left">Project Request</h5>
                    </div>
                    <div className="ml-auto">
                        <Buttons type="" ButtonStyle="dash-bg-pink" onClick={() => { recentHostBtn() }}> View More </Buttons>
                    </div>
                </div>
                <div className="p-0">
                    <div className="overflow-table">
                        <table className="dashtable mt-3 custom-table-border">
                            <tr className="font-18-bold">
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PROJECT NAME</th>
                                <th>POST DATE</th>
                                <th>EMAIL ID</th>
                                <th>Action</th>
                            </tr>





                            <tr className="font-16-bold" >
                                <td>1</td>
                                <td >Pooja</td>
                                <td>Codexive Project</td>
                                <td>13-12-2021</td>
                                <td>pooja@gmail.com</td>
                                <td className="pv-view">View</td>
                            </tr>
                            <tr className="font-16-bold" >
                                <td>1</td>
                                <td >Pooja</td>
                                <td>Codexive Project</td>
                                <td>13-12-2021</td>
                                <td>pooja@gmail.com</td>
                                <td className="pv-view">View</td>
                            </tr>
                            <tr className="font-16-bold" >
                                <td>1</td>
                                <td >Pooja</td>
                                <td>Codexive Project</td>
                                <td>13-12-2021</td>
                                <td>pooja@gmail.com</td>
                                <td className="pv-view">View</td>
                            </tr>



                        </table>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ReHostItinerary
