import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Content () {
    const { id } = useParams();
    const [content, setContent] = useState({});
    const [btn, setBtn] = useState('Edit')

    function handleChange(e){
        e.preventDefault()
        let elem = document.getElementById('view-content')
        let inp = elem.getElementsByTagName('input');
        if(btn == 'Edit'){
            for(let el of inp){
                if(el.id != 'dor') el.disabled = false;
            }
            setBtn('Save')
        }else{
            let data = [id]
            for(let el of inp){
                data.push(el.value)
                el.disabled = true;
            }
            fetch(`/edit-content/${id}`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({data})
            }).then(res => res.json()).then(data=>setContent(data.data.rows));
            setBtn('Edit')
        }

    }

    useEffect(async () => {
     fetch(`/content/${id}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id})
        }).then(res => res.json()).then(data=>setContent(data.rows));
    },[]);

    console.log(content)

    if(content && content[0]){
        return(
            <div id="view-content" className="pt-50">
                <div className='pt-50 text-center'>
                    <form className="edit-content d-flex flex-column">
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
                    </form>
                    {/* <p><input defaultValue={content[0]['CONTENTNAME']}/></p> */}
                </div>
            </div>
        )
    }else{
        return <div className="text-center pt-100 text-light">Loading...</div>
    }
 

}

export default Content;