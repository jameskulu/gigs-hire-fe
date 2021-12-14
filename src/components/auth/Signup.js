import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { TextField } from './TextField';
import { toast } from 'react-toastify';

const Signup = () => {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const displayCategories = async () => {
            const categoriesResponse = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/categories/`
            );
            setCategories(categoriesResponse.data.data);
        };
        displayCategories();
    }, []);

    const handleSignupUser = async (values) => {
        try {
            const data = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
                category: parseInt(values.profession),
            };

            await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/accounts/register/`,
                data
            );
            toast.success(
                'Your account is created successfully. Please check your email for verification.'
            );
            navigate('/login');
        } catch (err) {
            console.log(err.response.data.details.email[0]);
            toast.error(err.response.data.details.email[0]);
        }
    };

    const userSchema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().email().required(),
        password: yup
            .string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Password must match')
            .required('Confirm password is required'),
        profession: yup.number().required(),
    });

    const formikInitializer = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        profession: '',
    };

    return (
        // <Formik onSubmit={handleSignupUser}>
        <Formik
            initialValues={formikInitializer}
            validationSchema={userSchema}
            onSubmit={(values) => handleSignupUser(values)}
        >
            {(formik) => (
                <div>
                    {/* {console.log(formik)} */}
                    <h1>Sign Up</h1>
                    <Form>
                        <div class="form-group">
                            {/* <label for="exampleInputEmail1">First Name</label> */}
                            <TextField
                                label="First Name"
                                name="firstName"
                                type="text"
                                class="form-control"
                                id="exampleInputFirstName1"
                                // value={firstName}
                                // onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div class="form-group">
                            {/* <label for="exampleInputEmail1">Last Name</label> */}
                            <TextField
                                label="Last Name"
                                name="lastName"
                                type="text"
                                class="form-control"
                                id="exampleInputLastName1"
                                // value={lastName}
                                // onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div class="form-group">
                            {/* <label for="exampleInputEmail1">Email address</label> */}
                            <TextField
                                label="Email address"
                                name="email"
                                type="email"
                                class="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                // value={email}
                                // onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div class="form-group">
                            {/* <label for="exampleInputPassword1">Password</label> */}
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                class="form-control"
                                id="exampleInputPassword1"
                                // value={password}
                                // onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div class="form-group">
                            {/* <label for="exampleInputPassword2">
                            Confirm Password
                        </label> */}
                            <TextField
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                class="form-control"
                                id="exampleInputPassword2"
                                // value={confirmPassword}
                                // onChange={(e) =>
                                //     setConfirmPassword(e.target.value)
                                // }
                            />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword2">
                                Profession
                            </label>

                            <Field
                                name="profession"
                                as="select"
                                className="form-control"
                            >
                                <option selected="true" disabled="disabled">
                                    -- select a sub category --
                                </option>
                                {categories.map((category) => {
                                    return (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    );
                                })}
                            </Field>
                            <p className="error">
                                <ErrorMessage name="profession" />
                            </p>
                        </div>
                        <button type="submit" class="btn btn-primary mt-2">
                            Sign Up
                        </button>
                    </Form>

                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            )}
        </Formik>
    );
};

export default Signup;
