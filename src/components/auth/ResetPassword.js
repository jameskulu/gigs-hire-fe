import axios from 'axios';
import React, { useState } from 'react';
import { useHistory, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { TextField } from './TextField';

const ResetPassword = (props) => {
    const navigate = useNavigate();

    const userSchema = yup.object().shape({
        newPassword: yup
            .string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('newPassword'), null], 'Password must match')
            .required('Confirm password is required'),
    });

    const formikInitializer = {
        newPassword: '',
        confirmPassword: '',
    };

    let { token } = useParams();

    const handleResetPassword = async (values) => {
        console.log(values);
        const newPassword = values.newPassword;
        try {
            await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/accounts/reset-password/`,
                {
                    newPassword,
                    token,
                }
            );
            toast.success('New password has been changed successfully.');
            navigate('/login');
        } catch (err) {
            toast.error(`${err.response.data.message}`);
        }
    };

    return (
        <div class="auth-container">
            <Formik
                initialValues={formikInitializer}
                validationSchema={userSchema}
                onSubmit={(values) => handleResetPassword(values)}
            >
                {(formik) => (
                    <div class="reset-form-container">
                        <h1>RESET PASSWORD?</h1>

                        <div class="reset-form">
                            <Form>
                                <TextField
                                    label="New Password"
                                    name="newPassword"
                                    type="password"
                                    class="form-control"
                                    id="exampleInputPassword1"
                                />
                                <TextField
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type="password"
                                    class="form-control"
                                    id="exampleInputPassword1"
                                />
                                <button type="submit" class="btn btn-primary">
                                    SAVE
                                </button>
                            </Form>
                        </div>
                    </div>
                )}
            </Formik>
        </div>
    );
};

export default ResetPassword;
