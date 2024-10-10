import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => {
    return (
        <header
            className="bg-dark text-white p-3"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 1000,
            }}
        >
            <nav className="navbar navbar-expand navbar-dark justify-content-between">
                <a className="navbar-brand" href="/">
                    <img
                        src="https://via.placeholder.com/40"
                        alt="Logo"
                        className="d-inline-block align-top"
                    />
                    Test Logo
                </a>

                <ul className="nav nav-pills">
                    <li className="nav-item dropdown">
                        <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            id="userDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <img
                                src="https://via.placeholder.com/30"
                                alt="User Icon"
                                className="rounded-circle"
                            />{' '}
                            @ymeichtry
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                            <li className="px-3 py-2">
                                <div className="d-flex align-items-center">
                                    <img
                                        src="https://via.placeholder.com/40"
                                        alt="User Profile"
                                        className="rounded-circle"
                                    />
                                    <div className="ms-3">
                                        <h6 className="mb-0">@ymeichtry</h6>
                                        <small>test@gmail.com</small>
                                    </div>
                                </div>
                            </li>
                            <hr className="dropdown-divider" />
                            <li>
                                <a className="dropdown-item" href="/profile">
                                    Profile Settings
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="/support">
                                    Customer Support
                                </a>
                            </li>
                            <hr className="dropdown-divider" />
                            <li>
                                <a className="dropdown-item text-danger" href="/logout">
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
