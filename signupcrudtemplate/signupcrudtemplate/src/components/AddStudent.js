import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ImageUploader from 'react-images-upload';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  editStudentData,
  edittedStudentData,
  postStudentData,
} from '../actions';

const AddStudent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState('');
  const [error, setError] = useState('');

  const { editStudent } = useSelector((state) => state.postReducer);

  useEffect(() => {
    if (id) {
      dispatch(editStudentData(id));
    }
  }, []);

  const onDrop = (pictureFiles, pictureDataURLs) => {
    setImage(pictureDataURLs);
  };

  const initial = {
    firstName: id ? editStudent.firstName : '',
    lastName: id ? editStudent.lastName : '',
    email: id ? editStudent.email : '',
  };
  const validation = Yup.object({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    lastName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
  });
  return (
    <div className="container">
      <Formik
        initialValues={initial}
        validationSchema={validation}
        onSubmit={(values, { resetForm }) => {
          if (image === '') {
            setError('Required');
          }
          if (id) {
            let img = image ? image : editStudent.image;
            dispatch(edittedStudentData({ ...values, image: img }, id));
            navigate('/add-form');
          } else {
            values = { ...values, image };
            dispatch(postStudentData(values));
            navigate('/add-form');
            resetForm();
          }
        }}
        enableReinitialize
      >
        <Form>
          <div className="mb-4">
            <div>
              <label htmlFor="firstName">First Name</label>
            </div>

            <Field name="firstName" type="text" className="form-control" />
            <div className="text-danger">
              <ErrorMessage name="firstName" />
            </div>
          </div>

          <div className="mb-4">
            <div>
              <label htmlFor="lastName">Last Name</label>
            </div>

            <Field name="lastName" type="text" className="form-control" />
            <div className="text-danger">
              <ErrorMessage name="lastName" />
            </div>
          </div>

          <div className="mb-4">
            <div>
              <label htmlFor="email">Email Address</label>
            </div>
            <Field name="email" type="email" className="form-control" />
            <div className="text-danger">
              <ErrorMessage name="email" />
            </div>
          </div>

          <div>
            <label>Photo</label>
            <div>
              {id ? (
                <img src={editStudent.image} style={{ height: '100px' }} />
              ) : null}
            </div>
            <ImageUploader
              withIcon={true}
              buttonText="Choose images"
              value={image}
              onChange={onDrop}
              imgExtension={['.jpg', '.gif', '.png', '.gif']}
              maxFileSize={5242880}
            />
            <div className="text-danger">{error}</div>
          </div>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddStudent;
