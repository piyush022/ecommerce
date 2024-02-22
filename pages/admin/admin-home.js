import Link from "next/link";

import { useEffect } from "react";
import { useRouter } from "next/router";
const Homepage = () => {
  const router = useRouter();
  useEffect(() => {
    checkToken();
  }, []);

  function checkToken() {
    const adminToken = localStorage.getItem("mobAdminToken");
    if (!adminToken) {
      router.push("/admin");
    }
  }
  const options = [
    { text: "User manage", link: "/admin/user-manage" },

    { text: "Orders manage", link: "/admin/order-manage" },
  ];
  return (
    <>
      <div className="main container">
        <h2 className="my-5">Welcome to Admin Panel</h2>
        <div className=" cardSection">
          {options.map((item, index) => (
            <Link href={item.link} className="card" key={index}>
              {item.text}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Homepage;
