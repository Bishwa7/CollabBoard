import { LabelledInput } from "@repo/ui/labelledInput";
import { Button } from "@repo/ui/button";
import { signin } from "../actions/auth/signin";
import { signup } from "../actions/auth/signup";


export default function AuthPage({isSignin}: {isSignin: boolean}) {
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div className="block min-w-sm max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold text-rose-300 flex justify-center">
                            {isSignin? "SIGN IN" : "SIGN UP"}
                        </div>
                    </div>
                    <div className="pt-2">
                        <form action={isSignin? signin: signup}>
                            <LabelledInput label="Email" placeholder="bishwanath@gmail.com" name="email" labelClassName="block mb-2 text-sm text-black font-semibold pt-4" inputClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                            {isSignin? null : <LabelledInput label="Username" placeholder="bishwanath" name="username" labelClassName="block mb-2 text-sm text-black font-semibold pt-4" inputClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />}
                            <LabelledInput label="Password" type={"password"} placeholder="123456" name="password" labelClassName="block mb-2 text-sm text-black font-semibold pt-4" inputClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                            <Button className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer active:scale-95"> {isSignin? "Sign In" : "Sign Up"} </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
