import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./frontend/components/Footer";
import Nav from "./frontend/components/Nav";
import Routelist from "./frontend/components/Routelist";

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
