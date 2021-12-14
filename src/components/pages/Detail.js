import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';

const Detail = (props) => {
    let { id } = useParams();
    const [singleMusician, setSingleMusician] = useState([]);

    const enquirySchema = yup.object().shape({
        email: yup.string().email().required(),
        message: yup.string().required(),
    });

    const formikInitializer = {
        email: '',
        message: '',
    };

    useEffect(() => {
        const displayMusician = async () => {
            const musiciansResponse = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/musicians/${id}`
            );
            setSingleMusician(musiciansResponse.data.data);
            console.log(musiciansResponse.data.data);
        };
        displayMusician();
    }, []);

    const handleEnquiry = async (values) => {
        try {
            const data = {
                recipient: singleMusician.email,
                email: values.email,
                message: values.message,
            };
            await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/musicians/send-enquiry/`,
                data
            );
            toast.success('Enquiry sent.');
        } catch (err) {
            console.log(err.response.data.details);
            toast.error(err.response.data.details);
        }
    };
    return (
        <>
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">
                        {singleMusician.firstName} {singleMusician.lastName}
                    </h3>
                    <h6 class="card-subtitle">
                        {singleMusician.category
                            ? singleMusician.category.name
                            : ''}
                    </h6>
                    <div class="row">
                        <div class="col-lg-5 col-md-5 col-sm-6">
                            <div class="white-box text-center">
                                <img
                                    src="https://via.placeholder.com/300x300/00CED1/000000"
                                    class="img-responsive"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div class="col-lg-7 col-md-7 col-sm-6">
                            <h4 class="box-title mt-5">About</h4>
                            <p>{singleMusician.about}</p>
                            <h2 class="mt-5">Rs. {singleMusician.price}</h2>
                            <button
                                type="button"
                                class="btn btn-primary"
                                data-toggle="modal"
                                data-target="#exampleModal"
                                data-whatever="@mdo"
                            >
                                Enquiry
                            </button>
                            {/* <h3 class="box-title mt-5">Key Highlights</h3>
                        <ul class="list-unstyled">
                            <li>
                                <i class="fa fa-check text-success"></i>
                                Sturdy structure
                            </li>
                            <li>
                                <i class="fa fa-check text-success"></i>
                                Designed to foster easy portability
                            </li>
                            <li>
                                <i class="fa fa-check text-success"></i>
                                Perfect furniture to flaunt your wonderful
                                collectibles
                            </li>
                        </ul> */}
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <h3 class="box-title mt-5">General Info</h3>
                            <div class="table-responsive">
                                <table class="table table-striped table-product">
                                    <tbody>
                                        <tr>
                                            <td width="390">Name</td>
                                            <td>
                                                {singleMusician.firstName}{' '}
                                                {singleMusician.lastName}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>{singleMusician.email}</td>
                                        </tr>
                                        <tr>
                                            <td>Profession</td>
                                            <td>
                                                {singleMusician.category
                                                    ? singleMusician.category
                                                          .name
                                                    : ''}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Price</td>
                                            <td>Rs. {singleMusician.price}</td>
                                        </tr>
                                        <tr>
                                            <td>Gender</td>
                                            <td>{singleMusician.gender}</td>
                                        </tr>
                                        <tr>
                                            <td>Phone Number</td>
                                            <td>
                                                {singleMusician.phone_number}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Address</td>
                                            <td>{singleMusician.address}</td>
                                        </tr>
                                        <tr>
                                            <td>City</td>
                                            <td>{singleMusician.city}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                New message
                            </h5>
                            <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <Formik
                            initialValues={formikInitializer}
                            validationSchema={enquirySchema}
                            onSubmit={(values) => handleEnquiry(values)}
                        >
                            {(formik) => (
                                <Form>
                                    <div class="modal-body">
                                        <div class="form-group">
                                            <label
                                                for="recipient-name"
                                                class="col-form-label"
                                            >
                                                Recipient:
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="recipient-name"
                                                name="recipient"
                                                disabled
                                                value={singleMusician.email}
                                            />
                                            <p className="error">
                                                <ErrorMessage name="recipient" />
                                            </p>
                                        </div>
                                        <div class="form-group">
                                            <label
                                                for="email"
                                                class="col-form-label"
                                            >
                                                Email:
                                            </label>
                                            <Field
                                                type="text"
                                                class="form-control"
                                                id="email"
                                                name="email"
                                            />
                                            <p className="error">
                                                <ErrorMessage name="email" />
                                            </p>
                                        </div>
                                        <div class="form-group">
                                            <label
                                                for="message-text"
                                                class="col-form-label"
                                            >
                                                Message:
                                            </label>
                                            <Field
                                                class="form-control"
                                                id="message-text"
                                                as="textarea"
                                                name="message"
                                            />
                                            <p className="error">
                                                <ErrorMessage name="message" />
                                            </p>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button
                                            type="button"
                                            class="btn btn-secondary"
                                            data-dismiss="modal"
                                        >
                                            Close
                                        </button>
                                        <button
                                            type="submit"
                                            class="btn btn-primary"
                                        >
                                            Send message
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Detail;
