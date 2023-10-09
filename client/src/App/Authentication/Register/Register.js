// import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App(props) {

  // User inputs for submission
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  // Form submission
  const [message, setMessage] = useState("")
  const handleSubmit = (event) => {
    event.preventDefault();
    if(inputs.name && inputs.email && inputs.password){
      axios.post(`http://localhost:5000/api/addUser`, { userInfo: inputs })
      .then((data) => { 
         if (data.data.data[0].rowCount === 1){
          console.log("User Added");
          setMessage("User has been Added")

          // delat redirect
          setTimeout(function () {
            window.location.href = '/'
         }, 2000)
        }
        })
      .catch((err) => { 
        setMessage("Unable to add User")
        console.log('User not added')
      })
    } else {
      setMessage("User information require")
      console.log("User information require");
    }
  }
  
  return (

    <>
    <div className="row">
      <div className="col-12 p-4" style={{ backgroundColor: 'black', color: 'white' }}>
        <h1>Vehicle Start-up - The Circle Check</h1>
      </div>
    </div>

    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="row">
      <div className="col-12">
        <h3 className='text-center'>User Registernation</h3>
      </div>
        <div className="col-12">
          <div className="m-2 input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">Name</span>
            <input 
              name='name'
              value={inputs.name || ""} 
              onChange={handleChange}
              type="text" className="form-control" placeholder="Spong Bob" aria-label="Username" aria-describedby="addon-wrapping" />
          </div>
          <div className="m-2 input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">Email</span>
            <input 
              name='email'
              value={inputs.email || ""} 
              onChange={handleChange}
              type="text" className="form-control" placeholder="Hi@hello.ca" aria-label="email" aria-describedby="addon-wrapping" />
          </div>
          <div className="m-2 input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">Password</span>
            <input 
              name='password'
              value={inputs.password || ""} 
              onChange={handleChange}
              type="password" className="form-control" aria-label="Password" aria-describedby="addon-wrapping" />
          </div>
          <div className="m-2 col">
            <button onClick={handleSubmit} 
              data-bs-toggle="modal" data-bs-target="#exampleModal" 
              type="submit" className="btn btn-primary mb-3">Submit</button>
            <button className='btn btn-link mb-3' onClick={props.activeLogin} type="link"> Login </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" 
                  aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-body">
                      {message}
                    </div>
                  </div>
                </div>
              </div>
          </div>

        </div>
      </div>
    </div>
    </>
  );
}

export default App;
