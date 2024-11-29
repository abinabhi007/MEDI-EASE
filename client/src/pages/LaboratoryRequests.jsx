import React, { useEffect, useState } from "react";
import "../styles/bookappointment.css";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/user.css";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import fetchData from "../helper/apiCall";
import Loading from "../components/Loading";
import Empty from "../components/Empty";
import Navbar from "../components/Navbar";

const LaboratoriesList = ({}) => {
  const [city, selectCity] = useState("");
  const [status, selectStatus] = useState("pending");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);
  const [laboratoriesList, setLaboratoriesList] = useState();

  const fetchAllLaboratories = async () => {
    dispatch(setLoading(true));
    const data = await fetchData(`/laboratories/getalllaboratories`);
    setLaboratoriesList(data);
    dispatch(setLoading(false));
  };

  useEffect(() => {
    fetchAllLaboratories();
  }, []);

  const [filteredLaboratories, setFilteredLaboratories] =
    useState(laboratoriesList);

  useEffect(() => {
    let laboratories = laboratoriesList;
    if (city) {
      laboratories = laboratories?.filter((item) => item?.city === city);
    }
    if (status) {
      laboratories = laboratories?.filter((item) => item?.status === status);
    }
    setFilteredLaboratories(laboratories);
  }, [laboratoriesList, city, status]);

  const selectLaboratory = async (e, id) => {
    e.preventDefault();
    try {
      await toast.promise(
        axios.put(
          `/laboratories/accept/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Login Accepted",
          error: "Unable to book appointment",
          loading: "Booking appointment...",
        }
      );
      fetchAllLaboratories();
    } catch (error) {
      return error;
    }
  };

  const rejectLaboratory = async (e, id) => {
    e.preventDefault();
    try {
      await toast.promise(
        axios.put(
          `/laboratories/reject/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Rejected successfully",
          error: "Unable to reject",
          loading: "Rejecting...",
        }
      );
      fetchAllLaboratories();
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex-center">
        {loading && <Loading />}
        {!loading && (
          <div>
            <h2 className="page-heading">Laboratory Requests</h2>
            <div className="register-container flex-center book">
              <form className="register-form">
                <select
                  name="city"
                  className="form-input"
                  placeholder="city"
                  value={city}
                  onChange={(e) => selectCity(e.target.value)}
                >
                  <option value="" selected>
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
                <select
                  name="status"
                  className="form-input"
                  placeholder="status"
                  value={status}
                  onChange={(e) => selectStatus(e.target.value)}
                >
                  <option value="" selected>
                    Select Status
                  </option>
                  <option value="rejected">rejected</option>
                  <option value="approved">approved</option>
                  <option value="pending">pending</option>
                </select>
              </form>
              {filteredLaboratories?.length > 0 ? (
                <div className="appointments">
                  <table>
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Laboratory name</th>
                        <th>City</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLaboratories?.map((ele, i) => {
                        return (
                          <tr key={ele?._id}>
                            <td>{i + 1}</td>
                            <td>{ele?.userId?.name}</td>
                            <td>{ele?.city}</td>
                            <td>{ele?.address}</td>
                            <td>{ele?.phone}</td>
                            <td>{ele?.status}</td>
                            <td>
                              <div>
                                {(ele?.status === "pending" ||
                                  ele?.status === "rejected") && (
                                  <button
                                    className="btn user-btn accept-btn"
                                    onClick={(e) =>
                                      selectLaboratory(e, ele?._id)
                                    }
                                  >
                                    Accept
                                  </button>
                                )}
                                {(ele?.status === "pending" ||
                                  ele?.status === "approved") && (
                                  <button
                                    className="btn user-btn"
                                    onClick={(e) =>
                                      rejectLaboratory(e, ele?._id)
                                    }
                                  >
                                    Reject
                                  </button>
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
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LaboratoriesList;
