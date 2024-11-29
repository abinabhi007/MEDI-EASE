import React, { useEffect, useState } from "react";
import Empty from "../components/Empty";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import fetchData from "../helper/apiCall";
import { setLoading } from "../redux/reducers/rootSlice";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/user.css";
import { useNavigate } from "react-router-dom";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const { loading } = useSelector((state) => state.root);
  const { userId } = jwt_decode(localStorage.getItem("token"));

  const navigate = useNavigate();

  const getAllAppoint = async (e) => {
    try {
      dispatch(setLoading(true));
      const temp = await fetchData(
        `/appointment/getallappointments?search=${userId}`
      );
      setAppointments(temp);
      dispatch(setLoading(false));
    } catch (error) {}
  };

  useEffect(() => {
    getAllAppoint();
  }, []);

  const complete = async (ele) => {
    try {
      await toast.promise(
        axios.put(
          "/appointment/completed",
          {
            appointid: ele?._id,
            doctorId: ele?.doctorId?._id,
            doctorname: `${ele?.userId?.firstname} ${ele?.userId?.lastname}`,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Appointment booked successfully",
          error: "Unable to book appointment",
          loading: "Booking appointment...",
        }
      );

      getAllAppoint();
    } catch (error) {
      return error;
    }
  };

  const onUpload = async (element, ele) => {
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
          try {
            await toast.promise(
              axios.post(
                "/prescriptions/add",
                {
                  appointmentId: ele?._id,
                  file: data.url.toString(),
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              ),
              {
                success: "Prescription uploaded successfully",
                error: "Unable to upload Prescription",
                loading: "Uploading Prescription...",
              }
            );
          } catch (error) {
            return error;
          }
        });
      setLoading(false);
    } else {
      setLoading(false);
      toast.error("Please select an image in jpeg or png format");
    }
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <section className="container notif-section">
          <h2 className="page-heading">Your Appointments</h2>

          {appointments.length > 0 ? (
            <div className="appointments">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Doctor</th>
                    <th>Patient</th>
                    <th>Appointment Date</th>
                    <th>Appointment Time</th>
                    <th>Booking Date</th>
                    <th>Booking Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments?.map((ele, i) => {
                    return (
                      <tr key={ele?._id}>
                        <td>{i + 1}</td>
                        <td>{ele?.doctorId?.name}</td>
                        <td>{ele?.userId?.name}</td>
                        <td>{ele?.date}</td>
                        <td>{ele?.time}</td>
                        <td>{ele?.createdAt.split("T")[0]}</td>
                        <td>{ele?.updatedAt.split("T")[1].split(".")[0]}</td>
                        <td>{ele?.status}</td>
                        <td>
                          <div>
                            {userId === ele?.doctorId?._id && ele?.status !=="Completed" && (
                              <>
                                <input
                                  type="file"
                                  onChange={(e) =>
                                    onUpload(e.target.files[0], ele)
                                  }
                                  name="profile-pic"
                                  id="profile-pic"
                                  className="form-input"
                                />
                                <button
                                  className={`btn user-btn accept-btn ${
                                    ele?.status === "Completed"
                                      ? "disable-btn"
                                      : ""
                                  }`}
                                  disabled={ele?.status === "Completed"}
                                  onClick={() => complete(ele)}
                                >
                                  Complete
                                </button>
                              </>
                            )}
                            {(userId !== ele?.doctorId?._id || ele?.status ==="Completed") && (
                              <button
                                className={`btn user-btn accept-btn ${
                                  ele?.status === "Completed"
                                    ? "disable-btn"
                                    : ""
                                }`}
                                onClick={() =>
                                  navigate(`/prescriptions/${ele?._id}`)
                                }
                              >
                                View prescription
                              </button>
                            )}

                            <button
                              className={`btn user-btn accept-btn ${
                                ele?.status === "Completed" ? "disable-btn" : ""
                              }`}
                              onClick={() =>
                                navigate(`/labresults/${ele?._id}`)
                              }
                            >
                              View lab results
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <Empty />
          )}
        </section>
      )}
    </>
  );
};
export default Appointments;
