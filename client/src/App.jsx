import './App.css'
import {Component, useState} from "react";

class App extends Component {

  connectToChat() {
    console.log("Connecting to chat...")
  }

  componentDidMount() {
    const socket = new WebSocket("ws://localhost:8080")
  }

  render() {
    return (
      <div>
        <h1>Chat App</h1>
      </div>
    )
  }
}

export default App
