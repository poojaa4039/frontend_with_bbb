import axios from 'axios';

import React from 'react';
import '../css_files/email.css';
export default class EmailForm extends React.Component{

state={
  email:{subject:"",msgBody:""},meeting_id:'',events:[]
}


  handleSend=async(e)=>{
    e.preventDefault();
    const {email,meeting_id}=this.state;
  
    try{
    const response=await axios.post('http://localhost:8087/users/send/'+meeting_id,email)
    console.log(response)
if(response.status==200){
document.getElementById('msg').innerHTML="Email sent successfully!!!"
}
        else{
          document.getElementById('msg').innerHTML="Unable to send email!!!"
   
      }
  }catch(error){
    document.getElementById('msg').innerHTML="No User Registered  For This Event!!!"
      
  }
  setTimeout(function(){document.getElementById('msg').innerHTML=""},3000)
    } 

handleChange=(e)=>{
let {email,meeting_id}=this.state
if(e.target.name=="meeting_id")
meeting_id=e.target.value
else
email[e.target.name]=e.target.value;
this.setState({email, meeting_id})

}
componentDidMount=async ()=>{
  const {data:events}=   await axios.get("http://localhost:8087/meetings/get_meetings");
console.log(events)
  this.setState({events})
}

render(){
  const {email,meeting_id,events}=this.state;
  
    return( 
      
      <>
       <h4 className=" text-dark" id="msg" style={{left:"33%",position:"relative"}}></h4><br/>
      
      <div id="emailform" className="container" >
<form onSubmit={this.handleSend}>


<div class="form-group"  style={{ marginBottom: 30}}>
		<select name="meeting_id" onChange={this.handleChange} className="form-control">
    <option key="" disabled selected value="">Select Event Date</option>
   
  
   {events.map(e=>(<option key={e.id} value={e.id}>{e.date}</option>))}
    </select>

	
	</div>

         <div className = "form-group" style={{ marginBottom: 30}}>
            <label>Email Subject</label>
               <input id="subject" type = "text" className = "form-control" name="subject" value={email.subject} onChange={this.handleChange}/>
         </div>
         <div className = "form-group">
            <label>Email Content</label>
            <textarea id="msgbody" className = "form-control" rows = "8" name="msgBody" value={email.msgBody} onChange={this.handleChange}></textarea>
         </div>
   
        
        <div id="button" className="row1">
    <button>Send</button>
  </div></form>
      </div></>)
}

}