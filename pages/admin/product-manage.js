import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { toast } from "sonner";
import { useRouter } from "next/router";
import Modal1 from "@/components/popUp";
const Productmanage = () => {
  const [products, setProducts] = useState([]);
  const [toggle1, settoggle1] = useState(false);
  const [disp, setdisp] = useState({});
  const [token, setToken] = useState("");
  const router = useRouter();

  //product update states
  const [upName, setUpName] = useState("");
  const [upDesc, setUpDesc] = useState("");
  const [UpQuty, setUpQty] = useState("");
  const [UpPrice, setUpPrice] = useState("");
  const [upId, setupId] = useState("");
  useEffect(() => {
    checkToken();

    const tok = localStorage.getItem("mobAdminToken");
    setToken(tok);
  }, []);

  function checkToken() {
    const adminToken = localStorage.getItem("mobAdminToken");
    if (!adminToken) {
      router.push("/admin");
    } else {
      getProducts();
    }
  }

  async function getProducts() {
    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_SITE_URL + "/product/api/getAllProducts"
      );
      if (res.data.success) {
        console.log(res);
        setProducts(res.data.data);
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error(err.message);
    }
  }

  function filterProduct(id) {
    const filteredProduct = products.filter((item) => item._id === id);
    console.log("filterP", filteredProduct[0]);
    setdisp(filteredProduct[0]);
    // setUpName(filteredProduct[0].name);
    // setUpDesc(filteredProduct[0].description);
    // setUpPrice(filteredProduct[0].price);
    // setUpQty(filteredProduct[0].quantity);
    // setupId(filteredProduct[0]._id);
  }

  return (
    <>
      <Modal1
        toggle1={toggle1}
        settoggle1={settoggle1}
        disp={disp}
        getProducts={getProducts}
      />
      <div className="main container mt-5">
        <div className="container mt-5">
          <h2 className="mb-5">MANAGE PRODUCTS</h2>
          <Table responsive>
            <thead>
              <tr>
                <th>No</th>

                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => {
                        toggle1 ? settoggle1(false) : settoggle1(true);
                        filterProduct(item._id);
                      }}
                    >
                      Update
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

export default Productmanage;
