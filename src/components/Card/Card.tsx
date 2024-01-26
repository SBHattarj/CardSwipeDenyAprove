import React from "react";
import { ViewStyle, PanResponder, Animated } from "react-native";
import { CardProps } from "./Card.type";
import Cross from "../../assets/svgs/Cross.svg";
import Check from "../../assets/svgs/Check.svg";

export default function Card({
    x,
    y,
    width,
    height,
    parentWidth,
    prevTranslateX: prevTranslateXMaybe,
    prevTranslateY: prevTranslateYMaybe,
    translateXRef,
    translateYRef,
    color,
    active = true,
    zIndex = 0,
    onDelete,
}: CardProps): React.JSX.Element {
    const borderRadius = React.useMemo(
        () => Math.min(width, height) * 0.02,
        [width, height],
    );
    const panDX = React.useMemo(() => new Animated.Value(0), []);
    const translateX = React.useMemo(
        () =>
            panDX.interpolate<number>({
                inputRange: [-parentWidth, parentWidth],
                outputRange: [
                    -(parentWidth + 0.7 * height),
                    parentWidth + 0.7 * height,
                ],
            }),
        [panDX, parentWidth, height],
    );
    const prevTranslateX = React.useMemo(
        () =>
            prevTranslateXMaybe?.current ?? new Animated.Value(2 * parentWidth),
        [prevTranslateXMaybe, parentWidth],
    );
    const prevTranslateY = React.useMemo(
        () => prevTranslateYMaybe?.current ?? new Animated.Value(0),
        [prevTranslateYMaybe],
    );
    if (translateXRef != null) {
        translateXRef.current = translateX;
    }
    const translateYFirstHalf = React.useMemo(
        () =>
            prevTranslateX.interpolate({
                inputRange: [
                    -4 * parentWidth,
                    -parentWidth - height * 0.7,
                    0,
                    parentWidth + height * 0.7,
                    4 * parentWidth,
                ],
                outputRange: [0, 0, height * 0.09, 0, 0],
            }),
        [prevTranslateX, height, parentWidth],
    );
    const translateYSecondHalf = React.useMemo(
        () =>
            prevTranslateY.interpolate({
                inputRange: [0, height * 0.09, height],
                outputRange: [0, height * 0.08, height * 0.08],
            }),
        [prevTranslateY, height],
    );
    const translateY = Animated.add(translateYFirstHalf, translateYSecondHalf);
    if (translateYRef != null) {
        translateYRef.current = translateY;
    }
    const scale = translateY.interpolate({
        inputRange: [0, height * 0.09, height * 0.17],
        outputRange: [1, 0.936, 0.884],
    });
    const cardAngle = React.useMemo(
        () =>
            translateX.interpolate({
                inputRange: [
                    -parentWidth - height * 0.7,
                    parentWidth + height * 0.7,
                ],
                outputRange: ["-45deg", "45deg"],
            }),
        [translateX, height, parentWidth],
    );
    const translateYExtra = React.useMemo(
        () =>
            translateX.interpolate({
                inputRange: [
                    -parentWidth - height * 0.7,
                    -parentWidth / 2,
                    -parentWidth / 4,
                    0,
                    parentWidth / 4,
                    parentWidth / 2,
                    parentWidth + height * 0.7,
                ],
                outputRange: [
                    0.6 * height,
                    0.1 * height,
                    0.04 * height,
                    0,
                    0.04 * height,
                    0.1 * height,
                    0.6 * height,
                ],
            }),
        [translateX, height, parentWidth],
    );
    const translateYTrue = Animated.subtract(translateY, translateYExtra);

    const iconLeftOpacity = React.useMemo(
        () =>
            translateX.interpolate({
                inputRange: [0, parentWidth / 2],
                outputRange: [0, 1],
            }),
        [translateX, parentWidth],
    );
    const iconRightOpacity = React.useMemo(
        () =>
            translateX.interpolate({
                inputRange: [-parentWidth / 2, 0],
                outputRange: [1, 0],
            }),
        [translateX, parentWidth],
    );
    const iconSideLength = height * 0.226;
    const iconDimension: ViewStyle = React.useMemo(() => {
        return {
            width: iconSideLength,
            height: iconSideLength,
            position: "absolute",
            top: 0,
        };
    }, [iconSideLength]);
    const panResponder = React.useMemo(
        () =>
            PanResponder.create({
                onMoveShouldSetPanResponder() {
                    return true;
                },
                onPanResponderMove: Animated.event([null, { dx: panDX }], {
                    useNativeDriver: false,
                }),
                onPanResponderRelease(_, state) {
                    if (Math.abs(state.dx) > width / 8) {
                        Animated.timing(panDX, {
                            toValue:
                                parentWidth * (Math.abs(state.dx) / state.dx),
                            useNativeDriver: true,
                            duration: 300,
                        }).start();
                        return;
                    }
                    Animated.spring(panDX, {
                        toValue: 0,

                        useNativeDriver: true,
                        bounciness: 0,
                    }).start();
                },
            }),
        [panDX, parentWidth, width],
    );
    React.useEffect(() => {
        const id = translateX.addListener(({ value }: { value: number }) => {
            if (Math.abs(value) >= parentWidth + height * 0.7) {
                onDelete?.();
            }
        });
        return () => translateX.removeListener(id);
    }, [onDelete, translateX, height, parentWidth]);
    const cardStyles: ViewStyle = React.useMemo(
        () => ({
            width,
            height,
            position: "absolute",
            top: y,
            left: x,
            zIndex,
            elevation: zIndex,
            shadowColor: "transparent",
            transform: [
                { scale },
                { rotate: cardAngle },
                { translateY: translateYTrue },
                { translateX },
            ],
            backgroundColor: color,
            borderRadius,
        }),
        [
            width,
            height,
            y,
            x,
            zIndex,
            scale,
            cardAngle,
            translateYTrue,
            translateX,
            borderRadius,
            color,
        ],
    );
    if (!active) {
        return <Animated.View style={cardStyles} />;
    }
    return (
        <Animated.View style={cardStyles} {...panResponder.panHandlers}>
            <Animated.View
                style={[
                    iconDimension,
                    {
                        opacity: iconLeftOpacity,
                        left: 0,
                    },
                ]}>
                <Check width={iconSideLength} height={iconSideLength} />
            </Animated.View>
            <Animated.View
                style={[
                    iconDimension,
                    {
                        opacity: iconRightOpacity,
                        right: 0,
                    },
                ]}>
                <Cross width={iconSideLength} height={iconSideLength} />
            </Animated.View>
        </Animated.View>
    );
}
