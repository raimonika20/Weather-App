import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import 'antd/dist/reset.css'
import { Divider } from 'antd';

import './style.css';
import Weather from './Weather';

function Home() {

    const navigate = useNavigate();
    const [name, setName] = useState('');



    return (
        <div className='container' >
            <div className='weather'>
                <h6 className='heading'>Weather app</h6>
                <Divider style={{ borderColor: "lightgrey" }} />
                <div className='search'>
                    <input type="text" className='form-control' placeholder="Enter city name" onChange={e => setName(e.target.value)} />
                    <Divider style={{ color: 'lightgrey', borderColor: "lightgrey" }}>or</Divider>

                    <button className='btn btn-primary' type='button' onClick={() => navigate("/Weather")} > Get Device Location</button>


                </div>

            </div>

        </div>
    )
}

export default Home
