// src/pages/Movies.js
import { useEffect, useState, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import Loading from '../components/Loading';
import AdminView from '../components/AdminView';
import UserView from '../components/UserView';
import AddMovie from '../components/AddMovie';

export default function Movies() {
    const [loading, setLoading] = useState(true);
    const [moviesData, setMoviesData] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showAddMovie, setShowAddMovie] = useState(false);
    const token = localStorage.getItem('token');

    const fetchData = useCallback(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/getMovies`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setMoviesData(data.movies || []);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching movies:', err);
                setLoading(false);
            });
    }, [token]);

    const fetchUserDetails = useCallback(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setIsAdmin(data.user.isAdmin);
            })
            .catch(err => {
                console.error('Error fetching user details:', err);
            });
    }, [token]);

    useEffect(() => {
        fetchUserDetails();
        fetchData();
    }, [fetchData, fetchUserDetails]);

    if (!token) {
        return <Navigate to="/login" />;
    }

    const handleShowAdd = () => setShowAddMovie(true);
    const handleCloseAdd = () => setShowAddMovie(false);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <div className="d-flex justify-content-center pt-3">
                        <h1 className="text-light">Movies</h1>
                    </div>
                    {moviesData.length > 0 ? (
                        isAdmin ? (
                            <AdminView movies={moviesData} handleShowAdd={handleShowAdd} />
                        ) : (
                            <UserView movies={moviesData} fetchData={fetchData} />
                        )
                    ) : (
                        <div className="d-flex flex-column align-items-center">
                            <img src="/EmptyWorkout.png" alt="EmptyWorkout..." className="EmptyWorkout img-fluid" />
                            <h3 className="d-flex justify-content-center mt-2 text-light">
                                Movie list is Empty.
                            </h3>
                        </div>
                    )}
                    <AddMovie show={showAddMovie} handleClose={handleCloseAdd} fetchData={fetchData} moviesData={moviesData} />
                </>
            )}
        </>
    );
}
