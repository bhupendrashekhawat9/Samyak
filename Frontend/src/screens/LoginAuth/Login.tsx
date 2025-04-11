import React, { useState } from 'react';  
import { useLoginAuth } from "@contextProviders/LoginAuthProvider";
import type { loginAuthContextType } from "@contextProviders/LoginAuthProvider";
import { FaGithub, FaGoogle } from 'react-icons/fa';
let APPNAME = "Samyak";
const LoginScreen: React.FC = () => {  
  const {methods,state} = useLoginAuth() as loginAuthContextType;

  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');
  const handleGoogleLogin = () => {  
    // Implement Google OAuth login  
    methods.loginGoogle()
  };  

  const handleGitHubLogin = () => {  
    // Implement GitHub OAuth login  
    methods.loginGIthub()
  };  

  const handleEmailNext = () => {  
    // Implement email authentication flow  
    methods.login({email,password})
  };  

  
  return (  
    <div className="flex h-screen">  
      {/* Left Side - Login Form */}  
      <div className="w-1/4 flex flex-col justify-atart p-12 space-y-6">  
        <div className="space-y-4">  
          <h1 className="text-2xl font-bold text-gray-800">{APPNAME}</h1>  
          <p className="text-gray-600">Log in to your account</p>  
          <p className="text-sm text-gray-500">  
            Don't have an account?   
            <a href="/signup" className="text-blue-600 ml-1 hover:underline">  
              Sign Up  
            </a>  
          </p>  
        </div>  

        {/* OAuth Buttons */}  
        <div className="space-y-3">  
          <button   
            onClick={handleGoogleLogin}  
            className="w-full flex items-center justify-center space-x-2   
            border border-gray-300 py-2 rounded-md   
            hover:bg-gray-50 transition duration-300"  
          >  
           <FaGoogle/>
            <span>Continue with Google</span>  
          </button>  
          
          <button   
            onClick={handleGitHubLogin}  
            className="w-full flex items-center justify-center space-x-2   
            border border-gray-300 py-2 rounded-md   
            hover:bg-gray-50 transition duration-300"  
          >  
          <FaGithub/>
            <span>Continue with GitHub</span>  
          </button>  
        </div>  

        {/* Divider */}  
        <div className="flex items-center justify-center space-x-4">  
          <div className="h-px bg-gray-300 flex-grow"></div>  
          <span className="text-gray-500 text-sm">Or with email and password</span>  
          <div className="h-px bg-gray-300 flex-grow"></div>  
        </div>  

        {/* Email Input */}  
        <div className="space-y-3">  
          <input   
            type="email"   
            placeholder="Email Address"  
            value={email}  
            onChange={(e) => setEmail(e.target.value)}  
            className="w-full px-4 py-2 border border-gray-300 rounded-md   
            focus:outline-none focus:ring-2 focus:ring-blue-500"  
          />  
          <input
            type="password"
            placeholder="Password"
            value={password}
            className="w-full px-4 py-2 border border-gray-300 rounded-md   
            focus:outline-none focus:ring-2 focus:ring-blue-500"  
            onChange={(e) => setPassword(e.target.value)}
          />
          <div   
            onClick={handleEmailNext}  
            className="w-full bg-blue-600 text-white p-2 flex items-center justify-center rounded-md   
            hover:bg-light-blue-700 transition duration-300 cursor-pointer"  
          >  
            Login  
          </div>  
        </div>  
      </div>  

      {/* Right Side - Feature Showcase */}  
      <div className="w-3/4 bg-gradient-to-br from-teal-700 to-blue-900   
      text-white flex flex-col justify-center p-12 space-y-6">  
        <div>  
          <h2 className="text-2xl font-bold mb-4">{APPNAME} 1.0</h2>  
          <p className="text-lg">  
            Up to 32% more productivity, improved task management,  
          </p>  
          <p className="text-lg">  
            expanded note-taking capabilities, and more.  
          </p>  
        </div>  

        <a   
          href="/features"   
          className="text-green-300 hover:underline flex items-center space-x-2"  
        >  
          <span>See everything that's new</span>  
        
        </a>  

        {/* Decorative Illustrations Placeholder */}  
        <div className="mt-8 space-y-4 opacity-20">  
          <div className="h-2 bg-white/20 rounded w-3/4"></div>  
          <div className="h-2 bg-white/20 rounded w-1/2"></div>  
          <div className="h-2 bg-white/20 rounded w-2/3"></div>  
        </div>  
      </div>  
    </div>  
  );  
};  

export default LoginScreen;