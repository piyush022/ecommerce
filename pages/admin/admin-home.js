import Link from "next/link";
const Homepage = () => {
  const options = [
    { text: "User manage", link: "/admin/user-manage" },
    { text: "Warehouse manage", link: "/admin/warehouse-manage" },
    { text: "Product manage", link: "/admin/product-manage" },
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
