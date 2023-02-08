import { Route, Routes } from "react-router-dom";
import EditPage from "./Components/EditPage";
import Home from "./Components/Home";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/notes/:noteid' element={<EditPage/>}/>
    </Routes>
  )
}

export default App;
