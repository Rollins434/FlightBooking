import React, { Component } from "react";
import "./form.css";
import FData from "../FData";
import Flight from "./Flight";
class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flightData: {
        originCity: "",
        destinationCity: "",
        departureDate: "",
        returnDate: "",
        passenger: "",

      },

      result: [],
      isoneWay: true,
      sliderValue : 1000,
      toggle:true,
      returnToggle : false,
      priceArr : []
      
    };
  }

  changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      flightData: {
        ...this.state.flightData,
        [name]: value,
      },
    });
  };

  onSearch = (event) => {
      const arr = [];
      event.preventDefault();
   
    // console.log(  this.state.flightData.departureDate)
    // console.log(new Date(this.state.flightData.departureDate))
    if(this.state.isoneWay === false){
        
        const p = FData.filter((e) => {
            if (
              e.destination_city &&
              e.destination_city.includes(this.state.flightData.originCity) &&
              e.origin_city &&
              e.origin_city.includes(this.state.flightData.destinationCity) &&
              new Date(e.arrival_date) - new Date(this.state.flightData.returnDate) < 0
              &&  new Date(e.departure_date) - new Date(this.state.flightData.departureDate) > 0
            )
              return true;
              
          
            });
            arr.push(...p)
    }
    else{
      
      const d = FData.filter((e) => {
       // console.log(new Date(e.departure_date))
        if (
          e.destination_city &&
          e.destination_city.includes(this.state.flightData.destinationCity) &&
          e.origin_city &&
          e.origin_city.includes(this.state.flightData.originCity) &&
           new Date(e.departure_date) - new Date(this.state.flightData.departureDate) > 0
        )
          
          return true;
          
      });
      arr.push(...d)
    }
    
    this.setState({
      result: arr,
      priceArr : arr,
      toggle:false
    });
   
  };

  sliderChange = (e) => {
    const d = this.state.result.filter((x) => {
        if (
          x.price <= e.target.value
         )
        
          return true;
          
      });

      this.setState({
          sliderValue : e.target.value,
          priceArr : d
      })
  }
  
  setReturn =() =>{
      this.setState({
        isoneWay : false,
        returnToggle : true,
        priceArr : []
      })
      console.log(this.state.priceArr)
      
  }

  
  setOneWay =() =>{
    this.setState({
      isoneWay : true,
      returnToggle :false
    })
    
}

 
  render() {
    return (
        
        
      <div className="container">
         

        <div className="div1">
        <div className="button_container">
          <button className="button1" onClick= {this.setOneWay} >One Way</button>
          <button className="button2" onClick= {this.setReturn} >Return</button>
         </div>
          <form onSubmit = {this.onSearch}>
            <input
              type="text"
              name="originCity"
              placeholder="Enter Origin City"
              value={this.state.flightData.originCity}
              onChange={this.changeHandler}
              required
            />
            <input
              type="text"
              name="destinationCity"
              placeholder="Enter Destination City"
              value={this.state.flightData.destinationCity}
              onChange={this.changeHandler}
              required
            />
            <input
              type="date"
              name="departureDate"
              placeholder="dd-mm-yyyy"
              value={this.state.flightData.departureDate}
              onChange={this.changeHandler}
              required
            />
            {
                !this.state.isoneWay &&
                <input
                type="date"
                name="returnDate"
                placeholder="return date"
                value={this.state.flightData.returnDate}
                onChange = {this.changeHandler}
                required
                
              />
            }
           
            <input
              type="number"
              name="passenger"
              placeholder="Passengers"
              min="0"
              value={this.state.flightData.passenger}
              onChange={this.changeHandler}
              required
             
            />
             <button type="submit" >
            Search
          </button>
          </form>
       
       <div className="slider">
       <input type = "range" min = "0" max="10000" value={this.state.sliderValue} onInput={this.sliderChange} disabled = {this.state.toggle}/>
        <span>{this.state.sliderValue}</span>
       </div>
        
        
        </div>

        <div className="div2">
        
          {this.state.priceArr.length ? this.state.priceArr.map((p) => {
            return <Flight key={p._id} p={p} returnState = {this.state.returnToggle}/>;
          })
          : <h1>No result found</h1>
        }
        </div>
      </div>
    );
  }
}
export default Form;
