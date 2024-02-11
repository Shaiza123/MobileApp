import { View, Text, Keyboard, ActivityIndicator, } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from '../../components/TextinputScreen/style';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Formik } from 'formik';
import ButtonScreen from '../../components/ButtonScreen/index'
import {Button} from 'react-native-paper'

const TextinputScreen = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    return props?.path === 'Login' ? (
        <View>
            <Formik
                initialValues={{ email: '', password: '' }}
                validateOnMount={true}
                onSubmit={(values, isValid) => props?.userLogin(values.email, values.password, isValid)}
                validationSchema={props?.loginValidationsSchema}
            >
                {({ handleChange, handleSubmit, values, errors }) => (
                    <>
                        <Text style={styles.text}>Email</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                onChangeText={handleChange('email')}
                                value={values.email}
                                ref={props?.emailRef}
                                onSubmitEditing={() => props?.passwordRef.current.focus()}
                                blurOnSubmit={false}
                                onFocus={() => props?.setErrorMessage(null)}
                                autoFocus={false}
                                placeholder="Email Your Email"
                                keyboardType="email-address"
                                underlineColor="#0147AB"
                                activeUnderlineColor='#0147AB'
                                textColor='#707070'
                                mode='flat'
                                right={<TextInput.Icon icon={() => <AntDesign name="user" size={hp(2.5)} color="#0147AB" />} />}
                            />
                        </View>
                        {(errors.email) &&
                            <Text style={styles.errors}>{errors.email}</Text>}
                        {props?.errorMessage && (
                            <Text style={styles.errors}>{props?.errorMessage}</Text>
                        )}
                        <Text style={styles.text}>Password</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                onChangeText={handleChange('password')}
                                value={values.password}
                                ref={props?.passwordRef}
                                onSubmitEditing={() => Keyboard.dismiss()}
                                blurOnSubmit={false}
                                placeholder="Email Your Password"
                                secureTextEntry={!showPassword}
                                activeUnderlineColor='#0147AB'
                                underlineColor="#0147AB"
                                textColor='#707070'
                                mode='flat'
                                right={<TextInput.Icon icon={() => <Ionicons name={showPassword ? "eye-off" : "eye"} size={hp(2.5)} color="#0147AB" onPress={() => setShowPassword(!showPassword)} />} />}
                            />
                        </View>
                        {(errors.password) &&
                            <Text style={styles.errors}>{errors.password}</Text>}
                        {props?.loading ? <ActivityIndicator size="small" color="#0000ff" /> :
                            <>
                                <ButtonScreen handleSubmit={handleSubmit} children={'Login'} valueEmail={values.email} valuePassword={values.password} />
                            </>
                        }
                    </>
                )}
            </Formik>
        </View >

    ) :

        props?.path === 'SignUp' ? (
            <View>
                <Formik
                    initialValues={{ email: '', password: '', confirmPassword: '' }}
                    validateOnMount={true}
                    onSubmit={(values, isValid) => props?.signUpUser(values.email, values.password, values.confirmPassword, isValid)}
                    validationSchema={props?.loginValidationsSchema}
                    enableReinitialize={true}
                >
                    {({ handleChange, handleSubmit, values, errors }) => (
                        <>
                            <Text style={styles.text}>Email</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('email')}
                                    value={values.email}
                                    ref={props?.emailRef}
                                    onSubmitEditing={() => props?.passwordRef.current.focus()}
                                    blurOnSubmit={false}
                                    onFocus={() => props?.setErrorMessage(null)}
                                    autoFocus={false}
                                    placeholder="Email Your Email"
                                    keyboardType="email-address"
                                    underlineColor="#0147AB"
                                    activeUnderlineColor='#0147AB'
                                    textColor='#707070'
                                    mode='flat'
                                    right={<TextInput.Icon icon={() => <AntDesign name="user" size={hp(2.5)} color="#0147AB" />} />}
                                />
                            </View>
                            {(errors.email) &&
                                <Text style={styles.errors}>{errors.email}</Text>}
                            {props?.errorMessage && (
                                <Text style={styles.errors}>{props?.errorMessage}</Text>
                            )}
                            <Text style={styles.text}>Password</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email Your Password"
                                    onChangeText={handleChange('password')}
                                    value={values.password}
                                    ref={props?.passwordRef}
                                    onSubmitEditing={() => props?.confirmPasswordRef.current.focus()}
                                    blurOnSubmit={false}
                                    secureTextEntry={!showPassword}
                                    activeUnderlineColor='#0147AB'
                                    underlineColor="#0147AB"
                                    textColor='#707070'
                                    mode='flat'
                                    right={<TextInput.Icon icon={() => <Ionicons name={showPassword ? "eye-off" : "eye"} size={hp(2.5)} color="#0147AB" onPress={() => setShowPassword(!showPassword)} />} />}
                                />
                            </View>
                            {(errors.password) &&
                                <Text style={styles.errors}>{errors.password}</Text>}
                            <Text style={styles.text}>Confirm Password</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('confirmPassword')}
                                    value={values.confirmPassword}
                                    ref={props?.confirmPasswordRef}
                                    onSubmitEditing={() => Keyboard.dismiss()}
                                    placeholder="Email Your Password"
                                    secureTextEntry={!showPassword}
                                    activeUnderlineColor='#0147AB'
                                    underlineColor="#0147AB"
                                    textColor='#707070'
                                    mode='flat'
                                    right={<TextInput.Icon icon={() => <Ionicons name={showPassword ? "eye-off" : "eye"} size={hp(2.5)} color="#0147AB" onPress={() => setShowPassword(!showPassword)} />} />}
                                />
                            </View>
                            {(errors.confirmPassword) &&
                                <Text style={styles.errors}>{errors.confirmPassword}</Text>}
                            {props?.loading ? <ActivityIndicator size="small" color="#0000ff" /> :
                                <>
                                    <ButtonScreen handleSubmit={handleSubmit} children={'Sign Up'} valueEmail={values.email} valuePassword={values.password} valueConfirmPassword={values.confirmPassword} />
                                </>
                            }
                        </>
                    )}
                </Formik>
            </View>
        ) :
            props?.path === 'ForgotPassword' ? (
                <View>
                    <Formik
                        initialValues={{ email: '' }}
                        validateOnMount={true}
                        onSubmit={(values, isValid) => props?.forgotPassword(values.email, isValid)}
                        validationSchema={props?.loginValidationsSchema}
                    >
                        {({ handleChange, handleSubmit, values, errors }) => (
                            <>
                                <Text style={styles.text}>Email</Text>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={handleChange('email')}
                                        value={values.email}
                                        ref={props?.emailRef}
                                        onSubmitEditing={() => Keyboard.dismiss()}
                                        blurOnSubmit={false}
                                        onFocus={() => props?.setErrorMessage(null)}
                                        autoFocus={false}
                                        placeholder="Email Your Email"
                                        keyboardType="email-address"
                                        underlineColor="#0147AB"
                                        activeUnderlineColor='#0147AB'
                                        textColor='#707070'
                                        mode='flat'
                                        right={<TextInput.Icon icon={() => <AntDesign name="user" size={hp(2.5)} color="#000" />} />}
                                    />
                                </View>
                                {(errors.email) &&
                                    <Text style={styles.errors}>{errors.email}</Text>}
                                {props?.errorMessage && (
                                    <Text style={styles.errors}>{props?.errorMessage}</Text>
                                )}
                                {props?.loading ? <ActivityIndicator size="small" color="#0000ff" /> :
                                    <>
                                        <ButtonScreen handleSubmit={handleSubmit} children={'Submit'} valueEmail={values.email} />
                                    </>
                                }
                            </>
                        )}
                    </Formik>
                </View >
            ) :
                props?.path === 'Post' ? (
                    <View>

                        <Text style={styles.text}>Title</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="What's on your mind?"
                                keyboardType="default"
                                onChangeText={props?.setPostTitle}
                                value={props?.postTitle}
                                numberOfLines={1}
                                ref={props?.postTitleRef}
                                onSubmitEditing={() => props?.postDescriptionRef.current.focus()}
                                blurOnSubmit={false}
                                autoFocus={false}
                                underlineColor="#0147AB"
                                activeUnderlineColor='#0147AB'
                                textColor='#707070'
                                mode='flat'
                            // right={<TextInput.Icon icon={() => <MaterialCommunityIcons name="post" size={hp(2.5)} color="#000" />} />}
                            />
                        </View>
                        <Text style={styles.text}>Description</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                // underlineColorAndroid="transparent"
                                style={styles.input}
                                placeholder="What's on your mind?"
                                onChangeText={props?.setPostDescription}
                                value={props?.postDescription}
                                ref={props?.postDescriptionRef}
                                keyboardType="default"
                                numberOfLines={8}
                                multiline={true}
                                blurOnSubmit={false}
                                autoFocus={false}
                                underlineColor="#0147AB"
                                activeUnderlineColor='#0147AB'
                                textColor='#707070'
                                mode='flat'
                            />
                        </View>
                        {props?.image ?
                        <View style={styles.button}>
                            <Text style={styles.imageName}>{props?.image.split('/').pop()}</Text>
                            <Button onPress={() => props?.cancelImage()} 
                             icon={() =><Ionicons name="close-circle" size={hp(4)} color="darkgrey" />}
                            />
                            </View>
                        : <></>
                        }
                        {props?.loading ? <ActivityIndicator size="small" color="#0000ff" /> :
                            <>
                                <ButtonScreen handleSubmit={props?.handleSubmit} children={'Send'} valuePostTitle={props?.postTitle} valuePostDescription={props?.postDescription} image={props?.image} />
                            </>
                        }
                    </View>
                ) :
                    <View>
                        <Text style={styles.text}>Age</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your Age"
                                keyboardType='numeric'
                                onChangeText={props?.setAge}
                                value={props?.age}
                                ref={props?.ageRef}
                                onSubmitEditing={() => props?.genderRef?.current?.focus()}
                                autoFocus={false}
                                blurOnSubmit={false}
                                underlineColor="transparent"
                                activeUnderlineColor='transparent'
                                textColor='#707070'
                                mode='outlined'
                                outlineColor='#000'
                                activeOutlineColor='#000'
                                right={<TextInput.Icon icon={() => <MaterialIcons name="manage-accounts" size={hp(2.5)} color="#5dcfb6" />} />}
                            />
                        </View>
                        <Text style={styles.text}>Gender</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your Gender"
                                keyboardType="ascii-capable"
                                onChangeText={props?.setGender}
                                value={props?.gender}
                                blurOnSubmit={false}
                                ref={props?.genderRef}
                                onSubmitEditing={() => Keyboard.dismiss()}
                                autoFocus={false}
                                underlineColor="transparent"
                                activeUnderlineColor='transparent'
                                textColor='#707070'
                                mode='outlined'
                                outlineColor='#000'
                                activeOutlineColor='#000'
                                right={<TextInput.Icon icon={() => <MaterialIcons name="manage-accounts" size={hp(2.5)} color="#5dcfb6" />} />}
                            />
                        </View>
                        {props?.loading ? <ActivityIndicator size="small" color="#0000ff" /> :
                            <>
                                <ButtonScreen handleSubmit={props?.handleSubmit} children={'Update'} valueAge={props?.age} valueGender={props?.gender} />
                            </>
                        }
                    </View>
}

export default TextinputScreen