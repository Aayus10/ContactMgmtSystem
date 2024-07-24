import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/EditForm.css";

export default function EditForm() {
  const value = useLocation();
  const { editIndex } = value.state;
  const navigate = useNavigate();

  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem("contacts");
    return savedContacts ? JSON.parse(savedContacts) : [];
  });

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  let target = contacts[editIndex];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitUpdatedForm = (newdata) => {
    const updatedContacts = contacts.map((val, i) =>
      i === editIndex ? { ...val, ...newdata } : val
    );
    setContacts(updatedContacts);
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      alert("Contact edited successfully");
      navigate("/");
    }
  }, [isSubmitSuccessful, reset, navigate]);

  return (
    <div>
      <p className="header">EDIT CONTACT FORM</p>

      <div className="bg-green-200 h-full pb-10 min-h-screen">
        <form
          onSubmit={handleSubmit(submitUpdatedForm)}
          className="forms"
          noValidate
        >
          <div className="formfield pt-10">
            <p className="label "> Name</p>
            <input
              className="inputarea"
              type="text"
              defaultValue={target.name}
              id="name"
              {...register("name", {
                required: "Name is required.",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Name can only contain letters and spaces",
                },
              })}
            />
            <p className="error-msg">{errors.name?.message}</p>
          </div>
          <br />
          <div className="formfield">
            <p className="label "> Address</p>

            <input
              className="inputarea"
              type="text"
              defaultValue={target.address}
              id="address"
              {...register("address", {
                required: "Address is required",
                maxLength: {
                  value: 50,
                  message: "Address cannot exceed 50 characters",
                },
              })}
            />
            <p className="error-msg">{errors.address?.message}</p>
          </div>
          <br />
          <div className="formfield">
            <p className="label ">Email</p>

            <input
              className="inputarea"
              type="email"
              defaultValue={target.email}
              id="email"
              {...register("email", {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email format",
                },
              })}
            />
            <p className="error-msg">{errors.email?.message}</p>
          </div>
          <br />
          <div className="formfield">
            <p className="label ">Date of Birth</p>

            <input
              className="inputarea"
              type="date"
              id="dob"
              defaultValue={target.dob}
              {...register("dob", {
                valueAsDate: true,
                required: "Date is required",
              })}
            />
            <p className="error-msg">{errors.dob?.message}</p>
          </div>
          <br />
          <div className="formfield">
            <p className="label ">Mobile Number</p>

            <input
              className="inputarea"
              defaultValue={target.number}
              type="text"
              id="number"
              {...register("number", {
                required: "Number is required",
                minLength: {
                  value: 10,
                  message: "Mobile number must be at least 10 digits",
                },
                maxLength: {
                  value: 10,
                  message: "Mobile number cannot exceed 10 digits",
                },
                pattern: {
                  value: /^(9\d*)$/,
                  message: "Enter only authorized numbers",
                },
              })}
            />
            <p className="error-msg">{errors.number?.message}</p>
          </div>
          <div className="formfield">
            <button className="submitbtn">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
