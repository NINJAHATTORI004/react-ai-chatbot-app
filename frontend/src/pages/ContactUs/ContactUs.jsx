import React, { useState } from "react";
import styles from "./ContactUs.module.css";
import InputControl from "../../components/InputControl/InputControl";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

const ContactUs = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitted, setIsSubmitted] = useState("");
  const userCollectionRef = collection(db, "contactUsData");

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.message) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    addDoc(userCollectionRef, {
      name: values.name,
      email: values.email,
      message: values.message,
    })
      .then(() => {
        setSubmitButtonDisabled(false);
        setIsSubmitted("Form Submitted Successfully!!");
        setValues({
          name: "",
          email: "",
          message: "",
        });
        setTimeout(() => {
          setIsSubmitted("");
        }, 3000);
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
        setValues({
          name: "",
          email: "",
          message: "",
        });
        setTimeout(() => {
          setErrorMsg("");
        }, 3000);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Contact Us</h1>
        <InputControl
          label="Name"
          placeholder="Enter your name"
          value={values.name}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <InputControl
          label="Email"
          placeholder="Enter email address"
          value={values.email}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />

        <div className={styles.messageBox}>
          <label>Message</label>
          <textarea
            label="message"
            placeholder="Write your message..."
            value={values.message}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, message: event.target.value }))
            }
          ></textarea>
        </div>

        <div className={styles.footer}>
          {errorMsg == "" ? null : <b className={styles.error}>{errorMsg}</b>}
          {isSubmitted == "" ? null : (
            <b className={styles.success}>{isSubmitted}</b>
          )}
          <button onClick={handleSubmission} disabled={submitButtonDisabled}>
            Send
          </button>
          <p>
            Back to{" "}
            <span>
              <Link to="/">Home</Link>
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;