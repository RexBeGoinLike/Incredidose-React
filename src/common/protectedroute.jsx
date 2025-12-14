import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }) {
    const user = localStorage.getItem('user');
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    
    return children;
}