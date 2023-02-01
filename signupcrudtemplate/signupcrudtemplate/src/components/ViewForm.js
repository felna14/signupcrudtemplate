import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { viewStudentData } from '../actions';

const ViewForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { viewStudent } = useSelector((state) => state.postReducer);

  useEffect(() => {
    if (id) {
      dispatch(viewStudentData(id));
    }
  }, []);
  return (
    <div className="container">
      <Button variant="primary" className="mb-3" as={Link} to="/add-form">
        Back
      </Button>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={viewStudent.image} />
        <Card.Body>
          <Card.Title>{viewStudent.firstName}</Card.Title>
          <Card.Text>{viewStudent.lastName}</Card.Text>
          <Card.Text>{viewStudent.email}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ViewForm;
