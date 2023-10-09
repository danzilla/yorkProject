// import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


function App(props) {

  let questionList = [
    {isSelected: '', question: 'Foot Brake - holds, stops vehicle smoothly'},
    {isSelected: '', question: 'Clutch and Gearshift - shifts smoothly without jumping or jerking'},
    {isSelected: '', question: 'Steering - moves smoothly; no "play"'},
    {isSelected: '', question: 'Parking Brake - holds against slight acceleration'},
    {isSelected: '', question: 'Lights - headlights, warning lights, and turn signals operational'},
    {isSelected: '', question: 'Dash Control Panel - all lights and gauges operational'},
    {isSelected: '', question: 'All Moving Parts - no strange noises'},
    {isSelected: '', question: 'Horn – operational'},
    {isSelected: '', question: 'Visibility - mirrors properly adjusted; windows clean and intact'},
    {isSelected: '', question: 'Wipers/washer - functioning and intact'},
    {isSelected: '', question: 'Tires - pressure, tread depth or damage'},
    {isSelected: '', question: 'Wheels and fasteners - no defects in rim, loose or missing fasteners'},
    {isSelected: '', question: 'Seat belts - in good condition and being used'},
    {isSelected: '', question: 'Vehicle back-up alarm - operational, where required'},
    {isSelected: '', question: 'Hydraulic systems - no evidence of leaks and systems operate smoothly'},
    {isSelected: '', question: 'For tractors, power take off shields - in place'},
    {isSelected: '', question: 'Fluid levels verified - oil, gas, brakes, washer fluid. Check for leaks'},
    {isSelected: '', question: 'Load - secure and complying with regulations; hitch in good condition'},
    {isSelected: '', question: 'Emergency equipment - installed and inspected as required by law or company policy'},
    {isSelected: '', question: 'Additional Notes: \nRecord and report any defects to your supervisor immediately.'}
  ]

  const [questions, setQuestions] = useState(questionList);

  const listOfQuestion = questions.map((question, i) =>
    <div className="form-check" key={i}>
      <input onChange={() => setQuestions(questionsP => {
          const newOptions = [...questionsP];
          newOptions[i] = { ...newOptions[i], isSelected: !newOptions[i].isSelected};
          return newOptions;
        })} 
        className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
      <label className="form-check-label" htmlFor="flexCheckDefault"> {question.question} </label>
    </div>
    );

    const [userName, setUserName] = useState("Empty")
    const [userEmail, setUserEmail] = useState("Empty")
    const [userID, setUserID] = useState("Empty")
    useEffect(() => {
      const user_name = localStorage.getItem("user_name");
      const user_id = localStorage.getItem("user_id");
      const user_email = localStorage.getItem("user_email");
      if (user_id) {
        setUserName(user_name);
        setUserEmail(user_email);
        setUserID(user_id);
      }
    }, []);


  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }


  const [message, setMessage] = useState("")

    const handleSubmit = (event) => {
      // console.log("HERROR");
      // console.log(JSON.stringify(questions));
      // console.log(JSON.stringify(inputs))
      // console.log(userName + userEmail + userID);
      let userInfo = {
        userName: userName,
        userID: userID,
        userEmail: userEmail
      }
      event.preventDefault();
      axios.post(`http://localhost:5000/api/Addvehicle`, {  
        userInfo: userInfo,
        questions: questions,
        vechicleInfo: inputs 
      } )
        .then((data) => {
          if(data.data.data[0].rowCount === 0){
              console.log("Record has not been added");
              setMessage("Record has not been added")
          } else if (data.data.data[0].rowCount === 1){
              console.log("Record has been added!");
              setMessage("Record has been added")

              // delat redirect
              setTimeout(function () {
                window.location.href = '/view'
             }, 2000)

          }
        })
        .catch((err) => { 
          console.log('bad', JSON.stringify(err))
          setMessage("Record has not been added")
        })
    }



  return (
    
    <>
    <div className="row">
      <div className="col-12 p-4" style={{ backgroundColor: 'black', color: 'white' }}>
        <h1>Vehicle Start-up - The Circle Check</h1>
      </div>
    </div>

      <div className="container">
        
        <div className='p-4 row align-items-center justify-content-center'>
          <h1 className='text-center'>Vehicle inspection <hr /></h1>
          <div className="col-6">
            <h3>What should I do before starting a vehicle?</h3>
            <ul className="list-group">
              <li className="list-group-item">Read, understand, and follow manufacturer's operating manual.</li>
              <li className="list-group-item">Know how to operate the vehicle and use any related equipment or attachments safety. Be familiar with the location and function of all the controls. </li>
              <li className="list-group-item">Inspect your vehicle daily. </li>
              <li className="list-group-item">Develop a routine method of inspecting vehicle (e.g. start at the front on the driver's side and walk towards the back, and around past the passenger side, checking the items listed below).</li>
            </ul>
          </div>
          <div className="col-6">
          <img src="https://www.ccohs.ca/images/oshanswers/L13(1).gif" className="rounded mx-auto d-block" alt="..." />
          </div>
        </div>

        <div className="p-4 row align-items-center justify-content-center ">
          <hr />
          <h1 className='text-center'>Vehicle Inspection Checklist</h1>
          <div className="col-8">
            <div className='row align-items-center justify-content-center'>
              <div className="col-6">
                <div className="m-2 input-group flex-nowrap">
                  <span className="input-group-text" id="addon-wrapping">Vehicle or Equipment Inspected: </span>
                  <input 
                    name='vechicle'
                    value={inputs.vechicle || ""} 
                    onChange={handleChange}
                    type="text" className="form-control" placeholder="CLB123" aria-label="Username" aria-describedby="addon-wrapping" />
                </div>
              </div>
              <div className="col-6">
                <div className="m-2 input-group flex-nowrap">
                  <span className="input-group-text" id="addon-wrapping">Date</span>
                  <input 
                    name='date'
                    value={inputs.date || ""} 
                    onChange={handleChange}
                    type="date" className="form-control" placeholder="YYYY-MM-DD" aria-label="email" aria-describedby="addon-wrapping" />
                </div>
              </div>
              <div className="col-6">
                <div className="m-2 input-group flex-nowrap">
                  <span className="input-group-text" id="addon-wrapping">Odometer</span>
                  <input 
                    name='odometer'
                    value={inputs.odometer || ""} 
                    onChange={handleChange}
                    type="text" className="form-control" placeholder="688899" aria-label="email" aria-describedby="addon-wrapping" />
                </div>
              </div>
              <div className="col-6">
                <div className="m-2 input-group flex-nowrap">
                  <span className="input-group-text" id="addon-wrapping">Operator</span>
                  <input 
                    name='operator'
                    value={inputs.operator || ""} 
                    onChange={handleChange}
                    type="text" className="form-control" placeholder="Your Name" aria-label="email" aria-describedby="addon-wrapping" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-8">
            <div className='row'>
              <div className='col-12'>    
                {listOfQuestion}
              </div>
            </div>
            <div className="m-2 col">
              <button onClick={handleSubmit} 
                 data-bs-toggle="modal" data-bs-target="#exampleModal" 
                 type="submit" className="btn btn-primary mb-3">Submit</button>
           
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
