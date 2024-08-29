import React from "react";

const SidebarAdministrator = () => {
    return (
        <>
            <div className="d-flex flex-column flex-shrink-0 bg-body-tertiary" style="width: 4.5rem;">
                <a href="/" className="d-block p-3 link-body-emphasis text-decoration-none" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">
                    <svg className="bi pe-none" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
                    <span className="visually-hidden">Icon-only</span>
                </a>
                <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                    <li className="nav-item">
                        <a href="#" className="nav-link active py-3 border-bottom rounded-0" aria-current="page" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Home" data-bs-original-title="Home">
                            <svg className="bi pe-none" width="24" height="24" role="img" aria-label="Home"><use xlink:href="#home"></use></svg>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link py-3 border-bottom rounded-0" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Dashboard" data-bs-original-title="Dashboard">
                            <svg className="bi pe-none" width="24" height="24" role="img" aria-label="Dashboard"><use xlink:href="#speedometer2"></use></svg>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link py-3 border-bottom rounded-0" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Orders" data-bs-original-title="Orders">
                            <svg className="bi pe-none" width="24" height="24" role="img" aria-label="Orders"><use xlink:href="#table"></use></svg>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link py-3 border-bottom rounded-0" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Products" data-bs-original-title="Products">
                            <svg className="bi pe-none" width="24" height="24" role="img" aria-label="Products"><use xlink:href="#grid"></use></svg>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link py-3 border-bottom rounded-0" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Customers" data-bs-original-title="Customers">
                            <svg className="bi pe-none" width="24" height="24" role="img" aria-label="Customers"><use xlink:href="#people-circle"></use></svg>
                        </a>
                    </li>
                </ul>
                <div className="dropdown border-top">
                    <a href="#" className="d-flex align-items-center justify-content-center p-3 link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="mdo" width="24" height="24" className="rounded-circle" />
                    </a>
                    <ul className="dropdown-menu text-small shadow">
                        <li><a className="dropdown-item" href="#">New project...</a></li>
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li><a className="dropdown-item" href="#">Profile</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default SidebarAdministrator;
