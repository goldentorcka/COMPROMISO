import React from "react";
import CrudUsers from "../../users/crudUsers";
import NavBarAdministrator from "../../components/Admin/NavBarAdmin.jsx";
import FormUsers from"../../users/formUsers.jsx"
import FormQueryUsers from"../../users/formQueryUsers.jsx";
const Contend_CrudUsers = () => {
    return (
        <>
            <div className="" >
                <NavBarAdministrator />
                <CrudUsers />
                <FormUsers />
                <FormQueryUsers />
            </div>

        </>
    )
}

export default Contend_CrudUsers;