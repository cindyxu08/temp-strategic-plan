import React from "react";
import "./footer.scss";

const Subscription = () => (
  <div className="row subscription">
    <div className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-4 sign-up-title">
      Sign up for AAMC e-news:
    </div>
    <div className="col-12 col-sm-6 col-md-6 col-lg-8 col-xl-8 email">
      <div className="input-field form-group ">
        <input
          className="email-input"
          name="email"
          type="text"
          placeholder="Email"
        />
      </div>

      <div className="send-svg">
        <svg
          className="bi bi-chevron-double-right"
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L9.293 8 3.646 2.354a.5.5 0 010-.708z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M7.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L13.293 8 7.646 2.354a.5.5 0 010-.708z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  </div>
);

export default Subscription;
