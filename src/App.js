import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import RecipeDetails from "./Pages/RecipeDetails";


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
