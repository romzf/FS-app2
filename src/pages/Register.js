// pages/Register.js
import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';

export default function Register() {
    const notyf = new Notyf();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isActive, setIsActive] = useState(false); 

    useEffect(() => {

        if (email.includes('@') && password.length >= 8 && password === confirmPassword) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [email, password, confirmPassword]);

    function registerUser(e) {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            if (data.message === "Registered Successfully") {
                // Clear form fields on success
                setEmail('');
                setPassword('');
                setConfirmPassword('');

                notyf.success('Registration successful');
                navigate('/login');

            } else {
                // Handle specific backend messages
                notyf.error(data.message || 'Something went wrong');
            }
        })
        .catch(() => notyf.error('Network error'));
    }

    return (
        <div className="container d-flex justify-content-center pt-5" style={{ minHeight: '350px' }}>
            <Form onSubmit={registerUser} className='form form-border w-100 form-bg' style={{ maxWidth: '400px' }}>
                <h1 className="my-4 mt-1 text-center text-light">Register</h1>

                <Form.Group controlId="userEmail">
                    <Form.Label className='text-light'>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="password" className='mb-2'>
                    <Form.Label className='text-light'>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="confirmPassword" className='mb-5'>
                    <Form.Label className='text-light'>Confirm Password:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        required
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant={isActive ? "primary" : "danger"} type="submit" disabled={!isActive}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}
