import React from "react";

export default function Meme() {

    const [meme , setMeme] = React.useState({
        topText : "",
        bottomText : "",
        url : "http://i.imgflip.com/1bij.jpg"
    })

    function handleChange(event){
        setMeme(prevVal => ({
            ...prevVal , 
            [event.target.name] : event.target.value
        }))
        
    }
    const [allMemes , setAllMemes] = React.useState("")

    function getMeme(){
        const rand = Math.floor(Math.random() * allMemes.length)
        setMeme(prevVal => ({
            ...prevVal, 
            url:allMemes[rand].url
        }))

    }

    
    React.useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    } , [])
  return (
    <main>
      <div className="form">
      <label>Top Text : </label>
        <input
          type="text"
          placeholder=" Me when someone asks"
          className="form-input"
          name="topText"
          onChange = {handleChange}
          value = {meme.topText}
       
        />
        <label>Bottom Text : </label>
        <input
          type="text"
          placeholder=" how much marks did you score"
          className="form-input"
          name="bottomText"
          onChange = {handleChange}
          value = {meme.bottomText}
        
        />
        <button 
            className="form-button"
            onClick = {getMeme}
        >
        Get Meme Image
      </button>

      </div>
      
      <div className="meme">
        <img  className="meme--image" src = {meme.url}/>
        <h2 className="meme--text top"> {meme.topText}</h2>
        <h2 className="meme--text bottom"> {meme.bottomText}</h2>
      </div>
    </main>
  );
}
