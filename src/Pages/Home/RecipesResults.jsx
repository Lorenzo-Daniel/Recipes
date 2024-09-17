import React from "react";
import { useNavigate } from "react-router-dom";

function RecipesResults({ allData }) {
  
  const goToDetails = (name) => {
    navigate(`/recipes-details/${name}`);
  };

  const navigate = useNavigate();

  return (
    <div className="d-flex flex-wrap justify-content-center align-items-center gap-4  mt-4">
      {allData?.map((item, index) => {
        const { recipe } = item;
        if (!recipe) {
          return null;
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
  );
}

export default RecipesResults;
