import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ImageUploader from 'react-images-upload';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUpAction } from '../actions';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState('');
  const [errorimage, setErrorImage] = useState('');

  const onDrop = (pictureFiles, pictureDataURLs) => {
    setImage(pictureDataURLs);
  };

  const initial = { firstName: '', email: '', phoneNumber: '', message: '' };
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validation = Yup.object({
    firstName: Yup.string()
      .max(10, 'Too Long')
      .min(3, 'Too short')
      .required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Phone is Required'),
    message: Yup.string()
      .max(60, 'Must be 60 characters or less')
      .min(10, 'Minimum  10 characters ')
      .required('Address is Required'),
  });
  return (
    <div className="container mt-3">
      <h3>Sign Up</h3>
      <Formik
        initialValues={initial}
        validationSchema={validation}
        onSubmit={(values, { resetForm }) => {
          if (image === '') {
            setErrorImage('Required');
          } else {
            values = { ...values, image };
            dispatch(signUpAction(values, () => navigate('/login')));
            resetForm();
          }
        }}
      >
        <Form>
          <div className="mb-4 mt-3">
            <div>
              <label htmlFor="firstName">Name</label>
            </div>
            <Field name="firstName" type="text" className="form-control" />
            <div className="text-danger">
              <ErrorMessage name="firstName" />
            </div>
          </div>

          <div className="mb-4">
            <div>
              <label htmlFor="email">Email</label>
            </div>
            <Field name="email" type="email" className="form-control" />
            <div className="text-danger">
              <ErrorMessage name="email" />
            </div>
          </div>

          <div className="mb-4">
            <div>
              <label htmlFor="phoneNumber">Phone</label>
            </div>
            <Field name="phoneNumber" type="text" className="form-control" />
            <div className="text-danger">
              <ErrorMessage name="phoneNumber" />
            </div>
          </div>

          <div className="mb-4">
            <div>
              <label htmlFor="message">Address</label>
            </div>
            <Field
              name="message"
              as="textarea"
              className="form-textarea form-control"
            />
            <div className="text-danger">
              <ErrorMessage name="message" />
            </div>
          </div>

          <div className="mb-4">
            <div>
              <label>Photo</label>
            </div>
            <ImageUploader
              withIcon={true}
              buttonText="Choose images"
              value={image}
              onChange={onDrop}
              imgExtension={['.jpg', '.gif', '.png', '.gif']}
              maxFileSize={5242880}
            />
            <div className="text-danger">{errorimage}</div>
          </div>

          <div className="mb-4">
            <button type="submit" className="btn btn-primary">
              SignUp
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SignUp;
