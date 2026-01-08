import {useState} from "react"
import "../assets/Home.css"

function Home(){
    const [type, setType] = useState("")
    const [region, setRegion] = useState("")

    return(
        <div className="main">
            <h1>Recipe App</h1>
            <h3>What type of dish are you feeling?</h3>
            <div className="foodButtons">
                <button>Sweet</button>
                <button>Salty</button>
            </div>

            <h3>From what region?</h3>
            <select id="regions" name="regions">
                <option value=""></option>
                <option value="africa">Africa</option>
                <option value="americas">Americas</option>
                <option value="asia">Asia</option>
                <option value="caribbean">Caribbean</option>
                <option value="europe">Europe</option>
                <option value="middle east">Middle East</option>
                <option value="oceania">Oceania</option>
            </select>

            <h3>Cooking time?</h3>
            <select id="time" name="time">
                <option value = ""></option>
                <option value="30 minutes">30 minutes</option>
                <option value="1 hour">1 hour</option>
                <option value="2 hour">2 hours</option>
            </select>
            
            <button id="cookButton">Cook</button>

            <div className="generatedContent">

            </div>
        
        </div>
    )

}

export default Home;