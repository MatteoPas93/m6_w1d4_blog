import React, {useState} from 'react'
import AxiosClient from '../../fetch/fetch';
import {useNavigate} from "react-router-dom";
import './Login.css';
// import { isAuthorized } from '../../middleware/ProtectedRoute';

const Login = () => {
    const client = new AxiosClient()
    const [formData, setFormData] = useState({})

    const navigate = useNavigate()

    const onChangeInput = (e) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const response = await client.post('/login', formData)
        if (response.token) {
            localStorage.setItem('auth', JSON.stringify(response.token))
            setTimeout(() => {
                // if(isAuthorized()) {
                navigate('/home')
            // }
            },1500)
        }
    }

    const handleGitHubLogin = () => {
        window.location.href = `${process.env.REACT_APP_SERVER_BASE_URL}/auth/github`
    }

    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center text-dark mt-5">
                        Epibooks Login
                    </h2>
                    <div className="card my-5 w-100">
                        <form
                            onSubmit={onSubmit}
                            className="card-body cardbody-color p-lg-5">
                            <div className="text-center">
                                <img
                                    src="https://picsum.photos/340/340"
                                    className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                                    width="200px"
                                    alt="profile"
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    onChange={onChangeInput}
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    aria-describedby="emailHelp"
                                    placeholder="Inserisci la tua email..."
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    onChange={onChangeInput}
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Inserisci la tua password"
                                />
                            </div>

                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="btn btn-primary px-5 mb-5 w-100"
                                >
                                    Login
                                </button>
                            </div>

                            <div
                                id="emailHelp"
                                className="form-text text-center mb-5 text-dark"
                            >
                                Non sei registrato?
                                <a href="http:" className="text-dark fw-bold ms-1">
                                    Registrati ora o accedi con:
                                </a>
                            </div>
                            <button type='button' className='button-github' onClick={handleGitHubLogin}>
                                <img id='github-img' src="https://tse3.mm.bing.net/th?id=OIP.Sfgbqcg35rCru0YB-IQwxgHaD4&pid=Api&P=0&h=180" alt='GitHub' /> Git Hub</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
