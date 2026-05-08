import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Owner from "./pages/Owner";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Route path="/" component={Home} />
      <Route path="/owner" component={Owner} />
    </BrowserRouter>
  );
}

export default App;
