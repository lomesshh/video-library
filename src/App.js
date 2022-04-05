import "./App.css";
import { Footer, Nav, Routelist } from "frontend/components";

//library imports
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useData } from "frontend/context";

function App() {
  const { theme } = useData();

  return (
    <div className="App" data-theme={theme}>
      <Nav />
      <Routelist />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
