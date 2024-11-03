// src/components/UserView.js
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import CardActions from './CardActions';
import '../App.css';

export default function UserView({ movies, fetchData }) {
    return (
        <Row className="mx-5">
            {movies.map(movie => (
                <Col key={movie._id} md={6} lg={4} xxl={3} className="mb-4 d-flex justify-content-center">
                    <Card className="mt-3 d-flex flex-column custom-card" style={{ minHeight: '350px', maxWidth: '300px', minWidth: '300px' }}>
                        <Card.Body className="flex-grow-1 d-flex flex-column">
                            <Card.Title>{movie.title}</Card.Title>
                            <Card.Text></Card.Text>
                            
                            <Card.Subtitle>Director: {movie.director}</Card.Subtitle>
                            <Card.Text></Card.Text>
                            
                            <Card.Subtitle>Year: {movie.year}</Card.Subtitle>
                            <Card.Text></Card.Text>

                            <Card.Subtitle>Description: </Card.Subtitle>
                            <Card.Text>{movie.description}</Card.Text>
                            

                        </Card.Body>
                        <Card.Footer className="d-flex justify-content-between custom-footer">
                        <Card.Subtitle className="my-auto">Genre: {movie.genre}</Card.Subtitle>
                            <CardActions 
                                movieId={movie._id}
                                onComplete={fetchData}
                                onDelete={fetchData}
                            />
                        </Card.Footer>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}
