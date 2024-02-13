import { View, Modal, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import styles from '../LoaderModal/style';
import LottieView from 'lottie-react-native';

export default function LoaderModal(props) {
    const closeModal = () => {
        props?.closeModal();
    }

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props?.modalVisible}
                onRequestClose={()=>{
                    closeModal();
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <LottieView style={styles.lottie} source={require('../../assets/A6.json')} autoPlay loop={false} />
                        <Text style={styles.modalText}>Welcome To blogger app.</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={props?.closeModal}>
                            <Text style={styles.okText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
