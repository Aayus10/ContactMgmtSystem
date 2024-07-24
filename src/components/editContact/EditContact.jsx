import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/EditContact.css";

export default function EditContact() {
  let savedContacts = localStorage.getItem("contacts");
  let mycontacts = JSON.parse(savedContacts);

  const link = useNavigate();

  const Handleedit = (index) => {
    link("/editForm", { state: { editIndex: index } });
  };

  return (
    <>
      <p className="header">CHOOSE CONTACT FOR EDIT</p>
      <div className="contactinfo">
        {mycontacts.map((val, i) => {
          return (
            <>
              <div key={i} className="details">
                <p className="name">
                  {i + 1}. {val.name}
                </p>
                <p className="hidden lg:block detail-fields xl:col-span-2">
                  {val.address}
                </p>
                <p className="hidden xl:block detail-fields xl:col-span-2">
                  {val.email}
                </p>
                <p className="detail-fields ">[{val.number}]</p>
                <div>
                  <button
                    className=" editbtn"
                    onClick={() => {
                      Handleedit(i);
                    }}
                  >
                    Edit Contact
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
