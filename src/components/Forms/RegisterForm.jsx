import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../lib/constants'
import { ENDPOINTS, apiCall } from '../../lib/Api'
import ErrorAlert from '../../components/Alerts/ErrorAlert'

function RegisterForm({ setRegistered }) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessages, setErrorMessages] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const errors = []

        if (!firstName) {
            errors.push('First Name cannot be empty!')
        }
        if (!lastName) {
            errors.push('Last Name cannot be empty!')
        }
        if (!email) {
            errors.push('Email cannot be empty!')
        }
        if (!EMAIL_REGEX.test(email)) {
            errors.push('Email is not valid!')
        }
        if (!password) {
            errors.push('Password cannot be empty!')
        }
        if (!PASSWORD_REGEX.test(password)) {
            errors.push('Password is not strong enough!')
        }
        if (password !== confirmPassword) {
            errors.push('Passwords do not match')
        }
        if (errors.length) {
            setErrorMessages(errors)
            return
        }

        const data = {
            firstName,
            lastName,
            email,
            password,
        }
        const response = await apiCall(ENDPOINTS.register, { data })
        if (response.confirm) {
            setRegistered()
        } else {
            setErrorMessages(['Something went wrong!'])
        }
    }

    return (
        <>
            <ErrorAlert messages={errorMessages} />
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        value={firstName}
                        onChange={(e) => {
                            setFirstName(e.target.value)
                        }}
                        type="text"
                        placeholder="First Name"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        value={lastName}
                        onChange={(e) => {
                            setLastName(e.target.value)
                        }}
                        type="text"
                        placeholder="Last Name"
                    />
                </Form.Group>

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
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value)
                        }}
                        type="password"
                        placeholder="Confirm Password"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <p>Already have and account? <a href="/login">Sign In</a></p>
            </Form>
        </>
    )
}

export default RegisterForm
