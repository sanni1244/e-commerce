import React from 'react'
import { useState } from 'react'

const Loggedm = ({islogged, aname}) => {

    const [isloggedIn, setLogged] = useState(islogged || false)
    const [userY, setuserY] = useState(aname || "E")


  return {isloggedIn, userY} 
}

export default Loggedm
