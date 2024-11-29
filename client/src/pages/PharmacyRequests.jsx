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

const PharmacyList = () => {
  const [city, selectCity] = useState("");
  const [status, selectStatus] = useState("pending");
  const [pharmacies, setPharmacies] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const fetchAllPharmacies = async () => {
    dispatch(setLoading(true));
    const data = await fetchData(`/pharmacies/getallpharmacies`);
    setPharmacies(data);
    dispatch(setLoading(false));
  };

  const [filteredPharmacies, setFilteredPharmacies] = useState(pharmacies);

  useEffect(() => {
    fetchAllPharmacies();
  }, []);

  useEffect(() => {
    let tempPharmacies = pharmacies;
    if (city) {
      tempPharmacies = tempPharmacies?.filter((item) => item?.city === city);
    }
    if (status) {
      tempPharmacies = tempPharmacies?.filter(
        (item) => item?.status === status
      );
    }
    setFilteredPharmacies(tempPharmacies);
  }, [pharmacies, city, status]);

  const selectPharmacy = async (e, pharmId) => {
    e.preventDefault();
    try {
      await toast.promise(
        axios.put(`/pharmacies/accept/${pharmId}`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
        {
          success: "Login Accepted",
          error: "Unable to book appointment",
          loading: "Booking appointment...",
        }
      );
      fetchAllPharmacies();
    } catch (error) {
      return error;
    }
  };

  const rejectPharmacy = async (e, pharmId) => {
    e.preventDefault();
    try {
      await toast.promise(
        axios.put(`/pharmacies/reject/${pharmId}`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
        {
          success: "Rejected successfully",
          error: "Unable to reject",
          loading: "Rejecting...",
        }
      );
      fetchAllPharmacies();
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
            <h2 className="page-heading">Pharmacy Requests</h2>
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
              {filteredPharmacies?.length > 0 ? (
                <div className="appointments">
                  <table>
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Pharmacy name</th>
                        <th>City</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPharmacies?.map((ele, i) => {
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
                                    selectPharmacy(e, ele?._id)
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
                                    rejectPharmacy(e, ele?._id)
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

export default PharmacyList;
