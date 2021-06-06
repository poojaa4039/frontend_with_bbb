import React from 'react';
import axios from 'axios';
import ReactToPrint from 'react-to-print';
class RegisteredUsers extends React.Component{

state={
    arr:[],mid:''

    }
 componentDidMount=async ()=>{
    try{
  const {data:users}= await axios.get("http://localhost:8087/users/registered_users")
  const {data:eventArray}= await axios.get("http://localhost:8087/meetings/get_meetings")
       let {arr}=this.state
       arr=  eventArray.map(function(e,i){
                   return {"eventDate":e.date, UserArray:users.filter(u=>u.meeting_id==e.id)}
                 })

          this.setState({arr})
    }
    catch(er){
        console.log(er)
    }
}

  
handleChange=e=>{
    let {mid}=this.state
    mid=    e.target.value;
    console.log(mid+"gh")
    this.setState({mid})
}


   
  render(){
    const{mid,arr} =this.state
    return(
  
        <div>
 
   
   
   

   <p style={{position:"relative",left:"8%"}}><div id="b">

   <div className="row">
   <div className="col-3" style={{marginLeft:"200px"}}>
   <em><b>Select Event Date:</b></em>
   <select name="mid" value={mid} onChange={this.handleChange} className="form-control">
       <option value="" selected disabled> Event Date</option>
            {arr.map(e=> <option value={e.eventDate} key={e.eventDate}>{e.eventDate}</option>)}
       </select>
       </div>
</div>

{this.getUserList()}
       
   </div></p>
   </div>

    )
}

getUserList=()=>{
    const {arr,mid}=this.state
    const filtered=arr.filter(obj=>obj.eventDate==mid)
    console.log(filtered)
    if(mid!=''&&(filtered.length!==0&&filtered[0].UserArray.length==0))
    return <div className="table text-center m-3" style={{width:"70%"}}><h4><em>No Candidate registered for this Event!!!!!!</em></h4></div>
     
     else if((filtered.length!==0&&filtered[0].UserArray.length!=0))
     return  <table className="table text-center m-3 table-striped" style={{width:"80%"}}>
       <thead>
       <tr>
         <th scope="col">Name</th>
         <th scope="col">Email</th>
         <th scope="col">Contact</th>  
         <th scope="col">Event Date</th>
        
         
         </tr>
         </thead>
        
         <tbody >
         {filtered.map(obj=>
                                    (obj.UserArray.map(u=><tr> <td>{u.userName}</td>
                                    <td>{u.email}</td>
                                    <td>{u.contact}</td><td>{obj.eventDate}</td></tr>
                                    ))
                                    
                                   

                                )}

       </tbody>
       </table>
 
}

}

export default class Report extends React.PureComponent {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => {
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            ///return <a href="#">Download report </a>;
            return ( <button className="btn btn-warning" >Print</button>);
          }}
          content={() => this.componentRef}
        />
        <RegisteredUsers ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}