import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


export default function LoginPage() {
 
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDark, setIsDark] = useState(false);

  const navigate = useNavigate();

  async function login(){

    try{

      const response = await axios.post(import.meta.env.VITE_API_URL + "/api/users/login", { 
        email: email, 
        password: password 
      })

      // Save token to localStorage wehich store data at format of key-value pair and it will persist even after the browser is closed
      localStorage.setItem("token", response.data.token);

      const user = response.data.user;

      //toast success message
      toast.success("Login successful! Welcome back, " + user.firstName + "!");

      if(user.role == "admin"){
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch(error){

      toast.error("Login failed. Please check your credentials and try again.");
      console.error("Login error:", error);
    }
  }

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-4 md:p-8 transition-colors duration-300 ${
      isDark ? 'bg-slate-950' : 'bg-primary'
    }`}>
      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsDark(!isDark)}
        className={`absolute top-6 right-6 p-3 rounded-full transition-all duration-300 ${
          isDark 
            ? 'bg-slate-800 text-yellow-300 hover:bg-slate-700' 
            : 'bg-white/80 text-slate-700 hover:bg-white'
        } shadow-lg z-50`}
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {isDark ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 1.78a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zm2.828 2.828a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zm2.828 2.829a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM10 7a3 3 0 100 6 3 3 0 000-6zm.22-8.022a1 1 0 00-1.414 0l-.707.707a1 1 0 001.414 1.414l.707-.707a1 1 0 000-1.414zM4.22 4.22a1 1 0 00-1.414 0L2.1 4.927a1 1 0 001.414 1.414l.707-.707a1 1 0 000-1.414zm1.414 12.728a1 1 0 10-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM4.22 15.78a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zM10 18a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zm3.78-.22a1 1 0 00.707-1.707l-.707-.707a1 1 0 10-1.414 1.414l.707.707a1 1 0 001.414 0z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>

      <div className={`w-full max-w-6xl min-h-160 grid grid-cols-1 md:grid-cols-2 rounded-4xl overflow-hidden transition-all duration-300 ${
        isDark 
          ? 'shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] bg-slate-900' 
          : 'shadow-[0_30px_80px_-20px_rgba(123,47,190,0.4)] bg-accent'
      }`}>
        {/* LEFT — Purple side with Bobo & melting ice cream */}
        <div className={`relative overflow-hidden min-h-70 md:min-h-full flex flex-col items-center justify-center p-8 transition-all duration-300 ${
          isDark 
            ? 'bg-linear-to-br from-slate-900 via-purple-900 to-slate-800' 
            : 'bg-gradient-bobo'
        }`}>
          {/* floating boba pearls */}
          <div className="pointer-events-none absolute inset-0">
            {/* Top section */}
            <span className="absolute top-10 left-12 h-5 w-5 rounded-full bg-white/30" />
            <span className="absolute top-24 right-16 h-2 w-2 rounded-full bg-white/40" />
            <span className="absolute top-40 left-24 h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="absolute top-16 right-32 h-1.5 w-1.5 rounded-full bg-white/40" />
            <span className="absolute top-20 left-1/3 h-3 w-3 rounded-full bg-white/25" />
            <span className="absolute top-14 right-1/4 h-1.5 w-1.5 rounded-full bg-white/40" />
            {/* Middle section */}
            <span className="absolute top-32 left-1/2 h-1.5 w-1.5 rounded-full bg-white/30" />
            <span className="absolute top-36 right-20 h-2.5 w-2.5 rounded-full bg-white/35" />
            <span className="absolute top-44 right-1/3 h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="absolute top-28 left-3/4 h-2 w-2 rounded-full bg-white/35" />
            <span className="absolute top-52 right-10 h-2 w-2 rounded-full bg-white/30" />
            <span className="absolute top-48 left-1/4 h-2 w-2 rounded-full bg-white/30" />
            {/* Lower middle section */}
            <span className="absolute top-56 left-1/3 h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="absolute top-60 right-1/4 h-2 w-2 rounded-full bg-white/35" />
            <span className="absolute top-64 left-20 h-1.5 w-1.5 rounded-full bg-white/40" />
            <span className="absolute top-68 right-1/3 h-2 w-2 rounded-full bg-white/30" />
            {/* Bottom section */}
            <span className="absolute bottom-48 left-1/4 h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="absolute bottom-44 right-1/3 h-2 w-2 rounded-full bg-white/35" />
            <span className="absolute bottom-52 left-1/2 h-1.5 w-1.5 rounded-full bg-white/40" />
            <span className="absolute bottom-40 right-20 h-2 w-2 rounded-full bg-white/30" />
            <span className="absolute bottom-56 left-3/4 h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="absolute bottom-36 left-1/3 h-2 w-2 rounded-full bg-white/35" />
          </div>

          {/* Bobo mascot */}
          <div className="relative z-10 flex items-center justify-center">
            <img
              src="BOBOimg.png"
              alt="Bobo mascot waving"
              className="w-60 md:w-90 drop-shadow-[0_20px_30px_rgba(46,26,71,0.35)] animate-bobo-wave origin-bottom"
            />
          </div>

          <div className="relative z-10 text-center text-primary mb-6">
            <h2 className="text-2xl font-bold tracking-wide">Hi, I'm BOBO!</h2>
            <p className="text-sm opacity-90 mt-1">Sweet sips & scoops await you</p>
          </div>

          {/* Melting ice cream drips at bottom */}
          <svg
            className={`absolute bottom-0 left-0 w-full h-32 md:h-40 z-0 transition-all duration-300`}
            viewBox="0 0 600 160"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,80 C40,40 80,90 120,70 C160,50 180,110 220,95 C260,80 300,30 340,60 C380,90 420,50 470,75 C510,95 550,55 600,80 L600,160 L0,160 Z"
              fill={isDark ? '#1e293b' : '#FAF7FF'}
            />
            <circle cx="90" cy="135" r="28" fill={isDark ? '#c084fc' : '#9D4EDD'} />
            <circle cx="260" cy="140" r="22" fill={isDark ? '#c084fc' : '#9D4EDD'} />
            <circle cx="430" cy="138" r="26" fill={isDark ? '#c084fc' : '#9D4EDD'} />
            <circle cx="540" cy="142" r="20" fill={isDark ? '#c084fc' : '#9D4EDD'} />
            {/* drip droplets */}
            <ellipse cx="170" cy="125" rx="6" ry="10" fill={isDark ? '#c084fc' : '#9D4EDD'} />
            <ellipse cx="360" cy="118" rx="5" ry="9" fill={isDark ? '#c084fc' : '#9D4EDD'} opacity="0.85" />
          </svg>
        </div>

        {/* RIGHT — Login form */}
        <div className={`flex items-center justify-center p-8 md:p-12 transition-all duration-300 ${
          isDark ? 'bg-slate-900' : 'bg-white'
        }`}>
          <div className="w-full max-w-sm">
           

            <h1 className={`text-3xl font-bold transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-secondary'
            }`}>Welcome Back</h1>
            <p className={`text-sm mt-2 mb-8 transition-colors duration-300 ${
              isDark ? 'text-slate-400' : 'text-secondary/70'
            }`}>
              Log in to your BOBO account
            </p>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className={`block text-xs font-semibold mb-2 uppercase tracking-wide transition-colors duration-300 ${
                  isDark ? 'text-slate-300' : 'text-secondary'
                }`}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={
                    (e) => setEmail(e.target.value)
                  }
                  placeholder="you@example.com"
                  className={`w-full bg-transparent border-b-2 outline-none py-2 transition-colors duration-300 ${
                    isDark 
                      ? 'border-purple-500/40 focus:border-purple-400 text-white placeholder:text-slate-500' 
                      : 'border-accent/60 focus:border-accent text-secondary placeholder:text-secondary/40'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-2 uppercase tracking-wide transition-colors duration-300 ${
                  isDark ? 'text-slate-300' : 'text-secondary'
                }`}>
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPwd ? "text" : "password"}
                    value={password}
                    onChange={
                      (e) => setPassword(e.target.value)
                    }
                    placeholder="••••••••"
                    className={`w-full bg-transparent border-b-2 outline-none py-2 pr-16 transition-colors duration-300 ${
                      isDark 
                        ? 'border-purple-500/40 focus:border-purple-400 text-white placeholder:text-slate-500' 
                        : 'border-accent/60 focus:border-accent text-secondary placeholder:text-secondary/40'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((s) => !s)}
                    className={`absolute right-0 top-1/2 -translate-y-1/2 text-xs font-semibold transition-colors duration-300 ${
                      isDark ? 'text-purple-400 hover:text-purple-300' : 'text-accent hover:text-accent'
                    }`}
                  >
                    {showPwd ? "Hide" : "Show"}
                  </button>
                </div>
                <div className="text-right mt-2">
                  <a href="#" className={`text-xs font-medium hover:underline transition-colors duration-300 ${
                    isDark ? 'text-purple-400 hover:text-purple-300' : 'text-accent hover:text-accent'
                  }`}>
                    Forgot password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                onClick={login}
                className={`w-full rounded-full font-semibold py-3.5 transition-all duration-300 ${
                  isDark
                    ? 'bg-purple-600 text-white hover:opacity-90 shadow-[0_8px_24px_-6px_rgba(147,51,234,0.6)] hover:shadow-[0_12px_32px_-6px_rgba(147,51,234,0.8)]'
                    : 'bg-accent text-white hover:opacity-90 shadow-[0_8px_24px_-6px_rgba(157,78,221,0.6)] hover:shadow-[0_12px_32px_-6px_rgba(157,78,221,0.8)]'
                }`}
              >
                Login
              </button>

              <div className={`flex items-center gap-3 text-xs transition-colors duration-300 ${
                isDark ? 'text-slate-500' : 'text-secondary/50'
              }`}>
                <div className={`flex-1 h-px transition-colors duration-300 ${
                  isDark ? 'bg-slate-700' : 'bg-secondary/15'
                }`} />
                or
                <div className={`flex-1 h-px transition-colors duration-300 ${
                  isDark ? 'bg-slate-700' : 'bg-secondary/15'
                }`} />
              </div>

              <button
                type="button"
                className={`w-full rounded-full font-medium py-3 flex items-center justify-center gap-3 transition-all duration-300 ${
                  isDark
                    ? 'bg-slate-800 border-[1.5px] border-purple-600 text-slate-100 hover:bg-slate-700'
                    : 'bg-white border-[1.5px] border-accent text-secondary hover:bg-accent/5'
                }`}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                  <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
                  <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
                  <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
                </svg>
                Continue with Google
              </button>

              <p className={`text-center text-sm transition-colors duration-300 ${
                isDark ? 'text-slate-400' : 'text-secondary'
              }`}>
                Don't have an account?{" "}
                <a href="#" className={`font-bold hover:underline transition-colors duration-300 ${
                  isDark ? 'text-purple-400 hover:text-purple-300' : 'text-accent hover:text-accent'
                }`}>
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}