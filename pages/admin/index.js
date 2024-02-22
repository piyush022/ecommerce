import { useState, useEffect } from "react";
import { Form, FormGroup, FormControl, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/router";

const AdminHome = () => {
  const [loginemail, setloginEmail] = useState("");
  const [loginpassword, setloginPassword] = useState("");
  const [loginphone, setloginPhone] = useState("");
  const [toggle, settoggle] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const admin = localStorage.getItem("mobAdmin");
    const user = localStorage.getItem("mobuser");
    if (admin) {
      router.push("/admin/admin-home");
    }
    if (user) {
      router.push("/homepage");
    }
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      if (loginemail != "" || (loginphone != "" && loginpassword != "")) {
        const data = {
          email: loginemail,
          password: loginpassword,
          phone: loginphone,
        };
        const res = await axios.post(
          process.env.NEXT_PUBLIC_SITE_URL + "/admin/api/adminLogin",
          data
        );
        console.log(res);
        if (res.data.success) {
          toast.success("login Successful");
          const token = res.data.token;
          const username = res.data.data[0].firstname;
          localStorage.setItem("mobAdminToken", token);
          localStorage.setItem("mobAdmin", username);

          setloginEmail("");
          setloginPassword("");
          router.push("/admin/admin-home");
        } else {
          toast.error("login failed");
        }
      } else {
        toast.error("all fields are required");
      }
    } catch (err) {
      console.log(err);
    }
  }

  function toggleFields() {
    toggle ? settoggle(false) : settoggle(true);
  }

  return (
    <>
      <div className="main">
        <div className="container">
          <h2>Admin Login</h2>
          <Form onSubmit={handleLogin}>
            {toggle ? (
              <>
                <FormGroup>
                  <Form.Label>Email:</Form.Label>
                  <FormControl
                    type="email"
                    value={loginemail}
                    onChange={(e) => setloginEmail(e.target.value)}
                  />
                </FormGroup>
                <h5
                  className="toggleField my-3 text-warning"
                  onClick={toggleFields}
                >
                  OR Phone
                </h5>
              </>
            ) : (
              <>
                <FormGroup>
                  <Form.Label>Phone:</Form.Label>
                  <FormControl
                    type="text"
                    value={loginphone}
                    onChange={(e) => {
                      loginphone.length < 10 ? (
                        setloginPhone(e.target.value)
                      ) : (
                        <>
                          {toast.warning("only 10 digits allowed for phone")}
                          {setloginPhone("")}
                        </>
                      );
                    }}
                  />
                </FormGroup>
                <h5
                  className="toggleField my-3 text-warning"
                  onClick={toggleFields}
                >
                  OR Email
                </h5>
              </>
            )}

            <FormGroup>
              <Form.Label>Password:</Form.Label>
              <FormControl
                type="password"
                value={loginpassword}
                onChange={(e) => setloginPassword(e.target.value)}
              />
            </FormGroup>

            <Button className="my-3 w-100 btn-success" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
