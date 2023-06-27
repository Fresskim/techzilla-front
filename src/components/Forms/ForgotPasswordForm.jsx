import { Form, Button } from 'react-bootstrap'
import { ENDPOINTS, apiCall } from '../../lib/Api'
import { useState } from 'react'
import ErrorAlert from '../Alerts/ErrorAlert'
import { EMAIL_REGEX } from '../../lib/constants'

function ForgotPasswordForm({ onSuccess }) {
    const [errorMessages, setErrorMessages] = useState([])
    const [email, setEmail] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errors = []
        if (!email) {
            errors.push('Email cannot be empty!')
        }
        if (!EMAIL_REGEX.test(email)) {
            errors.push('Email is not valid!')
        }
        if (errors.length) {
            setErrorMessages(errors)
            return
        }

        const data = {
            email
        }
        const response = await apiCall(ENDPOINTS.forgotPasswordRequest, { data })
        console.log(response)
        if (response.confirm) {
            onSuccess()
        }
        else {
            setErrorMessages(['Something went wrong!'])
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
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default ForgotPasswordForm
