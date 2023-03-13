import styles from "./Dashboard.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";

const Dashboard = () => {

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();



  }

  return (
    <div>
        
    </div>
  )
}

export default Dashboard