import React, { useEffect, useState } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { BiErrorCircle } from "react-icons/bi";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "antd/dist/reset.css";
import { Divider } from "antd";
import "./style.css";
import { City } from "country-state-city";
import Select from "react-select";
import { useSearchParams } from "react-router-dom";

function Home() {
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const error = searchParams.get("error");
        setErrorMessage(error);
    }, [searchParams]);

    const navigate = useNavigate();
    const [value, setValue] = useState("");
    const [errorMessage, setErrorMessage] = useState();
    const states = ["RJ", "MH", "GJ", "MP", "UP"];
    const cities = states
        .map((state) => City.getCitiesOfState("IN", state))
        .flat();
    const options = cities.map((city) => ({
        value: city.name,
        label: city.name,
    }));

    const moveToWeatherPage = () => {
        setErrorMessage(null);
        navigate("/weather/" + value.value);
    };

    return (
        <div className="jumbotron vertical-center">
            <div className="weather container">
                <h6 className="heading">Weather app</h6>
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
                                color: "lightgrey",
                                borderColor: "lightgrey",
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
