import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup } from '@/components/ui/field';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function Login() {

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const navigate = useNavigate();

    const login = () => {
        alert(`Email: ${email}\nPassword: ${password}`);
        navigate('/patient/dashboard');
    };

    return(
        <div className="flex justify-center items-center w-full p-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Welcome to Mobile Legends</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        login()
                    }}>
                        <FieldGroup className="flex flex-col gap-6">
                            <Field>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="you@email.com" 
                                    onChange={(e) => setEmail(e.target.value)} required/>
                            </Field>
                            <Field>
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" placeholder="••••••••" 
                                    onChange={(e) => setPassword(e.target.value)} required/>
                            </Field> 
                            <Field>
                                <Button type="submit">Login</Button>
                            </Field>          
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}