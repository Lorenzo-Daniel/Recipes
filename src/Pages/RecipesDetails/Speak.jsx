import { useState } from "react"

const  Speak =({ingredients})=> {
  const [isPlaying, setIsPlaying] = useState(false); // Estado para controlar la reproducción de audio
  const [isFinished, setIsFinished] = useState(false); // Estado para indicar si la reproducción ha terminado
  // eslint-disable-next-line
  let currentSpeech = null; // Variable para almacenar la instancia actual de SpeechSynthesisUtterance|
  const speak = (ingredients,isPLaying ) => {
    if (!isPlaying) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = `The ingredients needed for this recipe are: ${ingredients}`;
      speech.lang = "en-US";
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(speech);
      currentSpeech = speech; // Almacena la instancia actual de SpeechSynthesisUtterance
      setIsPlaying(true); // Actualiza el estado para indicar que el audio está reproduciéndose
      setIsFinished(false); // Reinicia el estado para indicar que la reproducción no ha terminado
      speech.onend = () => {
        setIsFinished(true); // Actualiza el estado para indicar que la reproducción ha terminado
        setIsPlaying(false); // Actualiza el estado para indicar que la reproducción ha terminado
      };
    } else {
      window.speechSynthesis.cancel(); // Cancela la síntesis de voz actual
      currentSpeech = null; // Limpia la variable currentSpeech
      setIsPlaying(false); // Actualiza el estado para indicar que el audio se detuvo
    }
  };
  
    return (
      <div className="d-flex mt-3 mb-3" style={{ height: "80px" }}>
      <div className="d-flex align-items-center ">
        <button
          onClick={() => speak(ingredients.join(", "))}
          className="btn"
        >
          <i className={`fa-solid ${isPlaying ? "fa-stop" : "fa-play"}`} />
        </button>
        <span className={isPlaying ? "d-none" : "display-block ms-3"}>
          Play the ingredients list
        </span>
      </div>
      <div className="ms-3">
        <iframe
          src="https://giphy.com/embed/RK9E0eC8LvDmI3QddR"
          width="80"
          height="80"
          allowFullScreen
          className={
            isFinished || !isPlaying ? "d-none  " : "d-block rounded-5"
          }
          title="Animated Gif"
        ></iframe>
      </div>
    </div>
    );
  }

export default Speak
