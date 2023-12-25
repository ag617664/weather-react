import React from 'react'
import { IoIosSearch } from "react-icons/io";
import { LuSun } from "react-icons/lu";
import { WiDegrees,WiHumidity} from "react-icons/wi";
import {FaCloudShowersHeavy} from "react-icons/fa"
import { BsWind } from "react-icons/bs";
import { BsCloudDrizzleFill } from "react-icons/bs";
import {useState} from 'react'
import { FaCloudSun } from "react-icons/fa6";
import { FaCloud } from "react-icons/fa6";

function App() {
  const apiKey="3704a1cb43b8351068d3691abd9e348c";
  const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
  const [city,setCity]=useState("New Delhi");
  const [a,setA]=useState(null);
  const [humid,setHumid]=useState("10%");
  const [windSpeed,setWindSpeed]=useState("10km/h")
  const [temp,setTemp]=useState("7");
  const [image,setImage]=useState(<LuSun className='w-20 h-20  '/>);

  const checkWeather=async(a)=>{
    const data=await fetch(apiUrl+a+`&appid=${apiKey}`);
    const finalData=await data.json();
    console.log(finalData);
    setCity(finalData.name);
    setHumid(finalData.main.humidity+"%");
    setWindSpeed(finalData.wind.speed+"km/h");
    setTemp(Math.round(finalData.main.temp));
    if(finalData.weather[0].main=="Clouds"){
      setImage(<FaCloud className='w-20 h-20  '/>)

  }
  else if(finalData.weather[0].main=="Clear"){
    setImage(<LuSun className='w-20 h-20  '/>);
      
  }
  else if(finalData.weather[0].main=="Rain"){
  setImage(<FaCloudShowersHeavy className='w-20 h-20  '/>)
      
  }
  else if(finalData.weather[0].main=="Drizzle"){
      setImage(<BsCloudDrizzleFill className='w-20 h-20  '/>)
      
  }
  else if(finalData.weather[0].main=="Mist"){
  setImage(<FaCloudSun className='w-20 h-20  '/>)
      
  }

  }
  const handleChange=()=>{
    checkWeather(a);
  }

  return (
    <div className='mt-24 p-0 box-border w-5/12 mx-auto p-10 bg-[linear-gradient(135deg,_#00feba,_#5b548a)] rounded-3xl'>
      <div className='m-100 flex justify-between'>
      <input type="text " placeholder="Enter city name" spellCheck="false" className='flex-1 px-2.5 py-4 rounded-3xl bg-[#ebfffc]' onChange={(e)=>setA(e.target.value)}/>
           <button onClick={handleChange}><IoIosSearch className='w-20 h-10 pointer font-white'/></button>

      </div>
      <div>
        <div className='w-20 h-20 mt-10 mx-auto'>
        {image}
        </div>
        <div className='flex mt-10 flex-col'>
          <div className='flex mx-auto text-6xl justify-center'> {temp}<WiDegrees/>c</div>
          <h1 className='text-5xl font-medium mx-auto mt-5 tracking-wider uppercase'>{city}</h1> 

        </div>
        <div className='flex justify-around mt-20'>
          <div className='flex flex-col'>
            <div className='flex justify-between'>
            <WiHumidity className='h-12 w-12 '/>
            <span className='text-2xl'>{humid}</span>

              
            </div>
            <h1 className='text-2xl'>Humidity</h1>
          </div>
          <div className='flex flex-col'>
            <div className='flex justify-between'>
            <BsWind className='h-12 w-12 '/>
            <span className='text-2xl'>{windSpeed}</span>

            

            </div>
            <h1 className='text-2xl'>Wind Speed</h1>
            
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default App
