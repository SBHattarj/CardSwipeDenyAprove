import React from "react";
import CardStack from "./src/components/CardStack";
import { Dimensions, View } from "react-native";

const colors = Object.freeze([
    "#91cef0",
    "#7fe8ba",
    "#fbd78d",
    "#cb8762",
    "#b95c64",
] as const);

function App(): React.JSX.Element {
    const cards = React.useMemo(() => {
        return [...colors, ...colors, ...colors].map((color, index) => ({
            color,
            id: index,
        }));
    }, []);
    return (
        <View style={{ height: 1000, position: "relative" }}>
            <CardStack
                parentWidth={Dimensions.get("window").width}
                card={{
                    width: 163 * 1.5,
                    height: 250 * 1.5,
                    x: Dimensions.get("window").width / 2 - 81.5 * 1.5,
                    y: Dimensions.get("window").height / 2 - 125 * 1.5 - 50,
                }}
                cards={cards}
            />
        </View>
    );
}

export default App;
