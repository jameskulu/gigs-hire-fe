import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { TextField } from './TextField';

const ForgotPassword = () => {
    const userSchema = yup.object().shape({
        email: yup.string().email().required(),
    });

    const formikInitializer = {
        email: '',
    };

    const handleForgotPassword = async (values) => {
        const email = values.email;
        try {
            await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/accounts/forgot-password/`,
                {
                    email,
                }
            );
            values.email = '';
            toast.success('Link has been sent to your email.');
        } catch (err) {
            toast.error(`${err.response.data.message}`);
            console.log(err);
        }
    };

    return (
        <div class="auth-container">
            <Formik
                initialValues={formikInitializer}
                validationSchema={userSchema}
                onSubmit={(values) => handleForgotPassword(values)}
            >
                {(formik) => (
                    <div class="forget-form-container">
                        <h1>FORGET PASSWORD?</h1>

                        <div class="forget-form">
                            <p id="text-sec">
                                Don’t worry! Resetting your password is easy.
                                Enter your email address that you had provided
                                during register.
                            </p>
                            <Form>
                                <TextField
                                    label="Email address"
                                    name="email"
                                    type="email"
                                    class="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                />

                                <button
                                    type="submit"
                                    class="btn btn-primary mt-2"
                                >
                                    SEND
                                </button>
                            </Form>
                        </div>

                        <p>
                            Remember your password?{' '}
                            <Link to="/login">Login</Link>
                        </p>
                    </div>
                )}
            </Formik>
        </div>
    );
};

export default ForgotPassword;
