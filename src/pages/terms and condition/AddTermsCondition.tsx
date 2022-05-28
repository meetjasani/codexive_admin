import React from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router';

function AddTermsCondition() {

    const history = useHistory();

    const recentHostBtn = () => {
        history.push("/terms")

    }


    return (
        <div className="pv-blogdetali">
            <div className="pv-blog-title">
                <p> Add Terms And Condition</p>
            </div>


            <table className=" pv-dashtable mt-3 custom-table-border">
                <tr className="font-18-bold pv-title-table">
                    <th>Title</th>
                    <td> <input type="text" placeholder="Please enter title" /></td>
                </tr>
                <tr className="font-18-bold pv-title-table">
                    <th>Description </th>
                    <td><textarea className="w-100 border-0" placeholder="Please enter description" rows={5} /></td>
                </tr>

            </table>

            <div className="text-center ">

                <Button type="" className=" pv-main-btn-img btn-secondary" onClick={recentHostBtn}> Back</Button>


                <Button type="" className=" pv-main-btn-img btn-success" onClick={() => { }}> Save</Button>

                <Button type="" className="pv-main-btn-img  btn-info" onClick={() => { }}> Edit</Button>

                <Button type="" className=" pv-main-btn-img  btn-danger" onClick={() => { }}> delete</Button>

            </div>

        </div>
    )
}

export default AddTermsCondition
