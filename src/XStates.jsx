import { useEffect, useState } from "react"

export default function XStates(){

    const[country, setCountry] = useState([]);
    const [value1, setValue1] = useState();
    const [value2, setValue2] = useState();
    const [value3, setValue3] = useState();
    const[state, setState] = useState([]);
    const[city, setCity] = useState([]);

    useEffect(()=>{
        const fetchCountryData = async ()=>{
            try {
                const data = await fetch("https://location-selector.labs.crio.do/countries");
                const finalData = await data.json();
                console.log({finalData})
                setCountry(finalData);
            } catch (error) {
                console.error("Error fetching Countries", error)                
            }
        }
        fetchCountryData();
    }, [])

     useEffect(()=>{
        if(!value1) return
        const fetchStateData = async ()=>{
            try {
                const data = await fetch(`https://location-selector.labs.crio.do/country=${value1}/states`);
                const finalData = await data.json();
                console.log({finalData})
                setState(finalData);
            } catch (error) {
                console.error("Error fetching States", error) 
            }
        }
        fetchStateData();
    }, [value1])
    
     useEffect(()=>{
        if(!value2) return
        const fetchCityData = async ()=>{
            const data = await fetch(`https://location-selector.labs.crio.do/country=${value1}/state=${value2}/cities`);
            const finalData = await data.json();
            console.log({finalData})
            setCity(finalData);
        }
        fetchCityData();
    }, [value2])

    console.log({country})

    const handler1 = (e)=>{
        setValue1(e.target.value)
    }

    const handler2 = (e)=>{
        setValue2(e.target.value)
    }

    const handler3 = (e)=>{
        setValue3(e.target.value)
    }

    console.log(value1)
    
    return(
        <>
        <h1>Select Location</h1>
        <div >
            <select style={{marginRight: "10px"}} onChange={handler1} value={value1}>
                <option>--Select Country--</option>
                {country.map((country_name)=>(
                    <option key={country_name} value={country_name} >{country_name}</option>
                ))}
            </select>
            <select style={{marginRight: "10px"}} onChange={handler2} value={value2} disabled={!value1}>
                <option>Select State</option>
                {state.map((state_name)=>(
                    <option key={state_name} value={state_name} >{state_name}</option>
                ))}
            </select>
            <select onChange={handler3} value={value3} disabled={!value2}>
                <option>Select City</option>
                {city.map((city_name)=>(
                    <option key={city_name} value={city_name} >{city_name}</option>
                ))}
            </select>
        </div>
        {value1 && value2 && value3 && (<h4>You selected {value1}, {value2}, {value3}</h4>)}
        </>
    )
}