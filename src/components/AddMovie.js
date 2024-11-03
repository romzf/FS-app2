// src/components/AddMovie.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Notyf } from 'notyf';

export default function AddMovie({ show, handleClose, fetchData, moviesData }){
    const notyf = new Notyf();
    const [title, setTitle] = useState('');
    const [director, setDirector] = useState('');
    const [year, setYear] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');
    const [error, setError] = useState('');

    const handleAddMovie = (e) => {
        e.preventDefault();

        // Check for duplicate title
        const duplicate = moviesData?.some(movie => movie.title === title);
        if (duplicate) {
            setError('Movie title already exists. Please choose a different title.');
            return;
        } else {
            setError('');
        }

        fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/addMovie`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                title,
                director,
                year,
                description,
                genre
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data) {
                console.log('Movie added:', data);
                fetchData(); // Refresh the movie list
                handleClose();
                notyf.success('Movie added successfully');
            }
        })
        .catch(err => {
            console.error('Error adding movie:', err);
            notyf.error('Error adding movie. Please try again.');
        });
    };

    return (
        <Modal show={show} onHide={handleClose} dialogClassName="modal-dialog-centered">
            <Modal.Header closeButton className='custom-modal'>
                <Modal.Title className='mx-auto me-2'>Add Movie</Modal.Title>
            </Modal.Header>
            <Modal.Body className='custom-modal'>
                <Form onSubmit={handleAddMovie}>
                    <Form.Group controlId="movieTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter movie title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="bg-secondary text-white"
                        />
                    </Form.Group>
                    <Form.Group controlId="movieDirector">
                        <Form.Label>Director</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter director's name"
                            value={director}
                            onChange={(e) => setDirector(e.target.value)}
                            required
                            className="bg-secondary text-white"
                        />
                    </Form.Group>
                    <Form.Group controlId="movieYear">
                        <Form.Label>Year</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter release year"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            required
                            className="bg-secondary text-white"
                        />
                    </Form.Group>
                    <Form.Group controlId="movieDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter movie description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="bg-secondary text-white"
                        />
                    </Form.Group>
                    <Form.Group controlId="movieGenre">
                        <Form.Label>Genre</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter movie genre"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            required
                            className="bg-secondary text-white"
                        />
                    </Form.Group>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Button variant="primary" type="submit" className="mt-3 me-2">
                        Add Movie
                    </Button>
                    <Button variant="secondary" className="mt-3" onClick={handleClose}>
                        Close
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};




