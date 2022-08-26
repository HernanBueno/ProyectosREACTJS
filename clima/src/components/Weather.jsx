
import { useState , useEffect} from "react"
import WeatherForm from "./WeatherForm"
import WeatherMainInfo from "./WeatherMainInfo"
import styles from './weather.module.css'
import Loading from "./Loading"

export default function Weather() {

    const [weather, setWeather] = useState(null)
        useEffect(()=>{
        loadInfo()
        }, [])
        useEffect(()=>{
            document.title = `Clima | ${weather?.location.name}`
        }, [weather])
    async function loadInfo(city = 'Buenos Aires') {
        try {
            const req = await fetch(`${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`)
            const json = await req.json()
            setWeather(json)
        } catch (error) {
            
        }
    }
    function handleChangeCity(city){

        setWeather(null);
        loadInfo(city)
    }
    return <div className={styles.weatherContainer}>
       <WeatherForm onChangeCity={handleChangeCity}/>
       {weather ? <WeatherMainInfo weather={weather}/> : <Loading/>}
      
    </div>
}