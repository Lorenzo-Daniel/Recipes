import { useState } from "react";
import useMetaTags from "../../Hooks/useMetaData/useMetaTags";
import RecipesResults from "./RecipesResults";
import RecipesSearchInput from "./RecipesSearchInput";

function Home() {
  useMetaTags('home')
  const [allData, setAllData] = useState(
    (JSON.parse(sessionStorage.getItem("recipes")) || [])
  );

  return (
    <div className=" d-flex flex-column ol-lg-10 m-auto">
        <RecipesSearchInput setAllData={setAllData} />
        <RecipesResults allData={allData} />
    </div>
  );
}

export default Home;
