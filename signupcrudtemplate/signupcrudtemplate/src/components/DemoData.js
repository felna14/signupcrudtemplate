import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const DemoData = () => {
  return (
    <div>
      <Button as={Link} to="/add" variant="primary">
        Add
      </Button>
    </div>
  );
};

export default DemoData;
