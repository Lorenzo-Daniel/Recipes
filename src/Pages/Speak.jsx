import React from 'react'

const  Speak =()=> {
    const text = 'Hola, bienvenido a mi aplicación de React.';
  
    return (
      <div>
        <SpeakButton text={text} />
      </div>
    );
  }

export default Speak
