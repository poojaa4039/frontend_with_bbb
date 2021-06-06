import React from 'react';
import '../css_files/register.css';
import axios from 'axios';


class Register extends React.Component{
    constructor()
  {
    super()
    this.state={
       user:{userName:'',email:'',contact:'',meeting_id:''},
       events:[],
		message:"",msg:""
    }
                                                                                                                                                                                                                                            
  }

componentDidMount=async ()=>{
   const {data:events}=   await axios.get("http://localhost:8087/meetings/get_meetings");
console.log(events)
   this.setState({events})
}

   changeHandler=e=>{
     const {user}=this.state;
     user[e.target.name]=e.target.value
    this.setState({user})
  }
  handleSubmit= async e=>{
	e.preventDefault();
  const {user}=this.state;
 
            try{
                 const {data}=await axios.post('http://localhost:8087/users/process_register',user)     
                this.setState({message:data, user:{userName:'',email:'',contact:'',meeting_id:''}})
                  
                }
              
              catch(err){
              this.setState({message:"Unable to connect, Network issue!!!"})
              }

           
  setTimeout(function(){
    document.getElementById("success").innerHTML="";},3000)
  
 

  }
  isFormValid(){
    const {user}=this.state;
    const regex= user.userName&&user.email&&user.contact&&user.meeting_id;
    if(regex)
        return false
    return true
  }

	render()
    {
		const {user,message,events}=this.state;
        return(
            <React.Fragment>

<div style={{width:"100%",height:"60px",background:"#22b1ed"}}>

<h2 style={{color:"white"}}>   <img src="/rclogo1.jfif" alt="logo" height="60" width="60" style={{borderRadius:"50%"}} /> <em>RealCoderZ</em></h2>
</div>

<div className="main">
<div className="coding">
<h1 style={{fontSize:"68px"}}><em>CODING BOOTCAMP </em></h1>

</div>
<div class="register-login-box">
	
	<div class="title"> <em> Event Register</em></div>
	<p id="success">{message}</p>
		
<div class="input-box">
	<form onSubmit={this.handleSubmit}>
  <div class="username">
		<select name="meeting_id" value={user.meeting_id} onChange={this.changeHandler} className="form-control">
    <option key="" selected disabled value="">Select Event Date</option>
   {events.map(e=>(<option key={e.id} value={e.id} disabled={e.date<=new Date().toISOString().split("T")[0]} style={{ background:  (e.date<=new Date().toISOString().split("T")[0])&& "#dbd8ce"}}>{e.date}</option>))}
    </select>

	
	</div>
	<div class="username">
		

		<input type="text" name="userName" value={user.userName} class="user-input" placeholder="Name"  onChange={this.changeHandler} />
	</div>
	

	<div class="email">
		

		<input type="email" name="email" value={user.email} class="email-input" placeholder="Email"  onChange={this.changeHandler}/>
	</div>

	<div class="contact">
		

		<input type="text" name="contact" value={user.contact} class="contact-input" placeholder="Phone No."  onChange={this.changeHandler}/>
    
  </div>
  
<div>
<button type="submit" class="signin-btn btn btn-outline-info" disabled={this.isFormValid()}><strong><em> Register</em></strong></button>
</div>
</form>
</div>
</div>
</div>
            </React.Fragment>
        )
    }
}
export default Register