import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebase from '../../common/fireBase';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { IFirebaseOptions } from 'expo-firebase-core';
import { LinearGradient } from 'expo-linear-gradient';
import { FormTextInput, Card, Button, VerificationInput } from '../../components';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Theme } from '../../theme';
import { RootStoreContext } from 'stores/rootStore';
import { FireBaseAuthResponse } from 'models/firebaseAuth';
import { observer } from 'mobx-react-lite';
import { useLocalization } from '../../localization';

export const SignInScreen = observer(() => {
  //Hook
  const { getString } = useLocalization();

  //State
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.fireBaseAuthStore;

  const [verificationId, setVerificationId] = useState(null);
  const [showVerifyInput, setShowVerifyInput] = useState(false);
  const reCaptchaVerifier = useRef(null);

  useEffect(() => {
    if (showVerifyInput) {
      Alert.alert(
        '',
        getString('Please enter the 6 digit verification code sent to your phone number')
      );
    }
  }, [showVerifyInput]);

  const sendVerification = (phoneNumber: string) => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, reCaptchaVerifier?.current)
      .then(setVerificationId)
      .then(() => {
        setShowVerifyInput(true);
      });
  };

  const confirmCode = async (code: string) => {
    const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(async (response) => {
        let user = response.user;
        let token = await user.getIdTokenResult();
        let result: FireBaseAuthResponse = {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
          phoneNumber: user.phoneNumber,
          token: token.token,
          expirationTime: token.expirationTime,
          refreshToken: user.refreshToken,
        };
        login(result);
      });
  };

  const phoneNumberValidationSchema = yup.object().shape({
    phoneNumber: yup
      .string()
      .matches(/^[0-9]+$/, getString('Must be only digits'))
      .min(10, getString('Must be exactly 10 digits'))
      .max(10, getString('Must be exactly 10 digits'))
      .required(getString('Phone number is Required')),
  });

  const verificationValidationSchema = yup.object().shape({
    code: yup
      .string()
      .matches(/^[0-9]+$/, getString('Must be only digits'))
      .min(6, getString('Must be exactly 6 digits'))
      .max(6, getString('Must be exactly 6 digits'))
      .required(getString('Verification code is Required')),
  });

  const formikPhoneNumber = useFormik({
    initialValues: {
      phoneNumber: '',
    },
    validationSchema: phoneNumberValidationSchema,
    onSubmit: async (values) => {
      let phoneConvert = values.phoneNumber.slice(1, values.phoneNumber.length);
      phoneConvert = '+84' + phoneConvert;
      sendVerification(phoneConvert);
    },
  });

  const formikVerificationCode = useFormik({
    initialValues: {
      code: '',
    },
    validationSchema: verificationValidationSchema,
    onSubmit: async (values) => {
      confirmCode(values.code);
    },
  });
  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={reCaptchaVerifier}
        firebaseConfig={firebase.app().options as IFirebaseOptions}
        attemptInvisibleVerification={false}
      />
      <LinearGradient
        colors={['white', '#cffcf6', Theme.colors.primaryColor, Theme.colors.status.online]}
        style={styles.gradient}
      >
        <Image style={styles.image} source={require('../../../assets/logo.png')} />
        <Card style={styles.authContainer}>
          <ScrollView>
            {!showVerifyInput ? (
              <>
                <FormTextInput
                  onInputChange={formikPhoneNumber.handleChange('phoneNumber')}
                  onInputBlur={formikPhoneNumber.handleBlur('phoneNumber')}
                  value={formikPhoneNumber.values.phoneNumber}
                  label={getString('Phone Number')}
                  error={formikPhoneNumber.errors.phoneNumber}
                  touched={formikPhoneNumber.touched.phoneNumber}
                  placeholder={getString('Phone Number')}
                  keyboardType='phone-pad'
                  autoCompleteType='tel'
                />
                <Button
                  disabled={
                    !!formikPhoneNumber.errors.phoneNumber || !formikPhoneNumber.touched.phoneNumber
                  }
                  style={{ marginTop: 10 }}
                  title={getString('Send verification')}
                  onPress={() => {
                    formikPhoneNumber.handleSubmit();
                  }}
                />
              </>
            ) : (
              <>
                <VerificationInput
                  onInputChange={formikVerificationCode.handleChange('code')}
                  onInputBlur={formikVerificationCode.handleBlur('code')}
                  value={formikVerificationCode.values.code}
                  label={getString('Code')}
                  error={formikVerificationCode.errors.code}
                  touched={formikVerificationCode.touched.code}
                />
                <Button
                  style={{ marginTop: 10 }}
                  title={getString('Change phone number')}
                  onPress={() => {
                    setShowVerifyInput(false);
                  }}
                />
                <Button
                  disabled={
                    !!formikVerificationCode.errors.code || !formikVerificationCode.touched.code
                  }
                  style={{ marginTop: 10 }}
                  title={getString('Submit verification')}
                  onPress={() => {
                    formikVerificationCode.handleSubmit();
                  }}
                />
              </>
            )}
          </ScrollView>
        </Card>
      </LinearGradient>
    </View>
  );
});

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
    marginVertical: 40,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: { width: 120, height: 32, resizeMode: 'contain' },
});
