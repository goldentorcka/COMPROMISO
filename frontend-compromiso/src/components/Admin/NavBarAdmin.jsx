import React from "react";

const NavBarAdministrator = () => {
    return (
        <>
            <div className="navbar-custom bg-light border-bottom">
                <div className="topbar container-fluid">
                    <div className="d-flex align-items-center gap-lg-2 gap-1">
                        <div className="logo-topbar">
                            <a href="index.html" className="logo-light">
                                <span className="logo-lg">Logo</span>
                            </a>

                            <a href="index.html" className="logo-dark">
                                <span className="logo-lg">Dark Logo</span>
                            </a>
                        </div>

                        <button className="button-toggle-menu bg-secondary text-light">
                            <i className="mdi mdi-menu"></i>
                        </button>

                        <button
                            className="navbar-toggle bg-secondary text-light"
                            data-bs-toggle="collapse"
                            data-bs-target="#topnav-menu-content"
                        >
                            <div className="lines">
                                <span className="line bg-light"></span>
                                <span className="line bg-light"></span>
                                <span className="line bg-light"></span>
                            </div>
                        </button>

                        <div className="app-search dropdown d-none d-lg-block">
                            <div className="dropdown-menu dropdown-menu-animated dropdown-lg">
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
                                            <div className="w-100">
                                                <h5 className="m-0 font-14">Erwin Brown</h5>
                                                <span className="font-12 mb-0">UI Designer</span>
                                            </div>
                                        </div>
                                    </a>

                                    <a href="javascript:void(0);" className="dropdown-item notify-item">
                                        <div className="d-flex">
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
                                <span className="align-middle d-none d-lg-inline-block">Language</span>
                                <i className="mdi mdi-chevron-down d-none d-sm-inline-block align-middle"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated">
                                <a href="javascript:void(0);" className="dropdown-item">
                                    <span className="align-middle">German</span>
                                </a>

                                <a href="javascript:void(0);" className="dropdown-item">
                                    <span className="align-middle">Italian</span>
                                </a>

                                <a href="javascript:void(0);" className="dropdown-item">
                                    <span className="align-middle">Spanish</span>
                                </a>

                                <a href="javascript:void(0);" className="dropdown-item">
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
                                                            <h5 className="noti-item-title fw-semibold font-14">Datacorp <small className="fw-normal text-muted ms-1">1 min ago</small></h5>
                                                            <small className="noti-item-subtitle text-muted">Caleb Flakelar commented on Admin</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>

                                            <h5 className="text-muted font-13 fw-normal mt-0">Yesterday</h5>

                                            <a href="javascript:void(0);" className="dropdown-item p-0 notify-item card read-noti shadow-none mb-2">
                                                <div className="card-body">
                                                    <span className="float-end noti-close-btn text-muted">
                                                        <i className="mdi mdi-close"></i>
                                                    </span>
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-shrink-0">
                                                            <div className="notify-icon bg-info">
                                                                <i className="mdi mdi-thumb-up"></i>
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow-1 text-truncate ms-2">
                                                            <h5 className="noti-item-title fw-semibold font-14">Admin <small className="fw-normal text-muted ms-1">2 days ago</small></h5>
                                                            <small className="noti-item-subtitle text-muted">Your recent admin rights have been updated</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <a href="javascript:void(0);" className="dropdown-item text-center text-primary notify-item notify-all">
                                    View all <i className="mdi mdi-arrow-right"></i>
                                </a>
                            </div>
                        </li>

                        <li className="dropdown">
                            <a
                                className="nav-link dropdown-toggle nav-user me-0"
                                data-bs-toggle="dropdown"
                                href="#"
                                role="button"
                                aria-haspopup="false"
                                aria-expanded="false"
                            >
                                <span className="pro-user-name ms-1">Nowak <i className="mdi mdi-chevron-down"></i></span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated topbar-dropdown-menu profile-dropdown">
                                <div className="dropdown-header noti-title">
                                    <h6 className="text-overflow mb-2">Welcome !</h6>
                                </div>
                                <a href="javascript:void(0);" className="dropdown-item notify-item">
                                    <i className="mdi mdi-account-circle"></i>
                                    <span>My Account</span>
                                </a>
                                <a href="javascript:void(0);" className="dropdown-item notify-item">
                                    <i className="mdi mdi-settings"></i>
                                    <span>Settings</span>
                                </a>
                                <a href="javascript:void(0);" className="dropdown-item notify-item">
                                    <i className="mdi mdi-lock"></i>
                                    <span>Lock screen</span>
                                </a>
                                <a href="javascript:void(0);" className="dropdown-item notify-item">
                                    <i className="mdi mdi-logout"></i>
                                    <span>Logout</span>
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default NavBarAdministrator;
