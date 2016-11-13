import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "content": {
        "display": "flex",
        "position": "relative",
        "paddingTop": 10,
        "paddingRight": 10,
        "paddingBottom": 10,
        "paddingLeft": 10,
        "flexDirection": "column",
        "overflowY": "auto",
        "justifyContent": "space-around",
        "overflowX": "hidden",
        "flexGrow": 1
    },
    "smallCardContainer": {
        "display": "flex",
        "flexDirection": "row",
        "flexFlow": "row wrap",
        "justifyContent": "space-around"
    },
    "largeCardContainer": {
        "display": "flex",
        "flexDirection": "row",
        "flexFlow": "row wrap",
        "justifyContent": "space-around"
    },
    "smallCard": {
        "flex": 1,
        "height": 200,
        "minWidth": 200,
        "maxWidth": 350,
        "paddingTop": 5,
        "paddingRight": 5,
        "paddingBottom": 5,
        "paddingLeft": 5
    },
    "largeCard": {
        "flex": 1,
        "minWidth": 250,
        "height": 400,
        "paddingTop": 5,
        "paddingRight": 5,
        "paddingBottom": 5,
        "paddingLeft": 5
    }
});