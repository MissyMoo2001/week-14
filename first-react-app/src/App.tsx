import Calendar from "./Calendar"
import Notes from "./Notes"
import './App.css'
import Footer from "./footer"



export default function App() {
  return (
    <>
      <div className="d-flex flex-column vh-100">
        <Notes/>
      </div>
      <div className="d-flex flex-grow-1">
        <Calendar/>
      </div>
      <div className="min-height: 100vh">
      <Footer/>
      </div>
    </>
  )
}