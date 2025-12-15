// auth.js (or auth.jsx)
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const checkSession = async () => {
        try {
            const response = await fetch('/server/includes/login.php?action=session', {
                credentials: 'include'
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setUser(data);
                    localStorage.setItem('user', JSON.stringify(data));
                } else {
                    setUser(null);
                    localStorage.removeItem('user');
                }
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        await fetch('/server/includes/login.php?action=login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            if(data.role == 'admn'){
                fetch(`node/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({email, password}),
                    credentials: 'include'
                })
            }
            return data;
        })
    };

    const logout = async () => {
        await fetch('/server/includes/login.php?action=logout', {
            credentials: 'include'
        });
        setUser(null);
        localStorage.removeItem('user');
        navigate('/')
    };

    useEffect(() => {
        checkSession();
        
        const interval = setInterval(checkSession, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    return { user, loading, login, logout, checkSession };
}