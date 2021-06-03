import { FormDateTimeInput, FormTextInput, Button, FormPicker, Loading } from '../../components';
import React, { useContext, useEffect, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View, StyleSheet, Platform, Alert } from 'react-native';
import { Formik } from 'formik';
import { genderOptions } from '../../utils/const';
import { RootStoreContext } from 'stores/rootStore';
import * as yup from 'yup';
import { IUserData } from 'models/userData';
import { observer } from 'mobx-react-lite';
import Toast, { BaseToast } from 'react-native-toast-message';
import { Theme } from '../../theme';

export const UserProfile = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.fireBaseAuthStore;
  const { editUser, getUser, currentUser } = rootStore.usersStore;
  const { setToastToggle, setToastData } = rootStore.commonStore;
  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    if (user)
      getUser(user.phoneNumber).then(() => {
        setAppLoaded(true);
      });
  }, [currentUser]);

  const handleSubmit = (values: IUserData) => {
    let profile: IUserData = { ...values };
    editUser(profile).then(() => {
      setToastData('success', 'Success', 'Update profile successfully');
    });
  };

  const profileValidationScheme = yup.object().shape({
    fullName: yup.string().required('Full name is required'),
    address: yup.string().required('Address is required'),
    email: yup.string().required('Email is required'),
    dateOfBirth: yup.string().required('Date of birth is required'),
  });

  if (!appLoaded) return <Loading />;

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, elevation: 0 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView style={{ elevation: 0 }}>
          <Formik
            initialValues={{
              phoneNumber: user?.phoneNumber ?? '',
              fullName: currentUser?.fullName ?? '',
              address: currentUser?.address ?? '',
              email: currentUser?.email ?? '',
              gender: currentUser?.gender ?? genderOptions[0].value,
              dateOfBirth: currentUser?.dateOfBirth.toString() ?? '',
            }}
            validationSchema={profileValidationScheme}
            onSubmit={handleSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
              dirty,
            }) => (
              <View style={styles.form}>
                <FormTextInput
                  onInputChange={handleChange('phoneNumber')}
                  onInputBlur={handleBlur('phoneNumber')}
                  value={values.phoneNumber}
                  label='Phone Number'
                  editable={false}
                  error={errors.phoneNumber}
                  touched={touched.phoneNumber}
                  placeholder='Phone Number'
                  keyboardType='phone-pad'
                  autoCompleteType='tel'
                />
                <FormTextInput
                  onInputChange={handleChange('fullName')}
                  onInputBlur={handleBlur('fullName')}
                  value={values.fullName}
                  label='Full Name'
                  error={errors.fullName}
                  touched={touched.fullName}
                  placeholder='Full name'
                  keyboardType='default'
                />
                <FormTextInput
                  onInputChange={handleChange('email')}
                  onInputBlur={handleBlur('email')}
                  value={values.email}
                  label='Email'
                  error={errors.email}
                  touched={touched.email}
                  placeholder='Email'
                  keyboardType='default'
                />
                <FormTextInput
                  onInputChange={handleChange('address')}
                  onInputBlur={handleBlur('address')}
                  value={values.address}
                  label='Address'
                  error={errors.address}
                  touched={touched.address}
                  placeholder='Address'
                  keyboardType='default'
                />
                <FormDateTimeInput
                  isDate
                  onInputChange={handleChange('dateOfBirth')}
                  onInputBlur={handleBlur('dateOfBirth')}
                  value={values.dateOfBirth.toString()}
                  label='Date of birth'
                  error={errors.dateOfBirth}
                  touched={touched.dateOfBirth}
                  placeholder='Date of birth'
                />
                <FormPicker
                  onInputChange={handleChange('gender')}
                  onInputBlur={handleBlur('gender')}
                  value={values.gender}
                  label='Gender'
                  error={errors.gender}
                  touched={touched.gender}
                  options={genderOptions}
                />
                <Button
                  disabled={!isValid || !dirty}
                  style={{ marginTop: 10 }}
                  title='Save profile'
                  onPress={() => {
                    handleSubmit();
                  }}
                />
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
});

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
