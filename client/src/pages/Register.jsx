import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/register.css";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function Register() {
  const url = window.location.pathname.split("/");
  const role = url[url?.length - 1];
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    password: "",
    confpassword: "",
    specialization: "",
    experience: "",
    fees: "",
    city: "",
    address: "",
    phone: "",
    cert: "",
  });
  const navigate = useNavigate();

  const inputChange = (e) => {
    const { name, value } = e.target;
    let fieldValue = value;
    if (name === "name") {
      fieldValue = value.replace(/[^A-Za-z ]/gi, "");
      fieldValue?.trim();
    }
    return setFormDetails({
      ...formDetails,
      [name]: fieldValue,
    });
  };

  const onUpload = async (element) => {
    // setLoading(true);
    if (element.type === "image/jpeg" || element.type === "image/png") {
      const data = new FormData();
      data.append("file", element);
      data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
      data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
      fetch(process.env.REACT_APP_CLOUDINARY_BASE_URL, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then(async (data) => {
          console.log(data);
          setFile(data.url.toString());
        });
      setLoading(false);
    } else {
      setLoading(false);
      toast.error("Please select an image in jpeg or png format");
    }
  };

  const renderSpecificForm = () => {
    switch (role) {
      case "doctor": {
        return (
          <div className="register-form ">
            <input
              type="text"
              name="specialization"
              className="form-input"
              placeholder="Enter your specialization"
              value={formDetails.specialization}
              onChange={inputChange}
            />
            <input
              type="number"
              name="experience"
              className="form-input"
              placeholder="Enter your experience (in years)"
              value={formDetails.experience}
              onChange={inputChange}
            />
            <input
              type="number"
              name="fees"
              className="form-input"
              placeholder="Enter your fees  (in INR)"
              value={formDetails.fees}
              onChange={inputChange}
            />
            <select
              name="city"
              className="form-input"
              placeholder="city"
              value={formDetails.city}
              onChange={inputChange}
            >
              <option value="" selected disabled>
                Select city
              </option>
              <option value="Thiruvananthapuram">Thiruvananthapuram</option>
              <option value="Kollam">Kollam</option>
              <option value="Pathanamthitta">Pathanamthitta</option>
              <option value="Alappuzha">Alappuzha</option>
              <option value="Kottayam">Kottayam</option>
              <option value="Idukki">Idukki</option>
              <option value="Ernakulam">Ernakulam</option>
              <option value="Thrissur">Thrissur</option>
              <option value="Palakkad">Palakkad</option>
              <option value="Malappuram">Malappuram</option>
              <option value="Kozhikode">Kozhikode</option>
              <option value="Waynad">Waynad</option>
              <option value="Kannur">Kannur</option>
              <option value="Kasargode">Kasargode</option>
            </select>
            <input
              type="number"
              name="phone"
              maxLength={10}
              className="form-input"
              placeholder="Enter your phone number"
              value={formDetails.phone}
              onChange={inputChange}
            />
            <input
              type="text"
              name="address"
              className="form-input"
              placeholder="Enter your address"
              value={formDetails.address}
              onChange={inputChange}
            />
            <input
              type="file"
              onChange={(e) => onUpload(e.target.files[0])}
              name="profile-pic"
              id="profile-pic"
              className="form-input"
            />
          </div>
        );
      }
      case "pharmacy": {
        return (
          <div className="register-form ">
            <input
              type="number"
              name="phone"
              maxLength={10}
              className="form-input"
              placeholder="Enter your phone number"
              value={formDetails.phone}
              onChange={inputChange}
            />

            <select
              name="city"
              className="form-input"
              placeholder="city"
              value={formDetails.city}
              onChange={inputChange}
            >
              <option value="" selected disabled>
                Select city
              </option>
              <option value="Thiruvananthapuram">Thiruvananthapuram</option>
              <option value="Kollam">Kollam</option>
              <option value="Pathanamthitta">Pathanamthitta</option>
              <option value="Alappuzha">Alappuzha</option>
              <option value="Kottayam">Kottayam</option>
              <option value="Idukki">Idukki</option>
              <option value="Ernakulam">Ernakulam</option>
              <option value="Thrissur">Thrissur</option>
              <option value="Palakkad">Palakkad</option>
              <option value="Malappuram">Malappuram</option>
              <option value="Kozhikode">Kozhikode</option>
              <option value="Waynad">Waynad</option>
              <option value="Kannur">Kannur</option>
              <option value="Kasargode">Kasargode</option>
            </select>

            <input
              type="text"
              name="address"
              className="form-input"
              placeholder="Enter your address"
              value={formDetails.address}
              onChange={inputChange}
            />
          </div>
        );
      }

      case "laboratory": {
        return (
          <div className="register-form ">
            <input
              type="number"
              name="phone"
              maxLength={10}
              className="form-input"
              placeholder="Enter your phone number"
              value={formDetails.phone}
              onChange={inputChange}
            />

            <select
              name="city"
              className="form-input"
              placeholder="city"
              value={formDetails.city}
              onChange={inputChange}
            >
              <option value="" selected disabled>
                Select city
              </option>
              <option value="Thiruvananthapuram">Thiruvananthapuram</option>
              <option value="Kollam">Kollam</option>
              <option value="Pathanamthitta">Pathanamthitta</option>
              <option value="Alappuzha">Alappuzha</option>
              <option value="Kottayam">Kottayam</option>
              <option value="Idukki">Idukki</option>
              <option value="Ernakulam">Ernakulam</option>
              <option value="Thrissur">Thrissur</option>
              <option value="Palakkad">Palakkad</option>
              <option value="Malappuram">Malappuram</option>
              <option value="Kozhikode">Kozhikode</option>
              <option value="Waynad">Waynad</option>
              <option value="Kannur">Kannur</option>
              <option value="Kasargode">Kasargode</option>
            </select>

            <input
              type="text"
              name="address"
              className="form-input"
              placeholder="Enter your address"
              value={formDetails.address}
              onChange={inputChange}
            />
          </div>
        );
      }
      default:
        return <div />;
    }
  };

  const formSubmit = async (e) => {
    try {
      e.preventDefault();

      if (loading) return;
      const pattern = new RegExp(/^\d{10}$/);
      const {
        name,
        email,
        password,
        confpassword,
        city,
        address,
        phone,
        specialization,
        experience,
        fees,
      } = formDetails;
      if (!name || !email || !password || !confpassword) {
        return toast.error("Input field should not be empty");
      } else if (name.length < 3) {
        return toast.error("Name must be at least 3 characters long");
      } else if (password.length < 5) {
        return toast.error("Password must be at least 5 characters long");
      } else if (password !== confpassword) {
        return toast.error("Passwords do not match");
      }
      if (role !== "patient") {
        if (!pattern.test(phone)) {
          return toast.error("Please enter 10 digit mobile number");
        }
        if (!address?.length || !city) {
          return toast.error("Input field should not be empty");
        }
      }
      if (role === "doctor") {
        if (file?.length < 1) {
          return toast.error("Please upload certificate");
        }
        if (!specialization || !fees || !experience) {
          return toast.error("Input field should not be empty");
        }
      }

      await toast.promise(
        axios.post(`/user/register/${role}`, {
          name,
          email,
          password,
          ...(role === "doctor" && {
            specialization,
            experience,
            fees,
            city,
            address,
            cert: file,
            phone,
          }),
          ...(role === "pharmacy" && {
            phone,
            city,
            address,
          }),
          ...(role === "laboratory" && {
            phone,
            city,
            address,
          }),
        }),
        {
          pending: "Registering user...",
          success: "User registered successfully",
          error: "Unable to register user",
          loading: "Registering user...",
        }
      );
      return navigate("/login");
    } catch (error) {}
  };

  return (
    <section className="flex-center">
      <div className="register-container flex-center">
        <h2 className="form-heading">{`Sign Up as ${role}`}</h2>
        <form onSubmit={formSubmit} className="register-form">
          <input
            type="text"
            name="name"
            className="form-input"
            placeholder="Enter your full name"
            value={formDetails.name}
            onChange={inputChange}
          />
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Enter your email"
            value={formDetails.email}
            onChange={inputChange}
          />
          <input
            type="password"
            name="password"
            className="form-input"
            placeholder="Enter your password"
            value={formDetails.password}
            onChange={inputChange}
          />
          <input
            type="password"
            name="confpassword"
            className="form-input"
            placeholder="Confirm your password"
            value={formDetails.confpassword}
            onChange={inputChange}
          />
          {renderSpecificForm()}
          <button
            type="submit"
            className="btn form-btn"
            disabled={loading ? true : false}
          >
            sign up
          </button>
        </form>
        <p>
          Already a user?{" "}
          <NavLink className="login-link" to={`/login`}>
            Log in
          </NavLink>
        </p>
      </div>
    </section>
  );
}

export default Register;
