import { FaGoogle } from "react-icons/fa";

function Logo () {
    return (
        <div className="mb-12">
            <img src="/logo/blue/logo_text_blue.png" alt="logo" className="w-48"/>
        </div>
    )
}

function LoginBoard () {
    return (
        <div className="flex flex-col w-11/12 justify-center items-center text-center">
            <p className="text-4xl mb-8">Witaj!</p>
            <p className="text-lg mb-8">Zaloguj się, aby uzyskać dostęp:</p>
            <a href="localhost:8080/api/oauth2/authorize/google">
                <button className="flex justify-center items-center w-full md:w-96 h-16 text-white text-lg bg-blue rounded-2xl px-8">
                    <FaGoogle className="text-base mr-2"/> <p className="text-sm xs:text-lg">Kontynuuj z Google</p>
                </button>
            </a>
            <p className="text-xs font-sans w-64 mt-4">Przetworzymy Twój adres e-mail, aby sprawdzić, czy jesteś już zarejestrowany.</p>
    </div>
    )
}

export default function Page () {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <Logo/>
            <LoginBoard/>
        </div> 
    )
}