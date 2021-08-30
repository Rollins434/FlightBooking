import React from 'react'
import './flight.css'

const Flight = ({p,returnState}) => {
    
        return (
            <div className="card">
             
              <div className="card_content">
                  <p>Rs {p.price}</p>
                  <br/>
                  <span>{p.flight_code}</span>
                  <br/>
                  <div>
                  <span>{`${p.origin_city_code} < ${p.destination_city_code} `}</span>
                  <br/>
                  <span>Depart: {p.depart_time}</span>
                  <br/>
                  <span>Arrival : {p.arrival_time}</span>
                  </div>
                  <div>
                    
                      <span  className={returnState ? "spanShow" : "spanHide" } >
                          {`${p.destination_city_code} < ${p.origin_city_code}` }
                        <p>{`depart: ${p.arrival_time} ` }</p>  
                        <p>{ `arrival: ${p.depart_time}`}</p>
                          </span> 
                  
                  </div>
                 
                  

                
                 
              </div>
                <div className="card_hero">
                    <img className="card_img" src={p.image} />
                
                    <button className="card_button">Book</button>
                </div>
                
                
            </div>
        )
    }
   
    


export default Flight
