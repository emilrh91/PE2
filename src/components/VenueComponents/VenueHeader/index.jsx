import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import "./index.scss";

export const VenueHeader = ({ name }) => {
  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }} className="text-center header">
          <h1>{name}</h1>
        </Col>
      </Row>
    </Container>
  );
};

VenueHeader.propTypes = {
  name: PropTypes.string.isRequired,
};