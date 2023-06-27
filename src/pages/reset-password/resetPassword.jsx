import withLayouts from '../../HOC/withLayouts'
import { Row, Col } from 'react-bootstrap'
import ResetPasswordForm from '../../components/Forms/ResetPasswordForm'
import { useState } from 'react'

function ResetPassword() {
    const [passwordReset, setPasswordReset] = useState(false)

    const handleSuccess = () => {
        setPasswordReset(true)
    }

    return (
        <Row>
            <Col md={12}>
                <h1>Register</h1>
            </Col>
            <Col md={6}>{passwordReset ? <h3>Your password was successfully changed</h3> : <ResetPasswordForm onSuccess={handleSuccess} />}</Col>
        </Row>
    )
}
export default withLayouts(ResetPassword)
