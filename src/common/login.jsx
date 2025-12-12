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

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[isLoading, setIsLoading] = useState(false); 
    const navigate = useNavigate();

    const login = async () => {
        setIsLoading(true); 
        // replace api
        try {
            await new Promise(resolve => setTimeout(resolve, 1500)); 
            alert(`Simulated login for: ${email}`);
            navigate('/doctor/dashboard');
        } catch (error) {
            alert("Login failed. Please check your credentials.");
        } finally {
            setIsLoading(false); 
        }
    };

    return(
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
            
            <div className="flex w-full max-w-4xl overflow-hidden rounded-xl shadow-2xl">
                
                <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 bg-[#CB558C] text-white">
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
                                <Input id="email" type="email" placeholder="you@doctor.com" 
                                    onChange={(e) => setEmail(e.target.value)} required disabled={isLoading}/>
                            </Field>
                            <Field>
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" placeholder="••••••••" 
                                    onChange={(e) => setPassword(e.target.value)} required disabled={isLoading}/>
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