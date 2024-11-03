import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import '../App.css';

export default function AdminView({ movies, handleShowAdd }) {
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

    const getSortedMovies = () => {
        if (!sortConfig.key) return movies.slice().reverse();

        return [...movies].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    };

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const resetSort = () => {
        setSortConfig({ key: '', direction: '' });
    };

    const sortedMovies = getSortedMovies();

    return (
        <>
            <div className="d-flex justify-content-center mb-3">
                <Button id="AddMovie" variant="success" onClick={handleShowAdd}>
                    Add Movie
                </Button>
            </div>
            <div className="table-responsive mx-5">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th onClick={() => requestSort('title')} className="sortable" style={{ cursor: 'pointer' }}>Title</th>
                            <th onClick={() => requestSort('director')} className="sortable" style={{ cursor: 'pointer' }}>Director</th>
                            <th onClick={() => requestSort('year')} className="sortable" style={{ cursor: 'pointer' }}>Year</th>
                            <th onClick={() => requestSort('genre')} className="sortable" style={{ cursor: 'pointer' }}>Genre</th>
                            <th className="sortable" 
                                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 0, }}>
                                <div onClick={() => requestSort('description')}
                                    style={{ cursor: 'pointer', flexGrow: 1, padding: '10px', height: '100%', display: 'flex', alignItems: 'center', }}>
                                    Description
                                </div>
                                <Button variant="btn" className="btn-sm reset-button" 
                                    onClick={(e) => {  e.stopPropagation(); resetSort(); }}
                                    style={{ marginRight: '10px', padding: '8px' }}>
                                    Reset
                                </Button>
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {sortedMovies.map(movie => (
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.director}</td>
                                <td>{movie.year}</td>
                                <td>{movie.genre}</td>
                                <td>{movie.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}
