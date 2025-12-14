import { Field, FieldGroup } from '@/components/ui/field';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Loader2 } from 'lucide-react'; 
import IncrediDoseLogo from '@/assets/logo-image.png';
import IncrediDoseText from '@/assets/logo-text.png';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false); 
    const navigate = useNavigate();

    const login = async () => {
        setIsLoading(true); 
        
        try {
            const response = await fetch('/server/includes/login.php?action=login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email.trim(),
                    password: password
                })
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('user', JSON.stringify({
                    id: data.userid,
                    name: `${data.firstname} ${data.lastname}`,
                    email: data.email,
                    role: data.role,
                    token: data.token
                }));
                
                localStorage.setItem('token', data.token);
                
                if (data.role === 'pcr') {
                    navigate('/pharmacist/dashboard');
                } else if (data.role === 'doctor') {
                    navigate('/doctor/dashboard');
                } else {
                    navigate('/patient/dashboard');
                }
            } else {
                alert(data.error || 'Login failed');
            }
        } catch (error) {
            alert('Login failed. Please check your credentials.');
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useState(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            if (user.role === 'pharmacist') {
                navigate('/pharmacist/dashboard');
            }
        }
    });

    return(
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
            
            <div className="flex w-full max-w-4xl overflow-hidden rounded-xl shadow-2xl">
                
                <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 bg-black text-white">
                    <div className="text-center">
                        <img 
                            src={IncrediDoseLogo} 
                            alt="IncrediDose Logo" 
                            className="w-20 h-20 mx-auto mb-6" 
                        />
                        <img 
                            src={IncrediDoseText} 
                            alt="IncrediDose Logo" 
                            className="w-70 h-auto mx-auto mb-6" 
                        />
                        <p className="mb-8 opacity-90">
                            The secure portal for managing patient prescriptions and doctor records.
                        </p>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 p-10 bg-white">
                    <div className="mb-8">
                        <h2 className="text-3xl font-semibold text-gray-800">Log In</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Use your credentials to access the Doctor Portal.
                        </p>
                    </div>
                    
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        login();
                    }}>
                        <FieldGroup className="flex flex-col gap-6">
                            <Field>
                                <Label htmlFor="email">Email</Label>
                                <Input 
                                    id="email" 
                                    type="email" 
                                    placeholder="you@doctor.com" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                    disabled={isLoading}
                                />
                            </Field>
                            <Field>
                                <Label htmlFor="password">Password</Label>
                                <Input 
                                    id="password" 
                                    type="password" 
                                    placeholder="••••••••" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                    disabled={isLoading}
                                />
                            </Field> 
                            <Field className="pt-2">
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {isLoading ? 'Authenticating...' : 'Sign In'}
                                </Button>
                            </Field>          
                        </FieldGroup>
                    </form>

                </div>
            </div>
        </div>
    );
}

// Simple auth utility for other components
export function getCurrentUser() {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
}

export function getToken() {
    return localStorage.getItem('token');
}

export function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login';
}

export function isLoggedIn() {
    return !!localStorage.getItem('user');
}