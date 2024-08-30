import React from "react";
import ContactUs from "../../components/Contacts/CarruselContacts.jsx";

const ContendContacts = () => {
  return (
    <>
      <div 
        className="position-relative p-5 text-center text-muted bg-body border border-dashed rounded-5"
        style={{ fontSize: '1rem' }} 
      >
        <ContactUs />
      </div>
    </>
  );
};

export default ContendContacts;
