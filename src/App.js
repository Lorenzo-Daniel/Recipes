import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import RecipeDetails from "./Pages/RecipesDetails/RecipeDetails";


function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route exact path="/" element={<Home />} />
      <Route exact path="/recipes-details/:name" element={<RecipeDetails />} />
    </Routes>
  </BrowserRouter>
  );
}
export default App;
