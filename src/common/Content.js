import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";


function Content (props) {
    const { id } = useParams();
    // let navigate = useNavigate();
    const [content, setContent] = useState({});
    const [btn, setBtn] = useState('Edit')


    function handleChange(e){
        // e.preventDefault()
        // let elem = document.getElementById('view-content')
        // let inp = elem.getElementsByTagName('input');
        // if(btn == 'Edit'){
        //     for(let el of inp){
        //         if(el.id != 'dor') el.disabled = false;
        //     }
        //     setBtn('Save')
        // }else{
        //     let data = [id]
        //     for(let el of inp){
        //         data.push(el.value)
        //         el.disabled = true;
        //     }
        //     fetch(`/edit-content/${id}`, {
        //         method: "POST",
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({data})
        //     }).then(res => res.json()).then(data=>setContent(data.data.rows));
        //     setBtn('Edit')
        // }

    }
    // function navigateBack(){
    //     navigate("/home", { replace: true });
    // }

    useEffect(async () => {
     fetch(`${BASE_API_URL}/api/content/${id}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id})
        }).then(res => res.json()).then(data=>setContent(data));
    },[]);

    if(content && content[0]){
        return(
            <div id="view-content" className="pt-50">
                <div className='text-center'>
                    {/* <a className="back-btn" onClick={navigateBack}><FaArrowLeft/></a> */}
                    {/* <form className="edit-content d-flex flex-column">
                        <div className="d-flex justify-content-between pt-3">
                            <p>Title:</p>
                            <input defaultValue={content[0]['CONTENTNAME']} disabled/>
                        </div>
                        <div className="d-flex justify-content-between pt-3">
                            <p>Length:</p>
                            <input defaultValue={content[0]['CONTENTLENGTH']} disabled/>
                        </div>
                        <div className="d-flex justify-content-between pt-3">
                            <p>Rating:</p>
                            <input defaultValue={content[0]['AVERAGERATING']} type="number" disabled/>
                        </div>
                        <div className="d-flex justify-content-between pt-3 pb-3" disabled>
                            <p>Date of Release:</p>
                            <input id="dor" defaultValue={content[0]['DATE_OF_RELEASE']} disabled/>
                        </div>
                        <button className="btn btn-warning" id="edit-save" onClick={handleChange}>{btn}</button>
                    </form> */}
                    {/* <p><input defaultValue={content[0]['CONTENTNAME']}/></p> */}
                    <iframe className="iframe-video"
                    src={content[0]['VideoData']}>
                    </iframe>
                </div>
            </div>
        )
    }else{
        return <div className="text-center pt-100 text-light">Loading...</div>
    }
 

}

export default Content;