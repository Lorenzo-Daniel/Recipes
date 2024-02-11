import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
function App() {
  const getLS = JSON.parse(sessionStorage.getItem("recetas"));
  console.log(getLS);
  // const findReceta = async () => {
  //   const apiKey = "014c4d7b59dde12e0f6b485485b90944	";
  //   const YOUR_APP_ID = "8aa753b0";
  //   const query = "chicken";
  //   try {
  //     const request = await fetch(
  //       `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${apiKey}`
  //     );
  //     const response = await request.json();
  //     sessionStorage.setItem("recetas", JSON.stringify(response.hits));
  //     console.log(response.hits);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // findReceta();
  return (
    // <div>
    //   app
    // </div>
    <div className="d-flex flex-wrap justify-content-center align-items-center gap-4 m-auto mt-5">
      {getLS?.map((item, index) => {
        const { recipe } = item; // Desestructuración específica de la propiedad 'recipe' del elemento 'item'
        if (!recipe) {
          return null; // Manejar el caso en el que 'recipe' no esté presente en los datos
        }

        const { image,  label, cuisineType } =
          recipe;
        return (
          <div
            key={index}
            className="d-flex flex-column align-items-center  border rounded-2 "
          >
            <img src={image} width="250px" alt="" />
            <p>{label}</p>
            <p>cuisine type : {cuisineType}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;

