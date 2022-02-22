import { useState } from "react";
import userService from "../services/user.service";

export default function BoardUser(){

    const [content,setContent] = useState<string>('');

   userService.getUserBoard().then(response=>{
       setContent(response.data);
   }, error=>{
       setContent((error.response && error.response.data && error.response.data.message) || error.message || error.toString())
   })

    return(
        <div className="container">
        <header className="jumbotron">
          <h3>{content}</h3>
        </header>
      </div>
    )
}