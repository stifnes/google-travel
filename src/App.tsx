import './App.css';
import AuthenticationPage from './components/authentication/page';
import HomePage from './pages/homepage';
import LocationDetails from './pages/lcoationDetails';
import { BrowserRouter as Router,Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext'
import { useLocationContext } from './hooks/useLocationContext';


function App() {
  const { user }: any = useAuthContext()
  const {locations}: any = useLocationContext()

  return (
  <Router>
      <Routes>
        <Route path="/" 
        element={user ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route 
          path="/login" 
          element={!user ? <AuthenticationPage /> : <Navigate to="/" />} 
        />
        <Route path="/location/:id"  element={<LocationDetails location={locations} />}
        />
      </Routes>
  </Router>
  )
}

export default App
