import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { toast } from "sonner";
const UserManage = () => {
  const [users, setusers] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const tok = localStorage.getItem("mobAdminToken");
    setToken(tok);
    getAllUsers();
  }, []);

  async function getAllUsers() {
    const result = await axios.get(
      process.env.NEXT_PUBLIC_SITE_URL + "/user/api/getAllUsers"
    );
    // console.log(result);
    if (result.data.success) {
      setusers(result.data.data);
    } else {
      toast.error("something went wrong while getting users");
    }
  }

  async function deleteUser(id) {
    try {
      console.log(token);
      if (token != "") {
        const result = await axios.post(
          process.env.NEXT_PUBLIC_SITE_URL + "/user/api/deleteUser",
          { id: id, token: token }
        );
        if (result.data.success) {
          toast.success("User Deleted");
          getAllUsers();
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleApproval(task, id) {
    try {
      task === "Approve" ? (task = true) : (task = false);
      const result = await axios.post(
        process.env.NEXT_PUBLIC_SITE_URL + "/admin/api/userApproval",
        { id: id, approved: task, token: token }
      );
      if (result.data.success) {
        toast.success("status change saved");
        getAllUsers();
      } else {
        toast.error(result.data.msg);
      }
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <>
      <div className="main container">
        <div className="container mt-5">
          <h2 className="mb-5">MANAGE USERS</h2>
          <Table responsive>
            <thead>
              <tr>
                <th>No</th>
                <th>First NAme</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.firstname}</td>
                  <td>{item.lastname}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>{item.approved ? "approved" : "not approved"}</td>
                  <td>
                    {item.approved ? (
                      <>
                        <button
                          className="btn btn-sm btn-secondary mx-1"
                          onClick={() => handleApproval("Disapprove", item._id)}
                        >
                          DisApprove
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-sm btn-secondary mx-1"
                          onClick={() => handleApproval("Approve", item._id)}
                        >
                          Approve
                        </button>
                      </>
                    )}
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => deleteUser(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default UserManage;
