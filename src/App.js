import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserContext from './context/UserContext';

import Header from './components/layouts/Header';
import Home from './components/pages/Home';
import Detail from './components/pages/Detail';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import VerifyEmail from './components/auth/VerifyEmail';
import ForgotPassword from './components/auth/ForgotPassword';

import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ResetPassword from './components/auth/ResetPassword';

toast.configure();
function App() {
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
    });

    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem('auth-token');

            if (token === null) {
                localStorage.setItem('auth-token', '');
                token = '';
            }

            const tokenResponse = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/accounts/valid-token/`,
                null,
                { headers: { Authorization: 'Bearer ' + token } }
            );

            if (tokenResponse.data.valid) {
                const userResponse = await axios.get(
                    `${process.env.REACT_APP_SERVER_URL}/accounts/musicians/`,
                    { headers: { Authorization: 'Bearer ' + token } }
                );

                setUserData({
                    token,
                    user: userResponse.data.data,
                });
            }
        };

        checkLoggedIn();
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <UserContext.Provider value={{ userData, setUserData }}>
                    <Header />
                    <div className="container mt-2">
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route
                                exact
                                path="/musicians/:id"
                                element={<Detail />}
                            />
                            <Route exact path="/signup" element={<Signup />} />
                            <Route exact path="/login" element={<Login />} />
                            <Route
                                exact
                                path="/verify-email/:token"
                                element={<VerifyEmail />}
                            />
                            <Route
                                exact
                                path="/forgot-password"
                                element={<ForgotPassword />}
                            />
                            <Route
                                exact
                                path="/reset-password/:token"
                                element={<ResetPassword />}
                            />
                        </Routes>
                    </div>
                </UserContext.Provider>
            </BrowserRouter>
        </div>
    );
}

export default App;
