import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../../styles/AddContact.css";

export default function AddContact() {
  const link = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  const watchName = watch("name");
  const watchNumber = watch("number");

  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem("contacts");
    return savedContacts ? JSON.parse(savedContacts) : [];
  });

  const submitForm = (data) => {
    setContacts((prevContacts) => [...prevContacts, data]);
  };

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      alert("Contact added successfully");
      link("/");
    }
  }, [isSubmitSuccessful, reset, link]);

  return (
    <>
      <p className="header">ADD NEW CONTACT HERE</p>
      <div className="bg-green-200 min-h-screen h-full pb-10 ">
        <form
          onSubmit={handleSubmit(submitForm)}
          className="add-form"
          noValidate
        >
          <div className="formfield pt-10">
            <p className="label "> Name</p>
            <input
              className="inputarea"
              type="text"
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
            {!errors.name?.message &&
              watchName &&
              !/^[A-Za-z\s]+$/.test(watchName) && (
                <p className="error-msg">
                  Name can only contain letters and spaces
                </p>
              )}
          </div>
          <br />
          <div className="formfield">
            <p className="label "> Address</p>
            <input
              className="inputarea "
              type="text"
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
            <p className="label "> Email</p>
            <input
              className="inputarea "
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required.",
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
            <p className="label ">Mobile Number</p>
            <input
              className="inputarea"
              defaultValue=""
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
            {!errors.number?.message &&
              watchNumber &&
              watchNumber.length > 10 && (
                <p className="error-msg">
                  Mobile number cannot exceed 10 digits
                </p>
              )}
            {!errors.number?.message &&
              watchNumber &&
              !/^(9\d*)$/.test(watchNumber) && (
                <p className="error-msg">Enter only authorized numbers</p>
              )}
          </div>
          <br />
          <div className="formfield">
            <p className="label">Date of Birth</p>
            <input
              className="inputarea"
              type="date"
              id="dob"
              {...register("dob", {
                valueAsDate: true,
                required: "Date is required",
              })}
            />
            <p className="error-msg">{errors.dob?.message}</p>
          </div>

          <div className="formfield">
            <button className="submit-btn">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}
