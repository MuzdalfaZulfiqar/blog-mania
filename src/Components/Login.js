import React from 'react'
// import sign from "../Images/login.webp"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Modal from "react-bootstrap/Modal";


function Login() {

 
  const [show, setShow] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    let navigate = useNavigate()
 
    async function loginUser( email, password) {
        try {
          let response = await fetch('http://localhost:3001/api/user/login',
            {
              method :"POST",
              headers:{
                "Content-type": "application/json",
              },
              body : JSON.stringify(
                {
                  
                  "email" : email,
                  "password": password
                }
            )
            }
          )
    
          let data = await response.json();
         // we will get the token from here now we will save it in our user's local storage
         let {success, token} = data
         if(success){
            
            setMessage("Login Successfull")
            setVariant("Success")
            localStorage.setItem("auth-token", token)
            setShow(true)
            setTimeout(() => {
              setShow(false);
              navigate("/")
            }, 1000);
         }
         else{
           setVariant("Error")
           setMessage("Invalid Credentails")
           setShow(true)

         }

         
        } catch (error) {
          console.log(error)
        }
      }
      
      let [formData, setFormData] = React.useState({
       
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
        loginUser(formData.email, formData.password)
        console.log(localStorage.getItem("auth-token"))
      }
  return (
    <>
    <div className="d-flex flex-row">
      <div className="signUpimgDiv">
        {/* <img src={sign}  alt=''/> */}
      </div>
      <div className="signupformDiv d-flex flex-column justify-content-center items-center container col-md-4">
        <h3 className="container my-5">Login</h3>
        <form onSubmit={handleSubmit} className="container my-2">
         
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Enter email"
              name = "email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
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


          <button type="submit" className="cardRecipeButton">
            Login
          </button>
        </form>
        <small className='smallLogin'>Not have an account? <span className='loginNotAllowed'>
        <Link to="/signUp">Sign Up</Link>
         </span></small> 
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

        </Modal>
      }
  </>
  )
}

export default Login