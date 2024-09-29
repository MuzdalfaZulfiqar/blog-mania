// deals with create user endpoint
// import sign from "../Images/recipe4.avif";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function SignUp() {

  const [message, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState("");
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let navigate = useNavigate();
  async function createUser(name, email, password) {
    try {
      let response = await fetch('http://localhost:3001/api/user/createUser',
        {
          method :"POST",
          headers:{
            "Content-type": "application/json",
          },
          body : JSON.stringify(
            {
              "name" :name,
              "email" : email,
              "password": password,
              "savedRecipes" : []
            }
        )
        }
      )

      let data = await response.json();
      let {success, error} = data;
      if (success) {
        setMessage("Sign Up Successfull")
            setVariant("Success")
        setShow(true);
        setTimeout(() => {
          setShow(false);
          navigate('/login'); // Redirect to login after successful signup
        }, 2000);
      }
      else{
        setVariant("Error")
        setMessage("Invalid Credentails. Email already exists")
        setShow(true)
      }
      
    } catch (error) {
      console.log(error)
    }
  }
  let [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(event) {
    let {value, name} = event.target;
    setFormData(prevForm=>{
      return {
        ...prevForm, 
        [name] : value
      }
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    createUser(formData.name, formData.email, formData.password)
  }
  return (
    <>
      <div className="d-flex flex-row">
        <div className="signUpimgDiv">
          {/* <img src={sign}  alt=""/> */}
        </div>
        <div className="signupformDiv d-flex flex-column justify-content-center items-center container col-md-4">
          <h3 className="container my-5">Create an account</h3>
          <form onSubmit={handleSubmit} className="container my-2">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                aria-describedby="emailHelp"
                placeholder="Enter username"
                 name = "name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                name = "email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor ="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="d-flex gap-2 my-3">
            <button type="submit" className="cardRecipeButton">
              SignUp
            </button>
            <button type="submit" className="cardRecipeButton">
              <Link to="/login"> Login</Link>
            
            </button>
            </div>
            
          </form>
        </div>
      </div>
      
      {
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{variant}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           {message}
          </Modal.Body>
          {variant == "Success" && 
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button 
              style={{
                backgroundColor: "#f8c611", // Change to your preferred color
                color: "white",
                border: "none",
                width: "auto",
              }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
          </Modal.Footer>
          }
        </Modal>
      }
    </>
  );
}

export default SignUp;
