import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "sonner";
import axios from "axios";
const Modal1 = ({ toggle1, settoggle1, disp, getProducts }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    setName(disp.name);
    setDescription(disp.description);
    setQuantity(disp.quantity);
    setPrice(disp.price);
  }, [disp]);

  const handleClose = () => {
    settoggle1(false);
    setShow(false);
    setName("");
    setDescription("");
    setQuantity("");
    setPrice("");
  };
  const handleShow = () => setShow(true);

  //function to update Data

  //..........

  useEffect(() => {
    if (toggle1) {
      handleShow();
    } else {
      handleClose();
    }
  }, [toggle1]);

  async function updateData() {
    const tok = localStorage.getItem("mobAdminToken");
    try {
      const res = await axios.put(
        process.env.NEXT_PUBLIC_SITE_URL + "/product/api/updateProduct",
        {
          id: disp._id,
          name: name,
          description: description,
          price: price,
          quantity: quantity,
          token: tok,
        }
      );
      if (res.data.success) {
        console.log(res);
        toast.success("product updated");
        getProducts();
        handleClose();
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error(err.message);
    }
  }
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Control
                className="my-3"
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Control
                className="my-3"
                type="text"
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formQuantity">
              <Form.Control
                className="my-3"
                type="text"
                placeholder="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPrice">
              <Form.Control
                className="my-3"
                type="text"
                placeholder="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Button
              className="btn btn-sm w-100 my-3"
              variant="warning"
              type="button"
              onClick={updateData}
            >
              Update
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default Modal1;
