import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginInAction } from '../actions';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="container">
      <h3>Login</h3>
      <Formik
        initialValues={{ email: '', phoneNumber: '' }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          phoneNumber: Yup.string().required('Required'),
        })}
        onSubmit={(values, { resetForm }) => {
          dispatch(loginInAction(values, () => navigate('/')));
          resetForm();
        }}
      >
        <Form>
          <div className="mb-4">
            <div>
              <label htmlFor="email">UserName</label>
            </div>
            <Field
              name="email"
              type="email"
              className="form-control"
              style={{ width: '50%' }}
            />
            <div className="text-danger">
              <ErrorMessage name="email" />
            </div>
          </div>

          <div className="mb-4">
            <div>
              <label htmlFor="PhoneNumber">Password</label>
            </div>
            <Field
              name="phoneNumber"
              type="text"
              className="form-control"
              style={{ width: '50%' }}
            />
            <div className="text-danger">
              <ErrorMessage name="phoneNumber" />
            </div>
          </div>
          <div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
