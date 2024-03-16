import React, { useState, useRef, useEffect } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View, PanResponder, TouchableOpacity, Animated, Easing } from 'react-native';


const images = {
    image1: require('../../../assets/S4.png'),
    image2: require('../../../assets/S3.png'),
    image3: require('../../../assets/S1.png'),
    image4: require('../../../assets/S2.png'),
};

const holes = {
    hole1: require('../../../assets/S4.png'),
    hole2: require('../../../assets/S3.png'),
    hole3: require('../../../assets/S1.png'),
    hole4: require('../../../assets/S2.png'),
};



const SNAP_THRESHOLD = 30; // Set your desired threshold for snapping to the hole

const ColourShapesDragGame_3 = ({ navigation, route }) => {

    const panResponders = useRef({});
    const [draggedImageKey, setDraggedImageKey] = useState(null);
    const [imageOrder, setImageOrder] = useState(Object.keys(images));
    const [successPopupVisible, setSuccessPopupVisible] = useState(false);
    const [failurePopupVisible, setFailurePopupVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [endTime, setEndTime] = useState(null)
    const { startTime, correctRounds, incorrectRounds } = route.params;
    const [correctRoundsPlayed, setCorrectRoundsPlayed] = useState(correctRounds);
    const [incorrectRoundsPlayed, setInorrectRoundsPlayed] = useState(incorrectRounds);
    const [pressedNextButton, setPressedNextButton] = useState(false)


    const [imagePositions, setImagePositions] = useState({
        image1: { x: 0, y: 0 },
        image2: { x: 0, y: 0 },
        image3: { x: 0, y: 0 },
        image4: { x: 0, y: 0 },
    });

    const holePositions = {
        image1: { x: 68, y: 165 },
        image2: { x: 111, y: 165 },
        image3: { x: -111, y: 255 },
        image4: { x: -70, y: 255 },
    };

    const resetGame = () => {
        setImagePositions({
            image1: { x: 0, y: 0 },
            image2: { x: 0, y: 0 },
            image3: { x: 0, y: 0 },
            image4: { x: 0, y: 0 },
        });
    };

    useEffect(() => {
        if (pressedNextButton && (correctRoundsPlayed !== 0 || incorrectRoundsPlayed !== 0)) {
            setTimeout(() => {
                // When navigating to ColourShapesDragGame_2, pass the startTime parameter
                navigation.navigate('ColourShapesDragGame_4', {
                    startTime: startTime,
                    correctRounds: correctRoundsPlayed,
                    incorrectRounds: incorrectRoundsPlayed,
                });
            }, 2000);
        }
    }, [pressedNextButton, correctRoundsPlayed, incorrectRoundsPlayed]);



    const onPanResponderRelease = (event, gestureState) => {
        if (draggedImageKey) {
            const imageIndex = imageOrder.indexOf(draggedImageKey);
            const correctHolePosition = holePositions[`image${imageIndex + 1}`]; // Adjust for 1-based index
            const draggedPosition = imagePositions[draggedImageKey];
            const distance = Math.sqrt(
                Math.pow(draggedPosition.x - correctHolePosition.x, 2) +
                Math.pow(draggedPosition.y - correctHolePosition.y, 2)
            );

            if (distance < SNAP_THRESHOLD) {
                // If the dragged image is close to the correct hole, snap it to the hole
                setImagePositions((prevPositions) => ({
                    ...prevPositions,
                    [draggedImageKey]: correctHolePosition,
                }));
            } else {
                // If the dragged image is not on the correct hole, reset its position
                setImagePositions((prevPositions) => ({
                    ...prevPositions,
                    [draggedImageKey]: { x: 0, y: 0 }, // Set the initial position here
                }));
            }

            setDraggedImageKey(null); // Reset the dragged image key
        }
    };




    Object.keys(images).forEach((imageKey) => {
        panResponders.current[imageKey] = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                setDraggedImageKey(imageKey);
            },
            onPanResponderMove: (event, gestureState) => {
                if (draggedImageKey) {
                    const { dx, dy } = gestureState;
                    const newPosition = {
                        x: imagePositions[draggedImageKey].x + dx,
                        y: imagePositions[draggedImageKey].y + dy,
                    };
                    setImagePositions((prevPositions) => ({
                        ...prevPositions,
                        [draggedImageKey]: newPosition,
                    }));
                }
            },
            onPanResponderRelease: onPanResponderRelease, // Use the modified function here
        });
    });

    const checkImagesPlacement = () => {
        const correctPositions = Object.keys(imagePositions).every((imageKey) => {
            const draggedPosition = imagePositions[imageKey];
            const holePosition = holePositions[imageKey];
            const distance = Math.sqrt(
                Math.pow(draggedPosition.x - holePosition.x, 2) +
                Math.pow(draggedPosition.y - holePosition.y, 2)
            );
            return distance < SNAP_THRESHOLD;
        });

        return correctPositions;
    };


    const handleNextRound = () => {
        const areImagesPlacedCorrectly = checkImagesPlacement();
        setPressedNextButton(true);

        if (areImagesPlacedCorrectly) {
            setSuccessPopupVisible(true);
            setCorrectRoundsPlayed(correctRounds + 1)
        } else {
            setFailurePopupVisible(true);
            setInorrectRoundsPlayed(incorrectRounds + 1);
        }
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();

        // Automatically close popups after 2 seconds
        setTimeout(() => {
            setSuccessPopupVisible(false);
            setFailurePopupVisible(false);
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start();
            // Increment roundsPlayed after each round
        }, 2000);

        resetGame();

    };

    return (
        <ImageBackground
            source={require('../../../assets/BG_01.png')}
            style={[styles.imageBackground]}
            resizeMode="cover"
        >
            <View>
                <Text style={styles.gameName}>Shapes Select Game</Text>
            </View>

            {/* Dragged Images */}

            <View style={{ opacity: successPopupVisible || failurePopupVisible ? 0.3 : 1 }}>
                <View style={styles.bigRectangle}>
                    {imageOrder.map((imageKey, index) => (
                        <View
                            key={imageKey}
                            {...panResponders.current[imageKey].panHandlers}
                            style={{
                                left: imagePositions[imageKey].x,
                                top: imagePositions[imageKey].y,
                                zIndex: 2, // Set higher zIndex for the dragged image
                            }}
                        >
                            <Image source={images[imageKey]} style={styles.image} />
                        </View>
                    ))}
                </View>


                <View style={[styles.holeArea]}>
                    {Object.keys(holes).map((holeKey, index) => (
                        <Image
                            key={holeKey}
                            source={holes[holeKey]}  // Use holes object here
                            style={[
                                styles.image,
                                { tintColor: '#ffffff' }
                            ]}
                        />
                    ))}
                </View>
            </View>


            <TouchableOpacity
                style={[
                    styles.loginButton// Reduce opacity when disabled
                ]}
                onPress={() => { handleNextRound(); }}
            >
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>

            {successPopupVisible && (
                <Animated.View
                    style={[
                        styles.popupContainer,
                        {
                            opacity: fadeAnim,
                        },
                    ]}
                >
                    <Image source={require('../../../assets/very-good.png')} style={styles.popupImage} />
                </Animated.View>
            )}

            {failurePopupVisible && (
                <Animated.View
                    style={[
                        styles.popupContainer,
                        {
                            opacity: fadeAnim,
                        },
                    ]}
                >
                    <Image source={require('../../../assets/try-again.png')} style={styles.popupImage} />
                </Animated.View>
            )}
        </ImageBackground>
    );
};
const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    gameName: {
        justifyContent: 'flex-start',
        top: 50,
        marginLeft: 20,
        fontSize: 18,
        color: '#ffff',
        fontWeight: '600',
    },
    bigRectangle: {
        flexDirection: 'row',
        alignSelf: 'center',
        top: 200,
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
    },
    holeArea: {
        backgroundColor: '#E5E5E5',
        position: 'absolute',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 10,
        padding: 5,
        top: 300,
        zIndex: 1,
        margin: 60,

    },
    image: {
        width: 90, // Set your desired width
        height: 90, // Set your desired height
    },
    loginButton: {
        backgroundColor: '#7C7AF9',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 25,
        marginTop: 600,
        alignItems: 'center',  // Center the button horizontally
        alignSelf: 'center',   // Center the button horizontally in the parent container
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    popupContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
    },
    popupImage: {
        width: 300, // Adjust the width as per your image dimensions
        height: 300, // Adjust the height as per your image dimensions
    },
});

export default ColourShapesDragGame_3;
