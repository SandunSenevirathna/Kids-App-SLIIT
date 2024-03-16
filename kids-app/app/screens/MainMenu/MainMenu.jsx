import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableHighlight, TouchableNativeFeedback, View } from 'react-native';
import teacherData from "../../../teacherData";


function MainMenu({ navigation}) {

    return (
        <ImageBackground
            source={require('../../assets/BG_01.png')}
            style={styles.imageBackground}
            resizeMode="cover"
        >
            <View >
                <Text style={styles.helloTeacher}>
                    Hello, Teacher {teacherData.name}
                </Text>
                <View style={styles.logo}>
                    <Image source={require('../../assets/TeacherIcon.png')} style={{ width: 180, height: 180 }} />
                </View>
                <View style={styles.bigRectangle}></View>
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                    <View style={styles.smallButtons}>

                        <TouchableHighlight
                            activeOpacity={1}
                            underlayColor="#DDDDDD"
                            onPress={() => { navigation.navigate('ChildrenList')}}
                            style={styles.touchableHighlightSmallButton}
                        >
                            <Image source={require('../../assets/students.png')} style={{ width: 50, height: 50 }} />
                        </TouchableHighlight>
                        <Text style={styles.smallButtonsText}>Children List</Text>
                    </View>

                </View>
            </View>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    logo: {
        marginLeft: 190,
        marginTop: 30,
        alignSelf: 'center',
    },
    helloTeacher: {
        justifyContent: 'flex-start',
        top: 50,
        marginLeft: 20,
        fontSize: 18,
        color: '#ffff',
        fontWeight: '600'
    },
    bigRectangle: {
        backgroundColor: '#B7B7B7',
        width: '80%',
        height: 230,
        alignSelf: 'center',
        borderRadius: 10,
        opacity: .3,
        marginTop: 20,

    },
    smallButtons: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        margin: 20,
    },
    touchableHighlightSmallButton: {
        width: 100,
        height: 100,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    smallButtonsText: {
        fontWeight: '600',
    }

});


export default MainMenu;