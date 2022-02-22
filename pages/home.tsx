import { useState } from "react";
import userService from "../services/user.service";

export default function Home(){
     const [content,setContent] = useState<string>('');

    userService.getPublicContent().then(response =>{
      setContent(response.data);
    }, error =>{
        setContent((error.response && error.response.data) || error.message || error.toString());
    })

    return(
        <div className="container">
        <header className="jumbotron">
          <h3>{content}</h3>
        </header>
      </div>
    )
}