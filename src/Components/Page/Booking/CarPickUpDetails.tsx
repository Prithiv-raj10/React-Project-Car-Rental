import React,{useState} from 'react'
import { rentItemModel } from '../../../Interfaces'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Storage/Redux/store'
import { inputHelper } from '../../../Helper'
import { MiniLoader } from '../Common'


function CarPickUpDetails() {
    const[loading,setLoading]=useState(false);
    const bookingFromStore: rentItemModel[] =useSelector(
        (state: RootState) => state.bookingStore.rentItems?? []
    )
    let total=bookingFromStore.map((item)=>(item.carList?.rent));
    const initialUserData={
        name:"",
        email:"",
        phoneNumber:"",
    };

    const[userInput,setUserInput]=useState(initialUserData);
    const handleUserInput=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const tempData =inputHelper(e,userInput);
        setUserInput(tempData);
    };

    const handleSubmit =async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        setLoading(true);
    };
  return (
    <div className="border pb-5 pt-3">
    <h1 style={{ fontWeight: "300" }} className="text-center text-success">
      Pickup Details
    </h1>
    <hr />
    <form onSubmit={handleSubmit} className="col-10 mx-auto">
      <div className="form-group mt-3">
        Pickup Name
        <input
          type="text"
          value={userInput.name}
          className="form-control"
          placeholder="name..."
          name="name"
          onChange={handleUserInput}
          required
        />
      </div>
      <div className="form-group mt-3">
        Pickup Email
        <input
          type="email"
          value={userInput.email}
          className="form-control"
          placeholder="email..."
          name="email"
          onChange={handleUserInput}
          required
        />
      </div>

      <div className="form-group mt-3">
        Pickup Phone Number
        <input
          type="number"
          value={userInput.phoneNumber}
          className="form-control"
          placeholder="phone number..."
          name="phoneNumber"
          onChange={handleUserInput}
          required
        />
      </div>
      <div className="form-group mt-3">
        <div className="card p-3" style={{ background: "ghostwhite" }}>
          <h5>Total : ₹{total}</h5>
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-lg btn-success form-control mt-3" disabled={loading}
      >
       {loading? <MiniLoader />:"Looks Good? Place Order!"}
      </button>
    </form>
  </div>
  )
}

export default CarPickUpDetails