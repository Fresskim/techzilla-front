import { Row, Col } from 'react-bootstrap'
import withLayouts from '../../HOC/withLayouts'
import ForgotPasswordForm from '../../components/Forms/ForgotPasswordForm'
import { useState } from 'react'
import styles from './forgotPassword.module.scss'


function ForgotPassword() {
    const [requestSend, setRequestSend] = useState(false)

    const handleSuccess = () => {
        setRequestSend(true)
    }
    return (
        <Row className={styles.forgotContainer}>
            <Col md={12}>
                <h1>Forgot Password</h1>
            </Col>
            <Col md={6}>{requestSend ? <h2>An email was sent to you with further instructions!</h2> : <ForgotPasswordForm onSuccess={handleSuccess} />}</Col>
        </Row>
    )
}
export default withLayouts(ForgotPassword)
