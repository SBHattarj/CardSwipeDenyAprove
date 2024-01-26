import { MutableRefObject as Ref } from "react";
import { Animated } from "react-native";
export type CardProps = {
    width: number;
    height: number;
    parentWidth: number;
    prevTranslateX?: Ref<
        | Animated.AnimatedValue
        | Animated.AnimatedInterpolation<number>
        | undefined
        | null
    >;
    translateXRef?: Ref<
        | Animated.Value
        | Animated.AnimatedInterpolation<number>
        | null
        | undefined
    >;
    prevTranslateY?: Ref<
        Animated.Value | Animated.AnimatedAddition<number> | null | undefined
    >;
    translateYRef?: Ref<
        Animated.Value | Animated.AnimatedAddition<number> | null | undefined
    >;
    onDelete?: () => void;
    color: string;
    x: number;
    y: number;
    active?: boolean;
    zIndex?: number;
};
