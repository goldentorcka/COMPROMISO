import React from "react";

const NavBarAdministrator = () => {
    return (
        <>
            {/* <div className="navbar-custom">
                <div className="topbar container-fluid">
                    <div className="d-flex align-items-center gap-lg-2 gap-1">
                        <div className="logo-topbar">
                            <a href="index.html" className="logo-light">
                                <span className="logo-lg">
                                    <img src="assets/images/logo.png" alt="logo" />
                                </span>
                                <span className="logo-sm">
                                    <img src="assets/images/logo-sm.png" alt="small logo" />
                                </span>
                            </a>

                            <a href="index.html" className="logo-dark">
                                <span className="logo-lg">
                                    <img src="assets/images/logo-dark.png" alt="dark logo" />
                                </span>
                                <span className="logo-sm">
                                    <img src="assets/images/logo-dark-sm.png" alt="small logo" />
                                </span>
                            </a>
                        </div>

                        <button className="button-toggle-menu">
                            <i className="mdi mdi-menu"></i>
                        </button>

                        <button
                            className="navbar-toggle"
                            data-bs-toggle="collapse"
                            data-bs-target="#topnav-menu-content"
                        >
                            <div className="lines">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </button>

                        <div className="app-search dropdown d-none d-lg-block">
                            <form>
                                <div className="input-group">
                                    <input
                                        type="search"
                                        className="form-control dropdown-toggle"
                                        placeholder="Search..."
                                        id="top-search"
                                    />
                                    <span className="mdi mdi-magnify search-icon"></span>
                                    <button className="input-group-text btn btn-primary" type="submit">
                                        Search
                                    </button>
                                </div>
                            </form>

                            <div className="dropdown-menu dropdown-menu-animated dropdown-lg" id="search-dropdown">
                                <div className="dropdown-header noti-title">
                                    <h5 className="text-overflow mb-2">
                                        Found <span className="text-danger">17</span> results
                                    </h5>
                                </div>

                                <a href="javascript:void(0);" className="dropdown-item notify-item">
                                    <i className="uil-notes font-16 me-1"></i>
                                    <span>Analytics Report</span>
                                </a>

                                <a href="javascript:void(0);" className="dropdown-item notify-item">
                                    <i className="uil-life-ring font-16 me-1"></i>
                                    <span>How can I help you?</span>
                                </a>

                                <a href="javascript:void(0);" className="dropdown-item notify-item">
                                    <i className="uil-cog font-16 me-1"></i>
                                    <span>User profile settings</span>
                                </a>

                                <div className="dropdown-header noti-title">
                                    <h6 className="text-overflow mb-2 text-uppercase">Users</h6>
                                </div>

                                <div className="notification-list">
                                    <a href="javascript:void(0);" className="dropdown-item notify-item">
                                        <div className="d-flex">
                                            <img
                                                className="d-flex me-2 rounded-circle"
                                                src="assets/images/users/avatar-2.jpg"
                                                alt="User Avatar"
                                                height="32"
                                            />
                                            <div className="w-100">
                                                <h5 className="m-0 font-14">Erwin Brown</h5>
                                                <span className="font-12 mb-0">UI Designer</span>
                                            </div>
                                        </div>
                                    </a>

                                    <a href="javascript:void(0);" className="dropdown-item notify-item">
                                        <div className="d-flex">
                                            <img
                                                className="d-flex me-2 rounded-circle"
                                                src="assets/images/users/avatar-5.jpg"
                                                alt="User Avatar"
                                                height="32"
                                            />
                                            <div className="w-100">
                                                <h5 className="m-0 font-14">Jacob Deo</h5>
                                                <span className="font-12 mb-0">Developer</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ul className="topbar-menu d-flex align-items-center gap-3">
                        <li className="dropdown d-lg-none">
                            <a
                                className="nav-link dropdown-toggle arrow-none"
                                data-bs-toggle="dropdown"
                                href="#"
                                role="button"
                                aria-haspopup="false"
                                aria-expanded="false"
                            >
                                <i className="ri-search-line font-22"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-animated dropdown-lg p-0">
                                <form className="p-3">
                                    <input
                                        type="search"
                                        className="form-control"
                                        placeholder="Search ..."
                                        aria-label="Search"
                                    />
                                </form>
                            </div>
                        </li>

                        <li className="dropdown">
                            <a
                                className="nav-link dropdown-toggle arrow-none"
                                data-bs-toggle="dropdown"
                                href="#"
                                role="button"
                                aria-haspopup="false"
                                aria-expanded="false"
                            >
                                <img
                                    src="assets/images/flags/us.jpg"
                                    alt="Language Flag"
                                    className="me-0 me-sm-1"
                                    height="12"
                                />
                                <span className="align-middle d-none d-lg-inline-block">English</span>
                                <i className="mdi mdi-chevron-down d-none d-sm-inline-block align-middle"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated">
                                <a href="javascript:void(0);" className="dropdown-item">
                                    <img
                                        src="assets/images/flags/germany.jpg"
                                        alt="German Flag"
                                        className="me-1"
                                        height="12"
                                    />
                                    <span className="align-middle">German</span>
                                </a>

                                <a href="javascript:void(0);" className="dropdown-item">
                                    <img
                                        src="assets/images/flags/italy.jpg"
                                        alt="Italian Flag"
                                        className="me-1"
                                        height="12"
                                    />
                                    <span className="align-middle">Italian</span>
                                </a>

                                <a href="javascript:void(0);" className="dropdown-item">
                                    <img
                                        src="assets/images/flags/spain.jpg"
                                        alt="Spanish Flag"
                                        className="me-1"
                                        height="12"
                                    />
                                    <span className="align-middle">Spanish</span>
                                </a>

                                <a href="javascript:void(0);" className="dropdown-item">
                                    <img
                                        src="assets/images/flags/russia.jpg"
                                        alt="Russian Flag"
                                        className="me-1"
                                        height="12"
                                    />
                                    <span className="align-middle">Russian</span>
                                </a>
                            </div>
                        </li>

                        <li className="dropdown notification-list">
                            <a
                                className="nav-link dropdown-toggle arrow-none"
                                data-bs-toggle="dropdown"
                                href="#"
                                role="button"
                                aria-haspopup="false"
                                aria-expanded="false"
                            >
                                <i className="ri-notification-3-line font-22"></i>
                                <span className="noti-icon-badge"></span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg py-0">
                                <div className="p-2 border-top-0 border-start-0 border-end-0 border-dashed border">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h6 className="m-0 font-16 fw-semibold">Notification</h6>
                                        </div>
                                        <div className="col-auto">
                                            <a href="javascript:void(0);" className="text-dark text-decoration-underline">
                                                <small>Clear All</small>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-2" style={{ maxHeight: "300px" }} data-simplebar="init">
                                    <div className="simplebar-wrapper">
                                        <div className="simplebar-content">
                                            <h5 className="text-muted font-13 fw-normal mt-2">Today</h5>

                                            <a href="javascript:void(0);" className="dropdown-item p-0 notify-item card unread-noti shadow-none mb-2">
                                                <div className="card-body">
                                                    <span className="float-end noti-close-btn text-muted">
                                                        <i className="mdi mdi-close"></i>
                                                    </span>
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-shrink-0">
                                                            <div className="notify-icon bg-primary">
                                                                <i className="mdi mdi-comment-account-outline"></i>
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow-1 text-truncate ms-2">
                                                            <h6 className="m-0">New comment on your post</h6>
                                                            <span className="text-muted font-12">10 min ago</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>

                                            <a href="javascript:void(0);" className="dropdown-item p-0 notify-item card shadow-none mb-2">
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-shrink-0">
                                                            <div className="notify-icon bg-secondary">
                                                                <i className="mdi mdi-account-circle"></i>
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow-1 text-truncate ms-2">
                                                            <h6 className="m-0">New user registered</h6>
                                                            <span className="text-muted font-12">1 hour ago</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div> */}
        </>
    );
};

export default NavBarAdministrator;
