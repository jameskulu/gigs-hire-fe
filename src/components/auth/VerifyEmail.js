import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const VerifyEmail = (props) => {
    // const token = props.match.params.token;
    let { token } = useParams();
    console.log(token);
    const [message, setMessage] = useState();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                await axios.post(
                    `${process.env.REACT_APP_SERVER_URL}/accounts/email-activate/`,
                    {
                        token,
                    }
                );
                setMessage('Your account has been verified');
            } catch (err) {
                setMessage('Your token in invalid or expired');
            }
        };
        verifyEmail();
    }, []);

    return (
        <div className="form-container" style={{ textAlign: 'center' }}>
            <h4>{message}</h4>
            <Link to="/login">
                <button type="submit" className="btn btn-primary">
                    GO TO LOGIN
                </button>
            </Link>
        </div>
    );
};

export default VerifyEmail;
