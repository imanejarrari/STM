import AuthForm from "./Auth/Auth";

export default function LoginPage ({ setLoggedIn }){
    return(
        <div>
        <AuthForm setLoggedIn={setLoggedIn}></AuthForm>
        </div>
    )
}