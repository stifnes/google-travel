import './App.css';
import AuthenticationPage from './components/authentication/page';
import HomePage from './pages/homepage';
import { BrowserRouter as Router,Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext'


function App() {
  const { user }: any = useAuthContext()

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
      </Routes>
  </Router>
  )
}

export default App
