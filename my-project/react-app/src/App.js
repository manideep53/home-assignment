import AdminPage from './Components/AdminPage';
import { Route,Routes } from 'react-router-dom';

// import JiraComponent from './components/JiraComponent';
 import LoginPage from './Components/LoginPage';
const App = () => {
  
  return (
    <div>
     
    
     
      {/* < JiraComponent /> */}
     <Routes>
     <Route path="/" element={<LoginPage />}/>
      <Route path="/admin" element={<AdminPage />}/>
     </Routes>

    </div>
  );
};

export default App;