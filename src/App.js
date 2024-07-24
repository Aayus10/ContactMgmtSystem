import AddContact from "./components/addContact/AddContact";
import EditContact from "./components/editContact/EditContact";
import EditForm from "./components/editContact/EditForm";
import Home from "./components/homepage/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/addContact" element={<AddContact />} />
          <Route path="/editContact" element={<EditContact />} />
          <Route path="/editForm" element={<EditForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
