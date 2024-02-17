import { useEffect } from "react";
import { metaData } from "../useMetaData/metaData";
const useMetaTags = (string) => {
  useEffect(() => {
    const updateMetaTag = () => {
      const findMetaData = metaData.find((item) => item.name === string);
      const getMetaDescription = document.querySelector(
        'meta[name="description"]'
      );
     document.title = findMetaData.title

      if (getMetaDescription) {
        getMetaDescription.content = findMetaData.description;
      }
    };
    updateMetaTag();
  }, [string]);
};

export default useMetaTags;
