import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import axios from "axios";
const HomePage = () => {
  const [token, setToken] = useState("");
  const [products, setproducts] = useState([]);
  const router = useRouter();
  useEffect(() => {
    checkToken();
  }, []);
  function checkToken() {
    const adminToken = localStorage.getItem("mobToken");
    if (!adminToken) {
      router.push("/");
    } else {
      setToken(adminToken);
      getProducts(adminToken);
    }
  }

  async function getProducts(userToken) {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const res = await axios.post(
        process.env.NEXT_PUBLIC_SITE_URL + "/product/api/getProductByLocation",
        {
          latitude: userData.latitude,
          longitude: userData.longitude,
          token: userToken,
        }
      );
      console.log(res);
      if (res.data.success) {
        setproducts(res.data.data[0].productsInWarehouse);
      }
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function buyProduct(productId, price) {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      console.log(productId);
      const res = await axios.post(
        process.env.NEXT_PUBLIC_SITE_URL + "/order/api/postOrder",
        {
          user: userData._id,
          products: [productId],
          totalPrice: price,
          paymentMethod: "cash on Delivery",
          paymentId: "212121",
          token: token,
        }
      );
      console.log(res);
      if (res.data.success) {
        toast.success("Order Placed");
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <>
      <div className="main container mt-5">
        <div className="container mt-5">
          <h2 className="mb-5">Products By Location in 10 KM Radius</h2>
          <section className="productGrid ">
            {products.map((item) => (
              <div>
                <span>{item.name}</span>
                <span>{item.description}</span>
                <span>{item.price}</span>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => buyProduct(item._id, item.price)}
                >
                  Buy
                </button>
              </div>
            ))}
          </section>
        </div>
      </div>
    </>
  );
};

export default HomePage;
