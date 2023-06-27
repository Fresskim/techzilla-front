import Header from '../layouts/header/header'
import Footer from '../layouts/footer/footer'
import { Container } from 'react-bootstrap'


const withLayouts = (Component, data = 'public') => {
    return (props) => {
        return (
            <>
                {data === 'auth' ? <h1>AuthLogin</h1> : <Header />}

                <Container>
                    <Component {...props} />
                </Container>
                <Footer />
            </>
        )
    }
}
export default withLayouts