import { useState } from "react"
import "../assets/Home.css"

function Home() {
    const [type, setType] = useState([false, false])
    const [region, setRegion] = useState("")
    const [time, setTime] = useState("")
    const [recipe, setRecipe] = useState("")

    const handleType = (index: number) => {
        setType((prev) => {
            return prev.map((_, i) => i === index)
        })
    }

    const handleRegion = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRegion(event.target.value)
    }

    const handleTime = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTime(event.target.value)
    }

    const generateRecipe = async () => {
        if ((!type[0] && !type[1]) || !region || !time) {
            alert("Missing input. Make sure there are no blanks")
            return;
        }

        const newType = type[0] ? "sweet" : "salty"
        try {
            const response = await fetch("http://localhost:3000/api/recipe", {
                method: "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify({ newType, region, time })

            });

            const data = await response.json();
            setRecipe(data.recipe)
        } catch (error){
            console.log("Error found when generating recipe:", error)
        }
    }

    return (
        <div className="main">
            <h1>Recipe App</h1>
            <h3>What type of dish are you feeling?</h3>
            <div className="foodButtons">
                <button onClick={() => handleType(0)} style={{ backgroundColor: type[0] ? "gray" : "rgb(43, 39, 39)" }}>Sweet</button>
                <button onClick={() => handleType(1)} style={{ backgroundColor: type[1] ? "gray" : "rgb(43, 39, 39)" }}>Salty</button>
            </div>

            <h3>From what region?</h3>
            <select id="regions" name="regions" value={region} onChange={handleRegion}>
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
            <select id="time" name="time" value={time} onChange={handleTime}>
                <option value=""></option>
                <option value="10 minutes">10 minutes</option>
                <option value="30 minutes">30 minutes</option>
                <option value="1 hour">1 hour</option>
                <option value="2 hour">2 hours</option>
            </select>

            <button id="cookButton" onClick={generateRecipe}>Cook</button>

            <div className="generatedContent">
                {recipe && <pre>{recipe}</pre>}

            </div>

        </div>
    )

}

export default Home;