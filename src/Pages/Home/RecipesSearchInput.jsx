import React,{useState,useEffect} from "react";
import hat from "../../Images/Vector/chef.png";
import { YOUR_APP_ID, apiKey } from "../../APIKEY/keys";
;
function RecipesSearchInput({setAllData}) {
  const [queryWord, setQueryWord] = useState("");
  const [keyWordIngresed, setKeyWordIngresed] = useState(false);
  const [unFoundResults, setUnFoundResults] = useState(false);
  const [btnValue, setBtnValue] = useState("Search");


  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        findRecipe(queryWord,setAllData);
      }
    };
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [queryWord,setAllData]);



  const findRecipe = async (query,setAllData) => {
    if (query === "") {
      setKeyWordIngresed(true);
      return;
    }

    try {
      setBtnValue("Searching...");
      const request = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${YOUR_APP_ID}&app_key=${apiKey}`
      );
      const response = await request.json();
      if (response.hits.length > 0) {
        sessionStorage.setItem("recipes", JSON.stringify(response.hits));
        setBtnValue("Search");
        setAllData(response.hits);
      } else {
        setUnFoundResults(true);
        setBtnValue("Search");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onInputChange = (query) => {
    if (query.length > 0) {
      setKeyWordIngresed(false);
      setUnFoundResults(false);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center mt-3">
        <img src={hat} alt="" width={300} />
      </div>

      <h1 className="text-center mt-4">Search Your Recipe</h1>
      <div className="mt-3 d-flex justify-content-center align-items-start">
        <div className="d-flex flex-column ">
          <input
            type="text"
            className="search-input"
            placeholder="Enter your search here... "
            value={queryWord}
            onChange={(e) => {
              setQueryWord(e.target.value);
              onInputChange(e.target.value);
            }}
          />
          <p className={`${keyWordIngresed ? "ms-1 text-danger" : "d-none"}`}>
            You must enter a keyword
          </p>
        </div>
        <button className="btn  ms-1" onClick={() => findRecipe(queryWord,setAllData)}>
          {btnValue}
        </button>
      </div>
      <div
        className={
          unFoundResults
            ? "d-flex flex-column  align-items-center justify-content-center mt-4 mx-5 px-5"
            : "d-none"
        }
      >
        <div className="d-flex justify-content-center px-12">
          <p className="fs-5 ">
            We did not find any results for:
            <span className="bolder ms-1 ">{queryWord}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RecipesSearchInput;
