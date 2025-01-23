import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

export function Dashboard () {
  const [userInfo, setUserInfo] = useState({
    firstName: "u",
    balance: 0
  });

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/user/userinfo", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }).then((response) => {
      setUserInfo(response.data);
    })
  }, []);
  
  return (
    <div>
      <Appbar firstName={userInfo.firstName}/>
      <div>
        <Balance value={userInfo.balance}/>
        <Users/>
      </div>
    </div>
  )
}