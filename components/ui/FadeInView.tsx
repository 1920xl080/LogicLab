import React, { useEffect } from 'react';
import { ViewStyle } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withDelay,
} from 'react-native-reanimated';

type FadeInViewProps = {
    children: React.ReactNode;
    delay?: number;
    style?: ViewStyle;
};

export function FadeInView({ children, delay = 0, style }: FadeInViewProps) {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(20);

    useEffect(() => {
        opacity.value = withDelay(
            delay,
            withSpring(1, {
                damping: 15,
                stiffness: 100,
            })
        );
        translateY.value = withDelay(
            delay,
            withSpring(0, {
                damping: 15,
                stiffness: 100,
            })
        );
    }, [delay]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ translateY: translateY.value }],
        };
    });

    return (
        <Animated.View style={[animatedStyle, style]}>
            {children}
        </Animated.View>
    );
}
