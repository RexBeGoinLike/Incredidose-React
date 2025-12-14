// auth.js (or auth.jsx)
import { useEffect, useState } from 'react';

export function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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
        const response = await fetch('/server/includes/login.php?action=login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        });
        
        const data = await response.json();
        if (data.success) {
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
        }
        return data;
    };

    const logout = async () => {
        await fetch('/server/includes/login.php?action=logout', {
            credentials: 'include'
        });
        setUser(null);
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    useEffect(() => {
        checkSession();
        
        const interval = setInterval(checkSession, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    return { user, loading, login, logout, checkSession };
}