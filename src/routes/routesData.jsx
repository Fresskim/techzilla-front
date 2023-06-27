import Login from '../pages/login'
import Register from '../pages/register'
import ForgotPassword from '../pages/forgot-password'
import VerifyAccount from '../pages/verify-account'
import Dashboard from '../pages/dashboard'
import ResetPassword from '../pages/reset-password'
import CartPage from '../pages/cart/cartPage'
import Admin from '../pages/admin/adminPanel'
import CategoryPage from '../pages/categoryPage/categoryPage'
import Wishlist from '../pages/wishlist/wishlist'

export const publicRoutes = [
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />,
    },
    {
        path: '/reset-password/:token',
        element: <ResetPassword />,
    },
    {
        path: '/verify-account/:token',
        element: <VerifyAccount />
    }

]



export const privateRoutes = [
    {
        path: '/dashboard',
        element: < Dashboard />,
    },
    {
        path: '/cart',
        element: < CartPage />
    },
    {
        path: '/wishlist',
        element: < Wishlist />
    },

    {
        path: '/admin',
        element: < Admin />
    }
]

export const exposedRoutes = [
    {
        path: '/',
        element: < Dashboard />,
    },
    {
        path: '/category/:categoryName',
        element: <CategoryPage />
    }
]