import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

//CSS toastr
import "toastr/build/toastr.css"
import "toastr/build/toastr.min"

const root = document.getElementById('root')

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>, 
    root
)
