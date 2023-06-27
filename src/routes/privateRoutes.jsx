import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


const PrivateRoutes = ({ children }) => {
    const auth = useSelector((state) => state.auth.value)
    const navigate = useNavigate()
    useEffect(() => {
        if (!auth) {
            navigate('/login')
        }
    }, [auth, navigate])

    return !auth ? null : children

}

export default PrivateRoutes