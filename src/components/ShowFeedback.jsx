import React from 'react';
import axios from 'axios';
import ReactToPrint from 'react-to-print';
class ShowFeedback extends React.Component{

 state={
   arr:[],mid:''}
    

 componentDidMount=async ()=>{
    try{
      
       const {data:eventArray}= await axios.get("http://localhost:8087/meetings/get_meetings")
       const {data:feedbackArray}= await axios.get("http://localhost:8087/feedback")
       console.log(feedbackArray)
       let {arr}=this.state
       arr=  eventArray.map(function(e,i){
                   return {"eventDate":e.date, feedbackAr:feedbackArray.filter(f=>f.meeting_id==e.id)}
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
            {arr.map(e=> <option value={e.eventDate} key={e.eventDate} onChange={()=>this.handleChange()}>{e.eventDate}</option>)}
       </select>
       </div>
</div>

{this.getFeedbackList()}
  
   
   </div></p>
   </div>

    )
}

getFeedbackList=()=>{
  
const {arr,mid}=this.state
console.log(arr)
const filtered=arr.filter(obj=>obj.eventDate==mid)
if(mid!=''&&(filtered.length!==0&&filtered[0].feedbackAr.length==0))
return <div className="table text-center m-3" style={{width:"70%"}}><h4><em>No Candidate gave feedback for this Event!!!!!!</em></h4></div>
 
 else if((filtered.length!==0&&filtered[0].feedbackAr.length!=0))
 return  <table className="table text-center m-3 table-striped" style={{width:"80%"}}>
   <thead>
   <tr>
     <th scope="col">Name</th>
     <th scope="col">Email</th>
     <th scope="col">Feedback</th>  
     <th scope="col">Event Date</th>
    
     
     </tr>
     </thead>
    
     <tbody >
     {filtered.map(obj=>
                                (obj.feedbackAr.map(u=><tr> <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.feedback}</td> <td>{obj.eventDate}</td></tr>
                                ))
                               
                               

                               )}

   </tbody>
   </table>



}
}



export default class ReportShowFeedback extends React.PureComponent {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => {
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            ///return <a href="#">Download report </a>;
            return (<button className="btn btn-warning">Print</button>);
          }}
          content={() => this.componentRef}
        />
        <ShowFeedback ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}
