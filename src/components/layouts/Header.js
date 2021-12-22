import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import swal from 'sweetalert';
import { toast } from 'react-toastify';

const Header = () => {
    const { userData, setUserData } = useContext(UserContext);
    const navigate = useNavigate();

    const logout = () => {
        swal({
            title: 'Are you sure want to logout?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                setUserData({
                    token: undefined,
                    user: undefined,
                });
                localStorage.setItem('auth-token', '');
                navigate('/');
                toast.success('You are logged out successfully.');
            }
        });
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
                GigsHire
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
            >
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">
                            Home <span className="sr-only">(current)</span>
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link
                            className="nav-link dropdown-toggle"
                            to="#"
                            id="navbarDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            Dropdown
                        </Link>
                        <div
                            className="dropdown-menu"
                            aria-labelledby="navbarDropdown"
                        >
                            <Link className="dropdown-item" to="#">
                                Action
                            </Link>
                            <Link className="dropdown-item" to="#">
                                Another action
                            </Link>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="#">
                                Something else here
                            </Link>
                        </div>
                    </li>
                </ul>

                <form className="form-inline my-2 my-lg-0">
                    {userData.user ? (
                        <Link to="/signup">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item dropdown">
                                    <Link
                                        className="nav-link dropdown-toggle"
                                        to="#"
                                        id="navbarDropdown"
                                        role="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        Hi, {userData.user.firstName}
                                    </Link>
                                    <div
                                        className="dropdown-menu"
                                        aria-labelledby="navbarDropdown"
                                    >
                                        <Link className="dropdown-item" to="#">
                                            Manage Profile
                                        </Link>
                                        <Link className="dropdown-item" to="#">
                                            Change Password
                                        </Link>
                                        <div className="dropdown-divider"></div>
                                        <Link
                                            onClick={() => {
                                                logout();
                                            }}
                                            className="dropdown-item"
                                            to="#"
                                        >
                                            Logout
                                        </Link>
                                    </div>
                                </li>
                            </ul>
                        </Link>
                    ) : (
                        <Link to="/signup">
                            <button
                                className="btn btn-primary my-2 my-sm-0"
                                type="submit"
                            >
                                Become a Professional
                            </button>
                        </Link>
                    )}
                </form>
            </div>
        </nav>
    );
};

export default Header;
