import { Button } from '@/components/ui/button'
import logo from './../assets/logo-image.png'
import text from './../assets/logo-text.png'
import { useAuth } from './authentication/auth'
import { useNavigate } from 'react-router-dom';

export function Header(){

    const { logout } = useAuth();
    const navigate = useNavigate();
    return(
        //Wag mo muna gawing pink, masakit sa mata pag nagcocode ako
        <div className="flex justify-between items-center bg-black p-4 gap-2">
            <div onClick={() => navigate('/') } className="flex gap-2 w1/1">
                <img src={logo} className="w-10 h-auto"></img>
                <img src={text} className="w-40 h-auto"></img>     
            </div>

            <Button variant="outline" onClick={() => logout()}>Log out</Button>
        </div>
    )
}