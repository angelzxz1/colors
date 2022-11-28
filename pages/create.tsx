import { generateColorScheme2 } from "../lib/colorGenerator";
import React from "react";
const Home = () => {
    const [colors, setColors] = React.useState<any>(null);
    const [value, setValue] = React.useState<string>("");

    return (
        <div>
            <input
                type="text"
                value={value}
                onChange={(event) => {
                    setValue(event.target.value);
                }}
            />
            <button
                onClick={() => {
                    setColors(generateColorScheme2(value));
                }}
            >
                Generate
            </button>
            {colors ? (
                <div>
                    {colors.map((color: any) => {
                        return (
                            <div
                                key={color.name}
                                style={{
                                    display: "flex",
                                    width: "100%",
                                    justifyContent: "space-evenly",
                                    marginTop: "10px",
                                }}
                            >
                                {Object.entries(color.colors).map(
                                    (subColor: any) => {
                                        const [intensity, hex] = subColor;
                                        return (
                                            <div
                                                key={intensity}
                                                style={{
                                                    backgroundColor: hex,
                                                    width: "100px",
                                                    height: "100px",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    color: "white",
                                                }}
                                            >
                                                {intensity}
                                                <br />
                                                {hex}
                                                <br />
                                                {color.name}
                                                <br />
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default Home;
