import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { TextField } from './TextField';
import { toast } from 'react-toastify';
import UserContext from '../../context/UserContext';

const Signup = () => {
    const navigate = useNavigate();
    const { userData, setUserData } = useContext(UserContext);

    const handleLoginUser = async (values) => {
        try {
            const data = {
                email: values.email,
                password: values.password,
            };

            const loginResponse = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/accounts/login/`,
                data
            );
            setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.data,
            });
            localStorage.setItem('auth-token', loginResponse.data.token);
            toast.success('You are logged in successfully.');
            navigate('/');
        } catch (err) {
            console.log(err.response.data.details);
            toast.error(err.response.data.details);
        }
    };

    const userSchema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required('Password is required'),
    });

    const formikInitializer = {
        email: '',
        password: '',
    };

    return (
        <Formik
            initialValues={formikInitializer}
            validationSchema={userSchema}
            onSubmit={(values) => handleLoginUser(values)}
        >
            {(formik) => (
                <div>
                    <h1>Login</h1>
                    <Form>
                        <div class="form-group">
                            <TextField
                                label="Email address"
                                name="email"
                                type="email"
                                class="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                            />
                        </div>
                        <div class="form-group">
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                class="form-control"
                                id="exampleInputPassword1"
                            />
                        </div>
                        <p>
                            <Link to="/forgot-password">Forgot Password ?</Link>
                        </p>
                        <button type="submit" class="btn btn-primary">
                            Login
                        </button>
                    </Form>
                    <p>
                        Do not have an account?{' '}
                        <Link to="/signup">Sign Up</Link>
                    </p>
                </div>
            )}
        </Formik>
    );
};

export default Signup;
