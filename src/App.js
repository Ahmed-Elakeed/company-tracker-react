import './App.css';
import AppRouter from "./AppRouter";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./component/navbar/Navbar";
function App() {
    return (
        <div>
            <Navbar/>
            <AppRouter/>
        </div>
    );
}

export default App;
