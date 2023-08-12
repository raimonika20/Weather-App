import React, { useEffect, useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "antd/dist/reset.css";
import { Divider } from "antd";
import "./style.css";
import { useSearchParams } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const [value, setValue] = useState("");
    const [errorMessage, setErrorMessage] = useState();

    const moveToWeatherPage = () => {
        setErrorMessage(null);
        navigate("/weather/" + value);
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
                                <input
                                    type="text"
                                    class="form-control text-center"
                                    placeholder="Enter city name"
                                    aria-label="Enter city name"
                                    label="Enter city name"
                                    autoFocus
                                    value={value}
                                    onChange={(newValue) => {
                                        setErrorMessage(null);
                                        setValue(newValue.target.value);
                                    }}
                                />
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
