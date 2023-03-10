
import { useContext } from "react"
import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: "register", element: <Register />},
            {path: "login", element: <Login />},
            {path: "home", element: <Home />}
        ]
    }
])