import { View, Image, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import { useDispatch } from 'react-redux'
import { isFirstLaunch } from '../../redux/Reducer'
import styles from '../OnBoardingScreen/style'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Dots = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? '#0147AB' : 'rgba(0, 0, 0, 0.3)';

    return (
        <View 
            style={{
                width:6,
                height: 6,
                marginHorizontal: 3,
                marginBottom:100,
                backgroundColor
            }}
        />
    );
}

const Skip = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: wp(5) }}
        {...props}
    >
        <Text style={{color:'#0147AB'}}>Skip</Text>
    </TouchableOpacity>
)
const Next = ({ ...props }) => (
    <TouchableOpacity
        style={styles.button}
        {...props}
    >
        <Text style={{color:'#fff'}}>Next</Text>
    </TouchableOpacity>
)
const Done = ({ ...props }) => (
    <TouchableOpacity
        style={styles.button}
        {...props}
    >
        <Text style={{color:'#fff'}}>Done</Text>
    </TouchableOpacity>
)
export default function OnBoardingScreen() {
    const dispatch = useDispatch()

    const handleNavigation = () => {
        dispatch(isFirstLaunch({ firstLaunch: false }));
    }
    return (
        <Onboarding
            SkipButtonComponent={Skip}
            NextButtonComponent={Next}
            DoneButtonComponent={Done}
            DotComponent={Dots}
            titleStyles={styles.title}
            imageContainerStyles={styles.imageContainerStyles}
            bottomBarColor={'#fff'}
            onSkip={() => handleNavigation()}
            onDone={() => handleNavigation()}
            pages={[
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../../assets/BoardingImg1.png')} />,
                    title: 'Read Interesting Article Every Single Day!',
                    subtitle: 'Stay informed with a daily dose of knowledge.',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../../assets/BoardingImg2.png')} />,
                    title: 'Create & Publish Your Own Articles To The World!',
                    subtitle: 'Share your thoughts and ideas with a global audience.',
                },
            ]}
        />
    )
}
