// import React from "react";
// import Lottie from "lottie-react";
// import animationData from "./assets/keUUvukJnG.json";

// const SpeakingCharacter = () => {
//   return (
//     <div className="avatar1" >
//       <Lottie animationData={animationData} loop={true} className="imagesss"/>
//     </div>
//   );
// };

// export default SpeakingCharacter;


// SpeakingCharacter.jsx
import React, { useRef, useEffect } from "react";
import Lottie from "lottie-react";
import animationData from "./assets/keUUvukJnG.json";

const SpeakingCharacter = ({ paused = false }) => {
  const lottieRef = useRef(null);

  useEffect(() => {
    if (!lottieRef.current) return;
    if (paused) lottieRef.current.pause();
    else lottieRef.current.play();
  }, [paused]);

  return (
    <div >
      <Lottie lottieRef={lottieRef} animationData={animationData} loop />
    </div>
  );
};

export default SpeakingCharacter;
