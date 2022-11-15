import React from "react";
import "./index.css";

export default function App() {
  return (
    <div class="form-container">
      <form class="register-form">
        
        {/* Uncomment the next line to show the success message */}
        {/* <div class="success-message">Success! Thank you for registering</div> */}
        
        <input
          id="nickname"
          class="form-field"
          type="text"
          placeholder="Nickname"
          name="nickname"
        />

        {/* Uncomment the next line to show the error message */}
        {/* <span id="nickname-error">Please enter a first name</span> */}

        <input
          id="email"
          class="form-field"
          type="text"
          placeholder="Email"
          name="email"
        />

        {/* Uncomment the next line to show the error message */}
        {/* <span id="email-error">Please enter a last name</span> */}

        <input
          id="pass"
          class="form-field"
          type="text"
          placeholder="Password"
          name="pass"
        />

        {/* Uncomment the next line to show the error message */}
        {/* <span id="pass-error">Please enter an email address</span> */}

        <button class="form-field" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}