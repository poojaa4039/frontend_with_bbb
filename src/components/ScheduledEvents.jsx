import React from 'react';
import axios from 'axios';

class ScheduledEvents extends React.Component
{
    constructor(){
        super()
    
this.state={
    eventList:[],
    view:0
}
}
    componentDidMount=async ()=>{
         try{
        await axios.get("http://localhost:8087/meetings/get_meetings")
        .then(res=>{
            if(res.data.length>0)
this.setState({eventList:res.data})
else
this.setState({view:1})
        })
    }
    catch(error)
    {
        this.setState({view:2})
    }


    }

    JoinAsModerator=(link)=>{
   
    if(window.confirm("Are You Sure You want to join now!"))
          window.location=link;
          else
          this.setState({view:0})
    }
    render(){
        return(
            <div>
              {this.state.view===0 &&   <table className="table text-center m-3 table-striped" style={{width:""}}>
   <thead>
   <tr>
     <th scope="col">Id</th>
     <th scope="col">Event Date</th>
     <th scope="col">Start Time</th>
     <th scope="col">End Time</th>
     <th scope="col">Moderator Link</th>  
    
     </tr>
     </thead>
     <tbody >
         {this.state.eventList.map((eventDetail,)=><tr>
             <td style={{color:"rgb(6, 102, 62)"}}>{eventDetail.id}</td>
             <td style={{color:"rgb(6, 102, 62)"}}>{eventDetail.date}</td>
             <td style={{color:"rgb(6, 102, 62)"}}>{eventDetail.start_time}</td>
             <td style={{color:"rgb(6, 102, 62)"}}>{eventDetail.end_time}</td>
             <td><button className=" btn btn-outline-danger" onClick={()=>this.JoinAsModerator(eventDetail.moderator_link)}>Join As Moderator</button></td>
         </tr>

         )}
         </tbody>
         </table>
    }

    {this.state.view===1 && <h2 style={{textAlign:"center"}}><em>No Event Scheduled Yet!!!!!</em></h2>}
    {this.state.view===2 && <h3 style={{textAlign:"center"}}><em>Service is down,try after sometime!!!!!</em></h3>}
            </div>
        )
    }
}
export default ScheduledEvents