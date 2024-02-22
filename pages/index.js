import styles from "@/styles/Home.module.css";
import React, { useState, useEffect } from "react";
import { Form, FormGroup, FormControl, Button } from "react-bootstrap";
import { toast } from "sonner";
import axios from "axios";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useRouter } from "next/router";

export default function Home() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  //states for login

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

  async function handleRegister(e) {
    e.preventDefault();
    if (
      firstname != "" &&
      lastname != "" &&
      password != "" &&
      email != "" &&
      phone != ""
    ) {
      const data = { firstname, lastname, password, email, phone };
      const res = await axios.post(
        process.env.NEXT_PUBLIC_SITE_URL + "/user/api/postUser",
        data
      );
      console.log(res);
      if (res.data.success) {
        toast.success("user created you can login now");
        setFirstname("");
        setLastname("");
        setPassword("");
        setEmail("");
        setPhone("");
      } else {
        toast.error("registration failed");
      }
    } else {
      toast.error("all fields are required");
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    if (loginemail != "" || (loginphone != "" && loginpassword != "")) {
      const data = {
        email: loginemail,
        password: loginpassword,
        phone: loginphone,
      };
      const res = await axios.post(
        process.env.NEXT_PUBLIC_SITE_URL + "/user/api/userLogin",
        data
      );
      console.log(res);
      if (res.data.success) {
        toast.success("login Successful");

        const token = res.data.token;
        const username = res.data.data[0].firstname;
        const userData = JSON.stringify(res.data.data[0]);
        localStorage.setItem("mobToken", token);
        localStorage.setItem("mobuser", username);
        localStorage.setItem("userData", userData);

        setloginEmail("");
        setloginPassword("");
        router.push("/homepage");
      } else {
        toast.error(res.data.msg);
      }
    } else {
      toast.error("all fields are required");
    }
  }

  function toggleFields() {
    toggle ? settoggle(false) : settoggle(true);
  }

  return (
    <>
      <div className=" container mt-5">
        <Tabs
          defaultActiveKey="login"
          transition={false}
          id="noanim-tab-example"
          className="mb-3"
        >
          <Tab eventKey="register" title="register">
            <div className="container">
              <h2 className="my-3">USER REGISTER</h2>
              <Form onSubmit={handleRegister}>
                <FormGroup>
                  <Form.Label>First Name:</Form.Label>
                  <FormControl
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <Form.Label>Last Name:</Form.Label>
                  <FormControl
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <Form.Label>Password:</Form.Label>
                  <FormControl
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <Form.Label>Email:</Form.Label>
                  <FormControl
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <Form.Label>Phone:</Form.Label>
                  <FormControl
                    type="text"
                    value={phone}
                    onChange={(e) => {
                      phone.length < 10 ? (
                        setPhone(e.target.value)
                      ) : (
                        <>
                          {toast.warning("only 10 digits allowed for phone")}
                          {setPhone("")}
                        </>
                      );
                    }}
                  />
                </FormGroup>

                <Button className="my-3 w-100 btn-warning" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </Tab>
          <Tab eventKey="login" title="login">
            <div className="container">
              <h2 className="my-5">USER LOGIN</h2>
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
                      className="toggleField my-3 text-danger"
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
                              {toast.warning(
                                "only 10 digits allowed for phone"
                              )}
                              {setloginPhone("")}
                            </>
                          );
                        }}
                      />
                    </FormGroup>
                    <h4
                      className="toggleField my-3 text-danger "
                      onClick={toggleFields}
                    >
                      OR Email
                    </h4>
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

                <Button className="my-3 w-100 btn-danger" type="submit">
                  Login
                </Button>
              </Form>
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
