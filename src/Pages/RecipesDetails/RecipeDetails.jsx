import React from "react";
import { Link, useParams } from "react-router-dom";
import Speak from "./Speak";
import useMetaTags from '../../Hooks/useMetaData/useMetaTags'
function RecipeDetails() {
  useMetaTags('recipesDescription')
  const { name } = useParams();
  const getSS = JSON.parse(sessionStorage.getItem("recipes"));
  const findObj = getSS.find((element) => element.recipe.label === name);
  const datos = findObj.recipe;
  const { image, label, ingredientLines,url} = datos;

  return (
    <div className="d-flex flex-column px-4 mb-5 mt-3 col-lg-10 col-xl-7 m-auto">
      <h1 className="text-center mb-5">{label}</h1>
      <div
        className=" recipe-details-img"
        style={{ backgroundImage: `url(${image})` }}
      />
      <Speak ingredients={ingredientLines} />
      <ul>
        {ingredientLines.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
      <Link to={"/"} className="btn col-md-5 col-lg-4 col-xl-3">
        BACK
      </Link>
      <a href={url} className="mt-2 nav-link" target="_blanck" rel="no-referrer">Go To Original Source</a>
    </div>
  );
}

export default RecipeDetails;
