import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./App.css";
import AppRouter from "./routing/AppRouter";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggableF
        pauseOnHover
        theme="colored"
        // transition:Bounce
      />
      <AppRouter />
    </div>
  );
}

export default App;
