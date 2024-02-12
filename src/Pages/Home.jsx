import { useState } from "react";
import hat from "../Images/Vector/cheffHat.JPG";
import { useNavigate } from "react-router-dom";
// import { data } from "../data/data";

function Home() {
  const [allData, setAllData] = useState(JSON.parse(sessionStorage.getItem('recipes') ));
  const [queryWord, setQueryWord] = useState();
  console.log(allData);
  const navigate = useNavigate();

  const goToDetails = (name) => {
    navigate(`/recipes-details/${name}`);
  };
  const findRecipe = async (query) => {
    const apiKey = "014c4d7b59dde12e0f6b485485b90944	";
    const YOUR_APP_ID = "8aa753b0";
    try {
      const request = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${YOUR_APP_ID}&app_key=${apiKey}`
      );
      const response = await request.json();
      sessionStorage.setItem("recipes", JSON.stringify(response.hits));
      setAllData(response.hits);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-center mt-3">
        <img src={hat} alt="" width={300} />
      </div>
      <h1 className="text-center mt-4">SEARCH YOUR RECIPE</h1>
      <div className="ms-4"></div>
      <div className="mt-3 d-flex justify-content-center align-items-center">
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your text here... "
            onInput={(e) => setQueryWord(e.target.value)}
          />
        </div>
        <button
          className="btn  btn-primary"
          onClick={() => findRecipe(queryWord)}
        >
          Search
        </button>
      </div>
      <div className="d-flex  flex-wrap justify-content-center align-items-center gap-4 m-auto mt-5">
        {allData?.map((item, index) => {
          const { recipe } = item; // Desestructuración específica de la propiedad 'recipe' del elemento 'item'
          if (!recipe) {
            return null; // Manejar el caso en el que 'recipe' no esté presente en los datos
          }

          const { image, label, cuisineType,calories } = recipe;
          return (
            <div
              key={index}
              className="d-flex flex-column align-items-center  border rounded-2  "
            >
              <img src={image}  alt="" />
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
  );
}

export default Home;
