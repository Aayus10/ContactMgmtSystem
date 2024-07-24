import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Home.css";

export default function Home() {
  let savedContacts = localStorage.getItem("contacts");
  let contactlist = JSON.parse(savedContacts);
  const link = useNavigate();

  return (
    <>
      <div className="h-full lg:h-screen bg-green-200">
        <div className="navbar">
          <p className="title">WELCOME TO CONTACT MANAGEMENT SYSTEM</p>
          <div className="buttons">
            <button
              onClick={() => {
                link("/addContact");
              }}
              className="home-btns"
            >
              Add Contact
            </button>
            <button
              onClick={() => {
                link("editContact");
              }}
              className="home-btns"
            >
              Edit Contact
            </button>
          </div>
        </div>

        <div className="mt-3">
          <p className="contact-title">YOUR SAVED CONTACTS</p>
        </div>
        <div className="contact-list">
          {contactlist?.map((data, i) => (
            <div key={i} className="mt-8 ">
              <p className="name">
                {i + 1}. {data.name}
              </p>
              <div className="details">
                <p>
                  <u>Address</u>: {data.address}
                </p>
                <p>
                  <u>Email</u>: {data.email}
                </p>
                <p>
                  <u>Date of Birth</u>:{" "}
                  {new Date(data.dob).toLocaleDateString()}
                </p>
                <p>
                  <u>Number</u>: {data.number}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
