import React, { useEffect, useState } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { BiErrorCircle } from "react-icons/bi";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "antd/dist/reset.css";
import { Divider } from "antd";
import "./style.css";
import Select from "react-select";
import { useSearchParams } from "react-router-dom";
import { getCityNameOptions } from "./utils/helper";

function Home() {
    const navigate = useNavigate();
    const options = getCityNameOptions();

    const [searchParams, setSearchParams] = useSearchParams();
    const [value, setValue] = useState("");
    const [errorMessage, setErrorMessage] = useState();

    const moveToWeatherPage = () => {
        setErrorMessage(null);
        navigate("/weather/" + value.value);
    };

    useEffect(() => {
        const error = searchParams.get("error");
        setErrorMessage(error);
    }, [searchParams]);

    return (
        <div className="jumbotron vertical-center">
            <div className="weather container">
                <h6 className="heading">Weather App</h6>
                <Divider
                    style={{
                        borderColor: "lightgrey",
                        marginTop: "5px",
                        marginBottom: "15px",
                    }}
                />
                <form onSubmit={moveToWeatherPage}>
                    <div className="search container">
                        <div class="row">
                            <div class="col">
                                <Select
                                    placeholder="Enter city name"
                                    aria-label="Enter city name"
                                    label="Enter city name"
                                    getOptionLabel={(option) => option.label}
                                    getOptionValue={(option) => option.value}
                                    autoFocus
                                    options={options}
                                    value={value}
                                    onChange={(newValue) => {
                                        setErrorMessage(null);
                                        setValue(newValue);
                                    }}
                                />
                            </div>
                            <div onClick={moveToWeatherPage} class="col-2 btn btn-primary ">
                                <FaArrowAltCircleRight fontSize={26} className="text-center" />
                            </div>
                            {errorMessage && (
                                <div class="row m-1 p-0 ">
                                    <div class="text-red" role="alert">
                                        <BiErrorCircle />
                                        {errorMessage}
                                    </div>
                                </div>
                            )}
                        </div>

                        <Divider
                            style={{
                                marginTop: "5px",
                                marginBottom: "5px",
                                color: "gray",
                                borderColor: "gray",
                            }}
                        >
                            or
                        </Divider>
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={() => {
                                            navigate("/weather");
                                        }}
                                    >
                                        Get Device Location
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Home;
