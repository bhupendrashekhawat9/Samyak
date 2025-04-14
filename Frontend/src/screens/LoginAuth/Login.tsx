import { useLoginAuth } from '@contextProviders/LoginAuthProvider';
import DoAjax from '@utils/fetch';
import React, { useState } from 'react';
import { FaGithub, FaGoogle, FaArrowRight } from 'react-icons/fa';

const APPNAME = "Samyak";

const AuthScreen = () => {
  let auth = useLoginAuth()
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleGoogleAuth = () => {
    // Implement Google OAuth
    console.log('Google Auth');
  };

  const handleGitHubAuth = () => {
    // Implement GitHub OAuth
    console.log('GitHub Auth');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = {}
    if (activeTab === 'login') {
      // Handle login
      auth.methods.login(
        {
          userEmail:email,
          password
        }
      )
      console.log('Login with:', email, password);
    } else {
      auth.methods.register({
        userName: name,
        userEmail:email,
        password
      })
       }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Side - Auth Form */}
      <div className="w-full md:w-2/5 flex flex-col justify-center p-8 md:p-12 bg-white">
        <div className="max-w-md mx-auto w-full">
          {/* Logo and Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">{APPNAME}</h1>
            <p className="text-gray-600 mt-2">Welcome back to your productivity hub</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('login')}
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === 'login'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === 'register'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500'
              }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* OAuth Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleGoogleAuth}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 
                border border-gray-300 rounded-lg shadow-sm bg-white 
                hover:bg-gray-50 transition duration-300"
              >
                <FaGoogle className="text-red-500" />
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={handleGitHubAuth}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 
                border border-gray-300 rounded-lg shadow-sm bg-white 
                hover:bg-gray-50 transition duration-300"
              >
                <FaGithub className="text-gray-800" />
                <span>Continue with GitHub</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-500 text-sm">Or with email</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {activeTab === 'register' && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required={activeTab === 'register'}
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  {activeTab === 'login' && (
                    <a href="#" className="text-sm text-blue-600 hover:underline">
                      Forgot password?
                    </a>
                  )}
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {activeTab === 'register' && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required={activeTab === 'register'}
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg
              hover:bg-blue-700 transition duration-300 flex items-center justify-center"
            >
              <span className="mr-2">{activeTab === 'login' ? 'Log In' : 'Create Account'}</span>
              <FaArrowRight size={12} />
            </button>

            {/* Switch between login/register */}
            <p className="text-center text-sm text-gray-600 mt-6">
              {activeTab === 'login' ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
                className="text-blue-600 ml-1 hover:underline font-medium"
              >
                {activeTab === 'login' ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Feature Showcase */}
      <div className="hidden md:flex md:w-3/5 bg-gradient-to-br from-blue-600 to-indigo-900
      text-white flex-col justify-center p-12">
        <div className="max-w-xl">
          <h2 className="text-4xl font-bold mb-6">{APPNAME} 1.0</h2>
          <p className="text-xl mb-2 text-blue-100">
            Boost your productivity by up to 32%
          </p>
          <p className="text-lg text-blue-200 mb-8">
            Enhanced task management, expanded note-taking capabilities, and seamless integrations
            to streamline your workflow.
          </p>

          {/* Features List */}
          <div className="space-y-4 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-400 flex items-center justify-center">
                <span className="text-xs">✓</span>
              </div>
              <p className="ml-3 text-blue-100">Smart task prioritization</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-400 flex items-center justify-center">
                <span className="text-xs">✓</span>
              </div>
              <p className="ml-3 text-blue-100">Advanced collaboration tools</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-400 flex items-center justify-center">
                <span className="text-xs">✓</span>
              </div>
              <p className="ml-3 text-blue-100">Cross-platform synchronization</p>
            </div>
          </div>

          <a
            href="/features"
            className="inline-flex items-center text-blue-300 hover:text-white transition-colors"
          >
            <span>See everything that's new</span>
            <FaArrowRight className="ml-2" size={12} />
          </a>

          {/* Testimonial */}
          <div className="mt-12 p-6 bg-white/10 rounded-lg backdrop-blur-sm">
            <p className="italic text-blue-100 mb-4">
              "{APPNAME} has completely transformed how our team collaborates and manages projects.
              We've seen significant improvements in productivity and team satisfaction."
            </p>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-400"></div>
              <div className="ml-3">
                <p className="font-medium">Sarah Johnson</p>
                <p className="text-sm text-blue-200">Product Manager, TechCorp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;