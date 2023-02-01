import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getStudentData } from '../actions';
import Card from 'react-bootstrap/Card';
import { CSVLink } from "react-csv";

const Addform = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(getStudentData());
  }, []);
  return (
    <div className="mt-5 conatiner ml-5">
      <Button as={Link} to="/add-student" variant="primary">
        Add
      </Button>

      <CSVLink data={data} className="btn btn-success ml-3">
        Download
      </CSVLink>
      <div className="d-flex justify-content-around flex-wrap m-3">
        {data.map((d, index) => (
          <Card style={{ width: '18rem' }} className="mt-5" key={index}>
            <Card.Img variant="top" src={d.image} />
            <Card.Body>
              <Card.Title>{d.firstName}</Card.Title>
              <Card.Text>{d.email}</Card.Text>
              <Button variant="primary" as={Link} to={`/edit-form/${d.id}`}>
                Edit
              </Button>
              <Button
                variant="primary"
                className="ml-3"
                as={Link}
                to={`/view-form/${d.id}`}
              >
                View
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Addform;
