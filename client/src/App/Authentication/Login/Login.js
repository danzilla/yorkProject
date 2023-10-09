import { useState } from 'react';
import axios from 'axios';

function App(props) {

  // User input 
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  // Form Submission 
  const [message, setMessage] = useState("")
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`http://localhost:5000/api/login`, {  userInfo: inputs } )
      .then((data) => {
        if(data.data.data[0].rowCount === 0){
            console.log("User not found");
            setMessage("User not found")
        } else if (data.data.data[0].rowCount === 1){
            console.log("User found!");
            setMessage(data.data.data[0].rows[0].user_name + "  User has been found!")
            localStorage.setItem('user_name', data.data.data[0].rows[0].user_name)
            localStorage.setItem('user_email', data.data.data[0].rows[0].user_email)
            localStorage.setItem('user_id', data.data.data[0].rows[0].user_id)
            console.log(JSON.stringify(data.data.data[0].rows[0]));

            // delat redirect
            setTimeout(function () {
              window.location.href = '/dashboard'
           }, 2000)
        }
      })
      .catch((err) => { 
        console.log('bad', JSON.stringify(err))
      })
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
        <div className="col-5">
          <h3 className='text-center'>Hello! Login to access vehicle inspection checklist</h3>
        </div>
        <div className="col-6 ">

          <div className="m-2 input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">Email</span>
            <input 
              name='username'
              value={inputs.username || ""} 
              onChange={handleChange}
              type="text" className="form-control" placeholder="Hi@hello.ca" aria-label="Username" aria-describedby="addon-wrapping" />
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
            <button className='btn btn-link mb-3' onClick={props.activeRegister} type="link"> Register</button>
           
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
