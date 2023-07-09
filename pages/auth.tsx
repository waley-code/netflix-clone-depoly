import Input from "@/components/input";
import axios from "axios";
import { useCallback, useState } from "react";
import {signIn} from 'next-auth/react'
import {FcGoogle} from 'react-icons/fc';
import {FaGithub} from 'react-icons/fa';



const Auth = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [variant, setVariant] = useState('Login');
    const toggleVariant = useCallback(() => {setVariant((currentVariant) => currentVariant == 'Login' ? 'register' : 'Login')}, [])


    const login = useCallback(async () => {
        try {
            const nr = await signIn('credentials', {
                email,
                password,
                callbackUrl: '/profiles'
            });
            // if (nr?.ok) {
            //     router.push('/');
            // }
            
        } catch (error) {
            console.log(error);
            
        }
    }, [email, password])

    const register = useCallback(async () => {
        try {
            await axios.post('/api/register', {
                email,
                name,
                password
            });
            login()
        } catch (error) {
            console.log(error);
            
        }
    }, [email, name, password, login]);

    return (
        <div className="absolute w-full h-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center  bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src={`/images/logo.png`} alt="logo" className="h-12" />
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-txl mb-8 font-semibold">
                            {variant === 'Login'? 'Sign in': 'Register' }
                        </h2>
                        <div className="flex flex-col gap-4">
                            {
                                variant === 'register' &&(
                                    <Input
                                    label="Username"
                                    onChange={(env: any)=> setName(env.target.value)}
                                    id="name"
                                    type="text"
                                    value={name}
                                    />
                                )
                            }
                            <Input
                            label="Email"
                            onChange={(env: any)=> setEmail(env.target.value)}
                            id="email"
                            type="email"
                            value={email}
                            />
                            <Input
                            label="password"
                            onChange={(env: any)=> setPassword(env.target.value)}
                            id="password"
                            type="password"
                            value={password}
                            />
                        </div>
                        <button onClick={variant === 'register'? register : login} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                        {variant === 'register'? `Sign up` : `Login`}
                        </button>

                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                            <div 
                            onClick={()=>{signIn('google', {callbackUrl: '/profiles'})}}
                            className="
                            w-10
                            h-10
                            bg-white
                            rounded-full
                            flex
                            items-center
                            justify-center
                            cursor-pointer
                            hover:opacity-90
                            transition
                            ">
                                <FcGoogle size={30}/>
                            </div>
                            <div
                            onClick={()=>{signIn('github', {callbackUrl: '/profiles'})}}
                            className="
                            w-10
                            h-10
                            bg-white
                            rounded-full
                            flex
                            items-center
                            justify-center
                            cursor-pointer
                            hover:opacity-90
                            transition
                            ">
                                <FaGithub size={30}/>
                            </div>
                        </div>
                        <p className="text-neutral-500 mt-12">
                            {variant === 'register'? `Already have an account?` : `First time using NetFlix?`}
                            <span onClick={toggleVariant} className="text-white ml-1 hover:underline " >
                            {variant === 'register'? `Login` : `Sign up`}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Auth;