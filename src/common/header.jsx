import logo from './../assets/logo-image.png'
import text from './../assets/logo-text.png'

export function Header(){
    return(
        //Wag mo muna gawing pink, masakit sa mata pag nagcocode ako
        <div className="flex justify-start items-center bg-black p-4 gap-2">
            <img src={logo} className="w-10 h-auto"></img>
            <img src={text} className="w-40 h-auto"></img>
        </div>
    )
}