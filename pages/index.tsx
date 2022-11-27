import colors from "../lib/colors";
import { useEffect, useState } from "react";
import Color from "../components/Color";
const Home = () => {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {}, []);
  return (
    <div>
      {loaded ? (
        <div>Loading...</div>
      ) : (
        Object.entries(colors).map((color, i) => {
          return (
            <div
              key={i}
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-evenly",
                marginTop: "10px",
              }}
            >
              {Object.entries(color[1]).map((subColor) => {
                const [intensity, hex] = subColor;
                return (
                  <Color intensity={intensity} hex={hex} color={color[0]} />
                );
              })}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Home;
