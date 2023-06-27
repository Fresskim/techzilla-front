import withLayouts from '../../HOC/withLayouts'
import { Row, Col } from 'react-bootstrap'
import LoginForm from '../../components/Forms/LoginForm'
import { useDispatch } from 'react-redux'
import { login } from '../../store/slices/authSlice'
import styles from './login.module.scss'


const Login = () => {
    const dispatch = useDispatch()
    const onLoginSuccess = (results) => {
        dispatch(login(results))

    }

    return (
        <Row className={styles.loginContainer}>
            <Col md={12}>
                <h1>Login</h1>
            </Col>
            <Col md={6}>
                <LoginForm onSuccess={onLoginSuccess} />
            </Col>
        </Row>
    )
}

export default withLayouts(Login)
