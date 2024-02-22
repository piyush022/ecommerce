import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { toast } from "sonner";
import { useRouter } from "next/router";

const Orders = () => {
  const [orders, setorders] = useState([]);
  const [token, setToken] = useState("");
  const router = useRouter();
  useEffect(() => {
    checkToken();
    const tok = localStorage.getItem("mobAdminToken");
    setToken(tok);
    getOrders();
  }, []);

  function checkToken() {
    const adminToken = localStorage.getItem("mobAdminToken");
    if (!adminToken) {
      router.push("/admin");
    }
  }

  async function getOrders() {
    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_SITE_URL + "/admin/api/getOrders"
      );
      if (res.data.success) {
        console.log(res);
        setorders(res.data.data);
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleApproval(task, id) {
    console.log("orderid", id);
    try {
      task === "Approve" ? (task = "Placed") : (task = "Denied by Admin");
      const result = await axios.post(
        process.env.NEXT_PUBLIC_SITE_URL + "/admin/api/orderStatus",
        { id: id, status: task, token: token }
      );
      if (result.data.success) {
        toast.success("status changed");
        getOrders();
      } else {
        toast.error(result.data.msg);
      }
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <>
      <div className="main container mt-5">
        <div className="container mt-5">
          <h2 className="mb-5">MANAGE ORDERS</h2>
          <Table responsive>
            <thead>
              <tr>
                <th>No</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Products</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.userData[0].firstname}</td>
                  <td>{item.userData[0].lastname}</td>
                  <td>{item.userData[0].phone}</td>
                  <td>{item.userData[0].email}</td>
                  <td>
                    {item.orderedProduct.map((item, index) => (
                      <span key={index}>
                        <p>{item.name}</p>
                      </span>
                    ))}
                  </td>

                  <td>{item.totalPrice}</td>
                  <td>
                    {item.status == "pending" ? (
                      <>
                        <p className="text-danger">{item.status}</p>
                      </>
                    ) : (
                      item.status
                    )}
                  </td>
                  <td>
                    {item.status == "Placed" ? (
                      <>
                        <button
                          className="btn btn-sm btn-danger mx-1"
                          onClick={() => handleApproval("Disapprove", item._id)}
                        >
                          DisApprove
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-sm btn-warning mx-1"
                          onClick={() => handleApproval("Approve", item._id)}
                        >
                          Approve
                        </button>
                      </>
                    )}
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

export default Orders;
