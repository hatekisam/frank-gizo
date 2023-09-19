import React from 'react'
import { BsChatLeftDotsFill } from "react-icons/bs";


import "./ChatButton.css"
function ChatButton({onClick}) {
  return (
    <button className="round-button" onClick={onClick}>
        <BsChatLeftDotsFill/>
    </button>
  )
}

export default ChatButton