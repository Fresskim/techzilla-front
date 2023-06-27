import withLayouts from '../../HOC/withLayouts'
import { Row, Col } from 'react-bootstrap'
import RegisterForm from '../../components/Forms/RegisterForm'
import { useState } from 'react'
import styles from './register.module.scss'

const Register = () => {
    const [isRegistered, setIsRegistered] = useState(false)

    return (
        <Row className={styles.registerContainer}>
            <Col md={12}>
                {isRegistered ? (
                    <h3 style={{ color: 'green' }}>Registration successful!</h3>
                ) : (
                    <h1>Register</h1>
                )}
            </Col>
            <Col md={6}>
                {isRegistered ? (
                    <p>An email has been sent to you to verify your account. Please check your inbox and follow the instructions to complete the verification process.</p>
                ) : (
                    <RegisterForm
                        setRegistered={() => {
                            setIsRegistered(true)
                        }}
                    />
                )}
            </Col>
        </Row>
    )
}

export default withLayouts(Register)
