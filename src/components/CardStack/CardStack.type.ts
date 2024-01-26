export type CardStackProps = {
    card: {
        width: number;
        height: number;
        x: number;
        y: number;
    };
    parentWidth: number;
    cards: {
        color: string;
        id: number;
    }[];
};
