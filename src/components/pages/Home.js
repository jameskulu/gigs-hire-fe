import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [musicians, setMusicians] = useState([]);

    useEffect(() => {
        const displayMusicians = async () => {
            const musiciansResponse = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/musicians/`
            );
            setMusicians(musiciansResponse.data.data);
            console.log(musiciansResponse.data.data);
        };
        displayMusicians();
    }, []);
    return (
        <div>
            <div className="jumbotron">
                <h1 className="display-4">Hello, world!</h1>
                <p className="lead">
                    This is a simple hero unit, a simple jumbotron-style
                    component for calling extra attention to featured content or
                    information.
                </p>
                <hr className="my-4" />
                <p>
                    It uses utility classes for typography and spacing to space
                    content out within the larger container.
                </p>
                <p className="lead">
                    <Link
                        className="btn btn-primary btn-lg"
                        to="/"
                        role="button"
                    >
                        Learn more
                    </Link>
                </p>
            </div>

            <h2>Professionals</h2>
            <div className="row hidden-md-up">
                {musicians.map((musician) => (
                    <div className="col-md-4 mb-3">
                        <div className="card p-3">
                            <div className="card-block">
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <h4 className="card-title">
                                        {musician.firstName} {musician.lastName}
                                    </h4>
                                    <h4 className="text-primary">
                                        <strong>Rs. {musician.price}</strong>
                                    </h4>
                                </div>
                                <h6 className="card-subtitle text-muted">
                                    {musician.category.name}
                                </h6>
                                <p className="card-text p-y-1">
                                    {musician.about}
                                </p>
                                <Link
                                    to={`/musicians/${musician.id}`}
                                    className="card-link"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
