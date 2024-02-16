import { useEffect, useState } from "react";
import hat from "../Images/Vector/chef.JPG";
import { useNavigate } from "react-router-dom";
import { apiKey, YOUR_APP_ID } from "../API KEY/keys";

function Home() {
  const [allData, setAllData] = useState(
    JSON.parse(sessionStorage.getItem("recipes"))
  );
  const [queryWord, setQueryWord] = useState("");
  const [keyWordIngresed, setKeyWordIngresed] = useState(false);
  const [unFoundResults, setUnFoundResults] = useState(false);
  const [btnValue,setBtnValue]= useState('Search')
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        findRecipe(queryWord);
      }
    };
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [queryWord]);

  const goToDetails = (name) => {
    navigate(`/recipes-details/${name}`);
  };

  const findRecipe = async (query) => {
    if (query === "") {
      setKeyWordIngresed(true);
      return;
    }

    try {
      setBtnValue('Searching...')
      const request = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${YOUR_APP_ID}&app_key=${apiKey}`
      );
      const response = await request.json();
      if (response.hits.length > 0) {
        sessionStorage.setItem("recipes", JSON.stringify(response.hits));
        setBtnValue('Search')
        setAllData(response.hits);
      } else {
        setUnFoundResults(true);
        setBtnValue('Search')
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
    <div className="col-lg-10 m-auto">
      <div className="d-flex flex-column ">
        <div className="d-flex justify-content-center mt-3">
          <img src={hat} alt="" width={300} />
        </div>
        <h1 className="text-center mt-4">Search Your Recipe</h1>
        <div className="mt-3 d-flex justify-content-center align-items-start">
          <div className="d-flex flex-column ">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your text here... "
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
          <button className="btn  ms-1" onClick={() => findRecipe(queryWord)}>
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

        <div className="d-flex flex-wrap justify-content-center align-items-center gap-4  mt-4">
          {allData?.map((item, index) => {
            const { recipe } = item; // Desestructuración específica de la propiedad 'recipe' del elemento 'item'
            if (!recipe) {
              return null; // Manejar el caso en el que 'recipe' no esté presente en los datos
            }

            const { image, label, cuisineType, calories } = recipe;
            return (
              <div
                key={index}
                className="d-flex flex-column align-items-center  border rounded-2  col-10 col-sm-8 col-md-5 col-lg-3 "
              >
                <img src={image} alt={label} width={"100%"} />
                <div className="d-flex flex-column align-items-center p-4">
                  <p>{label}</p>
                  <p>Cuisine Type : {cuisineType}</p>
                  <p>Calories : {Math.round(calories)}</p>

                  <button className="btn" onClick={() => goToDetails(label)}>
                    Go To Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
