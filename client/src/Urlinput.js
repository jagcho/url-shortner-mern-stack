import React, { useState } from 'react'

function Urlinput({ setInputValue1 }) {


  const [value, setValue] = useState("");



  const handleClick = () => {
    setInputValue1(value);
    setValue('');
  }



  return (
    <div className='inputContainer'>
      <h1>Redirect <span>here</span></h1>
      <div>
        <input type="text" placeholder='Paste urlcode here'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></input>
        <button onClick={handleClick}>Go</button>
      </div>
    </div>
  )
}

export default Urlinput