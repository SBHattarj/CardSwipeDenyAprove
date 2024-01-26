import React from "react";
import Card from "../Card";
import { CardStackProps } from "./CardStack.type";
import { Animated } from "react-native";

export default function CardStack({
    parentWidth,
    cards: providedCards,
    card,
}: CardStackProps): React.JSX.Element {
    const prevCardTranslateX = React.useRef<Animated.Value>();
    const prevCardTranslateY = React.useRef<Animated.Value>();
    const prevCardTranslates: React.MutableRefObject<{
        [key: number]: {
            x: React.MutableRefObject<Animated.Value | null>;
            y: React.MutableRefObject<Animated.Value | null>;
        };
    }> = React.useRef({});
    const [cards, setCards] = React.useState([...providedCards]);
    React.useEffect(() => {
        prevCardTranslates.current = Object.fromEntries(
            cards.map((_, index) => [
                index,
                {
                    x: { current: null },
                    y: { current: null },
                },
            ]),
        );
    }, [cards]);
    prevCardTranslateX.current = undefined;
    prevCardTranslateY.current = undefined;
    return (
        <>
            {cards.map(({ color, id }, index) => (
                <Card
                    {...card}
                    parentWidth={parentWidth}
                    key={id}
                    prevTranslateX={prevCardTranslateX}
                    prevTranslateY={prevCardTranslateY}
                    translateXRef={prevCardTranslateX}
                    translateYRef={prevCardTranslateY}
                    color={color}
                    active={index === 0}
                    onDelete={() =>
                        setCards(cards.filter(cardData => cardData.id !== id))
                    }
                    zIndex={cards.length - index}
                />
            ))}
        </>
    );
}
