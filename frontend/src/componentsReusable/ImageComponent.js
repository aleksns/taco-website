import { useEffect, useState } from "react";
import placeholder from "../images/placeholder.png";

export default function ImageComponent(props) {
  const { original, alt, styles } = props;

  const [currentImg, setCurrentImg] = useState(placeholder);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const imgToLoad = new Image();
    imgToLoad.src = original;

    const loadImage = new Promise((resolve) => resolve(imgToLoad.onload));

    async function setImage() {
      try {
        await loadImage;
        setIsLoading(false);
        setCurrentImg(original);
      } catch (error) {
        console.log(error);
      }
    }

    setImage();
  }, [original]);

  return (
    <img
      className={styles}
      src={currentImg}
      alt={alt}
    />
  );
}
