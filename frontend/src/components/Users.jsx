import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Users () {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then ((response) => {
        setUsers(response.data.users)
      })
      .catch ((err) => {
        console.log("Something went wrong");
      })
  }, [filter]);

  return (
    <>
      <div className="font-bold text-lg mt-6 ml-2">
        Users
      </div>
      <div className="my-2 ml-2">
        <input onChange={(e) => setFilter(e.target.value)} type="text" placeholder="Search Users.." className="w-full border rounded border-slate-300 px-2 py-2"/>
      </div>
      <div>
        {users.map(user => <User key={user._id} user={user}/>)}
      </div>
    </>
  )
}

function User ({user}) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between ml-2">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0].toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-full mr-2">
        <Button onClick={() => {
          navigate(`/send?id=${user._id}&name=${user.firstName}`);
        }} label={"Send Money"}/>
      </div>
    </div>
  )
}