import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { ENDPOINTS, apiCall } from '../../lib/Api'
import ErrorAlert from '../../components/Alerts/ErrorAlert'


function LoginForm({ onSuccess }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessages, setErrorMessages] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errors = []
        if (!email) {
            errors.push('Email cannot be empty!')
        }
        if (!password) {
            errors.push('Password cannot be empty!')
        }
        if (errors.length) {
            setErrorMessages(errors)
            return
        }
        const data = {
            email,
            password,
        }
        const response = await apiCall(ENDPOINTS.login, { data })
        console.log('API Response:', response);

        if (response.confirm) {
            onSuccess(response.results)
        } else {
            setErrorMessages([[response.results.message]])
        }
    }

    return (
        <>
            <ErrorAlert messages={errorMessages} />
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        type="email"
                        placeholder="Enter email"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        type="password"
                        placeholder="Password"
                    />
                    <a className='forgotPassword' href='/forgot-password'>Forgot Password?</a>
                </Form.Group>


                <Button variant="primary" type="submit">
                    Submit
                </Button>

                <p>Don't have an account? <a href="/register">Sign up</a></p>
            </Form>
        </>
    )
}

export default LoginForm
