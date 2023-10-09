// import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


function App(props) {

  const [vechicleInfo, setVehicleInfo] = useState();

  const viewVehicleInfo = () => {
    axios.post(`http://localhost:5000/api/viewvehicle`)
      .then((data) => {
        let msg = "Good" + JSON.stringify(data)
        console.log(msg);
        setVehicleInfo(((data.data.data[0].rows)))
      })
      .catch((err) => { 
        let msg = 'bad' + JSON.stringify(err)
        console.log(msg)
        setVehicleInfo(msg)
      })
  }

  useEffect(() => {
    viewVehicleInfo()
  }, []);

  let display;
  if(vechicleInfo){
    display = <h1>hello</h1>
    display = vechicleInfo.map((vechicle, i) => 
                  <tr key={i}>
                    <th scope="row">{vechicle.vehicleid}</th>
                    <td>{vechicle.vehicleodometer}</td>
                    <td>{vechicle.vehicleoperator}</td>
                    <td>{vechicle.vehicledate}</td>
                    <td> {
                          JSON.parse(vechicle.vehiclestate).map((xx, ii) =>
                          <>
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked={xx.isSelected} />
                              <label class="form-check-label" for="flexCheckChecked">
                                {xx.question}
                              </label>
                            </div>                          
                          </>
                          )
                    }</td>
                  </tr>)
  } else {
    display = <h1>Loading...</h1>
  }





  return (

    <>
    <div className="row">
      <div className="col-12 p-4" style={{ backgroundColor: 'black', color: 'white' }}>
        <h1>Vehicle Start-up - The Circle Check</h1>
      </div>
    </div>

    <div>
      <div className='row p-4'>
          <h1 className=' text-center'>Vehicle inspection status <hr /></h1> 
      </div>
      
        <div className='container'>
          <div className='row align-items-center justify-content-center '>
            <div className='col-10 '> 

            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Plate</th>
                  <th scope="col">Odometer</th>
                  <th scope="col">Operator</th>
                  <th scope="col">Date</th>
                  <th scope="col">State</th>
                </tr>
              </thead>
              <tbody>
                {display}
              </tbody>
            </table>
            
            </div>
          </div>
        </div>

      </div>

    </>
  );
}

export default App;
