import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Header = () => {
  const [adminName, setadminName] = useState("");
  const [userName, setUsername] = useState("");
  const router = useRouter();
  useEffect(() => {
    const admin = localStorage.getItem("mobAdmin");
    const user = localStorage.getItem("mobuser");
    if (admin) {
      setadminName(admin);
    }
    if (user) {
      setUsername(user);
    }
    // console.log(router);
  }, [router.pathname]);

  function logout() {
    localStorage.clear();
    router.push("/");
    setUsername("");
    setadminName("");
  }
  return (
    <>
      <Navbar className="bg-body-white navBar">
        <Container>
          <span>Dashboard</span>
          {userName != "" || adminName != "" ? (
            <>
              <span>
                Welcome -{" "}
                {router.pathname.includes("admin") && adminName != ""
                  ? adminName
                  : userName}
                <button className="btn btn-sm btn-dark mx-3" onClick={logout}>
                  Logout
                </button>
              </span>
            </>
          ) : null}
          {router.pathname === "/" ? (
            <Link
              href="/admin"
              className="btn btn-sm btn-dark mx-3"
              onClick={logout}
            >
              Admin Login
            </Link>
          ) : null}
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
