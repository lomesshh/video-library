import "./App.css";
import { Footer, Nav, Routelist } from "frontend/components";

//library imports
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Nav />
      <Routelist />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
