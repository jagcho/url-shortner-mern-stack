
import { useState } from 'react';
import './App.css';
import BackgroundAnimate from './BackgroundAnimate';
import InputShortner from './InputShortner';
import LinkResult from './LinkResult';
import RedirectLink from './RedirectLink';
import Urlinput from './Urlinput';

function App() {

  const [inputValue,setInputValue]=useState('')
  const [inputValue1,setInputValue1]=useState('')

  return (
    <div className="App">
     <InputShortner setInputValue={setInputValue} />
     <BackgroundAnimate/>
     <LinkResult inputValue={inputValue}/>
     <Urlinput setInputValue1={setInputValue1}/>
     <RedirectLink inputValue1={inputValue1}/>
    </div>
  );
}

export default App;
