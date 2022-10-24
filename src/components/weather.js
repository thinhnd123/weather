import { Container, Grid, Input } from "@mui/material";
import { useState} from "react";
import image1 from "../assets/images/01d.svg"
import image2 from "../assets/images/02d.svg"
import image3 from "../assets/images/03d.svg"
import image4 from "../assets/images/04d.svg"
import image9 from "../assets/images/09d.svg"
import image10 from "../assets/images/10d.svg"
import image11 from "../assets/images/11d.svg"
import image13 from "../assets/images/13d.svg"
import image50 from "../assets/images/50d.svg"
import image0 from "../assets/images/cloudy_moon.svg"
import "./weather.css"

export default function Weather() {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const getWeather = (url) => {
        fetch(url)
            .then(response => response.json())
            .then(data => { 
                console.log(data); 
                if (data.cod !== 404){
                    setData(data)
                    setPlaceHolder("Enter City Name")
                }
                else {
                    setPlaceHolder("City was not found, try again")
                }
                setInput("")
                })
        
    }
    const [data, setData] = useState()
    const [input,setInput]= useState("")
    const [placeholder,setPlaceHolder]= useState("Enter City Name")
    const handleChangeImput = (event)=>{
        setInput(event.target.value)
    }
    const handlePress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            console.log(event.target.value);
            getWeather("https://api.openweathermap.org/data/2.5/forecast/daily?q=" + event.target.value + "&units=metric&cnt=5&APPID=c10bb3bd22f90d636baa008b1529ee25")

        }

    }
    const imgOfDescription = (paramDescrip) => {
        switch (paramDescrip) {
            case "sky is clear":
                return image1;
            case "few clouds":
                return image2;
            case "scattered clouds":
                return image3;
            case "broken clouds":
                return image4;
            case "shower rain":
                return image9;
            case "rain": case "moderate rain": case "light rain":
                return image10;
            case "thunderstorm":
                return image11;
            case "snow":
                return image13;
            case "mist":
                return image50;
            default: 
                 return image1  
        }

    }

    return (
        <div className="header-contain text-center" >
            <Input
                className="input-city " placeholder={placeholder}
                onChange={handleChangeImput}
                onKeyDown={event => { handlePress(event) }}
                value = {input}
            >
            </Input>

            <Container style={{ width: "60%" }} className="today" >
                {(data === undefined || data === null) ? <>
                    <Grid container style={{ width: "980px", height: "480px", position: "" }}>
                        <Grid item xs={5} className="mt-5">
                            <img src={image0} width={"300px"} alt=""  ></img>
                        </Grid>
                        <Grid item xs={7}  >
                            <div className="init-descrip">Weather forecast</div>
                        </Grid>
                    </Grid>
                </> : <>  <div    >
                    <Grid container style={{ width: "980px", height: "480px", position: "" }}>
                        <Grid item xs={5} className="mt-5">
                            <img src={imgOfDescription(data.list[0].weather[0].description)} alt=""  width={"300px"} ></img>
                        </Grid>
                        <Grid item xs={7} className="description" >
                            <h3 >Today</h3>
                            <h1>{data.city.name}</h1>
                            <h3>temperature {parseInt((data.list[0].temp.min + data.list[0].temp.max) / 2)}°C</h3>
                            <h3>{data.list[0].weather[0].description}</h3>
                        </Grid>
                    </Grid>
                </div>
                    <div className="next-days" >
                        <Grid container justify="center" style={{ height: "180px" }} >
                            <Grid className="weather-box" >
                                <h4 className="days">{weekday[(new Date().getDay() + 1) % 7]} °C</h4>
                                <img src={imgOfDescription(data.list[1].weather[0].description)} width={"100px"} alt=""   ></img >
                                <h4 className="temp">{parseInt((data.list[1].temp.min + data.list[0].temp.max) / 2)}°C</h4>
                            </Grid>
                            <Grid className="weather-box" >
                                <h4 className="days">{weekday[(new Date().getDay() + 2) % 7]}</h4>
                                <img src={imgOfDescription(data.list[2].weather[0].description)} width={"100px"} alt=""  ></img >
                                <h4 className="temp">{parseInt((data.list[2].temp.min + data.list[0].temp.max) / 2)}°C</h4>
                            </Grid>
                            <Grid className="weather-box">
                                <h4 className="days">{weekday[(new Date().getDay() + 3) % 7]}</h4>
                                <img src={imgOfDescription(data.list[3].weather[0].description)} width={"100px"} alt="" ></img >
                                <h4 className="temp">{parseInt((data.list[3].temp.min + data.list[0].temp.max) / 2)}°C</h4>
                            </Grid>
                            <Grid className="weather-box">
                                <h4 className="days">{weekday[(new Date().getDay() + 4) % 7]}</h4>
                                <img src={imgOfDescription(data.list[4].weather[0].description)} width={"100px"} alt="" ></img >
                                <h4 className="temp">{parseInt((data.list[4].temp.min + data.list[0].temp.max) / 2)}°C</h4>
                            </Grid>
                        </Grid>
                    </div></>}

            </Container>
        </div>
    );
}