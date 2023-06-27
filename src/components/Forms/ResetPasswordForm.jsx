import { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import ErrorAlert from '../Alerts/ErrorAlert'
import { PASSWORD_REGEX } from '../../lib/constants'
import { useParams } from 'react-router-dom'
import { ENDPOINTS, apiCall } from '../../lib/Api'

function ResetPasswordForm({ onSuccess }) {
    const params = useParams()
    const [token, setToken] = useState('')
    const [errorMessages, setErrorMessages] = useState([])
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    useEffect(() => {
        setToken(params.token)
    }, [params])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errors = []
        if (!password) {
            errors.push('Password cannot be empty!')
        }
        if (!PASSWORD_REGEX.test(password)) {
            errors.push('Password is not strong!')
        }
        if (password !== confirmPassword) {
            errors.push('Passwords do not match')
        }
        if (!token) {
            errors.push('Token not valid!')
        }
        if (errors.length) {
            setErrorMessages(errors)
            return
        }
        const data = {
            password,
            token
        }
        const response = await apiCall(ENDPOINTS.resetPassword, { data })
        if (response.confirm) {
            onSuccess()
        } else {
            setErrorMessages(['Something went wrong!'])
        }
    }

    return (
        <>
            <ErrorAlert messages={errorMessages} />
            <Form onSubmit={handleSubmit}>
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
            </Form>
        </>
    )
}

export default ResetPasswordForm
