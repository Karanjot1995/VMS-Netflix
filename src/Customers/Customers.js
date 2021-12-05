import React, { useState, useEffect } from "react";
import ListItem from "../common/ListItem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

function Customers () {  
    const [customers, setCustomers] = useState({})
    const [startDate, setStartDate] = useState(new Date());
    const [year, setYear] = useState(new Date());


    useEffect(async () => {
        fetch('/all-customers').then(res => res.json()).then(data=>setCustomers(data.customers))
    },[]);

    let AllCustomers = customers!={}? customers.rows : [];

    function handleSubmit(e) {
        e.preventDefault();
        // const data = new FormData(event.target);
        // let elem = e.target
        let customerid = document.getElementById('custid').value
        let fname = document.getElementById('fname').value
        let lanme = document.getElementById('lname').value
        let emaail = document.getElementById('email').value
        let phoneno = document.getElementById('phone').value
        let userpassword = document.getElementById('pass').value
        let dob = document.getElementById('dob').value
        let cardno = document.getElementById('card').value
        let expirydate = document.getElementById('exp').value
        let cvv = document.getElementById('cvv').value

        let data = {customerid, fname,lanme,emaail,phoneno,userpassword,dob,cardno,expirydate,cvv}

        console.log(data); // reference by form input's `name` tag

        fetch('/add-customer', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(d=>console.log(Object.values(d)));
        fetch('/all-customers').then(res => res.json()).then(data=>setCustomers(data.customers))

    }

    return (
        <div className="" id="customers">
            <div className="section d-flex">
               
                <div className="customer-form text-center">
                    <h2 className="">Add New Customer</h2>
                    <form className="d-flex flex-column" id="user-form" onSubmit={handleSubmit}>
                        <div>
                            <label>Customer ID</label>
                            <input id="custid" type="number" required/>
                        </div>
                        <div>
                            <label>First Name</label>
                            <input id="fname"/>
                        </div>
                        <div>
                            <label>Last Name</label>
                            <input id="lname"/>
                        </div>
                        <div>
                            <label>Date of Birth</label>
                            <DatePicker id="dob" dateFormat="yyyy/MM/dd" selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div>
                        <div>
                            <label>Email</label>
                            <input id="email"/>
                        </div>
                        <div>
                            <label>Password</label>
                            <input id="pass"/>
                        </div>
                        <div>
                            <label>Phone Number</label>
                            <input type="number" id="phone"/>
                        </div>
                        <div>
                            <label>Card No</label>
                            <input type="number" id="card"/>
                        </div>
                        <div>
                            <label>Cvv</label>
                            <input type="number" id="cvv"/>
                        </div>
                        <div>
                            <label>Expiry Year</label>
                            <DatePicker id="exp" showYearPicker dateFormat="yyyy" selected={year} onChange={(date) => setYear(date)} />
                            {/* <input type="number" id="exp"/> */}
                        </div>
                        <button className="btn btn-warning">Submit</button>
                    </form>

                </div>

                {AllCustomers ? 
                    <div className="all-customers text-center">
                        <h2>All Customers</h2>
                        <div className="scroll-cust">
                            <div className="customer-list">
                                <table>
                                    <tr>
                                        <th>Customer ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Date of Birth</th>
                                        <th>Email</th>
                                        <th>Password</th>
                                        <th>Phone Number</th>
                                        <th>Card Number</th>
                                        <th>CVV</th>
                                        <th>Expiry</th>
                                    </tr>
                                    {AllCustomers.map((cust)=>
                                        <tr>
                                            <td>{cust['CUSTOMERID']}</td>
                                            <td>{cust['FNAME']}</td>
                                            <td>{cust['LANME']}</td>
                                            <td>{cust['DOB']}</td>
                                            <td>{cust['EMAAIL']}</td>
                                            <td>{cust['USERPASSWORD']}</td>
                                            <td>{cust['PHONENO']}</td>
                                            <td>{cust['CARDNO']}</td>
                                            <td>{cust['CVV']}</td>
                                            <td>{cust['EXPIRYDATE']}</td>
                                        </tr>
                                    )}
                                </table>
                            </div>
                        </div>
                    </div>
                :''}


            </div>
            
            
        </div>
    );
}

export default Customers;


