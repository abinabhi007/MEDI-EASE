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

const PrescriptionsList = () => {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const { loading } = useSelector((state) => state.root);
  const { userId } = jwt_decode(localStorage.getItem("token"));

  const navigate = useNavigate();

  const getAllPrescriptions = async (e) => {
    try {
      dispatch(setLoading(true));
      const temp = await fetchData(
        `/prescriptions/getallprescriptions?search=${userId}`
      );
      setAppointments(temp);
      dispatch(setLoading(false));
    } catch (error) {}
  };

  useEffect(() => {
    getAllPrescriptions();
  }, []);

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
                "/labresults/add",
                {
                  appointmentId: ele?.appointmentId,
                  file: data.url.toString(),
                  labId: userId,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              ),
              {
                success: "Result uploaded successfully",
                error: "Unable to upload result",
                loading: "Uploading result...",
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
          <h2 className="page-heading">Your Prescriptions</h2>

          {appointments.length > 0 ? (
            <div className="appointments">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments?.map((ele, i) => {
                    return (
                      <tr key={ele?._id}>
                        <td>{i + 1}</td>
                        <td>{ele?.appointmentId?.status}</td>
                        <td>
                          <div>
                            <button
                              className={`btn user-btn accept-btn ${
                                ele?.status === "Completed" ? "disable-btn" : ""
                              }`}
                              onClick={() =>
                                navigate(`/prescriptions/${ele?.appointmentId?._id}`)
                              }
                            >
                              View prescription
                            </button>

                            {userId === ele?.labId && ele?.appointmentId?.status !=="Completed" && (
                              <input
                                type="file"
                                onChange={(e) =>
                                  onUpload(e.target.files[0], ele)
                                }
                                name="profile-pic"
                                id="profile-pic"
                                className="form-input"
                              />
                            )}
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
export default PrescriptionsList;
