import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validasi sederhana: Username dan Password harus sama
    if (nim !== password) {
      alert("Username dan Password harus sama (NIM).");
      return;
    }

    try {
      const response = await fetch('/users.json');
      const users = await response.json();
      
      // Validasi NIM ada di list
      if (users.includes(nim)) {
        sessionStorage.setItem('isLoggedIn', 'true');
        navigate('/admin');
      } else {
        alert("NIM tidak terdaftar!");
      }
    } catch (error) {
      alert("Sistem sedang gangguan.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center font-sans px-4">
      <div className="w-full max-w-sm">
        {/* Logo/Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">Sign In</h1>
          <p className="text-sm text-gray-500">Masukkan NIM untuk Login</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Input Username */}
          <div>
            <input 
              type="text" 
              placeholder="Username (NIM)" 
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              className="w-full border-b-2 border-black py-3 px-1 outline-none focus:border-red-600 transition-colors"
              required
            />
          </div>

          {/* Input Password */}
          <div>
            <input 
              type="password" 
              placeholder="Password (NIM)" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b-2 border-black py-3 px-1 outline-none focus:border-red-600 transition-colors"
              required
            />
          </div>

          {/* Tombol Submit */}
          <button 
            type="submit" 
            className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-red-700 transition-colors"
          >
            Masuk
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">
            © 23 TI C Project
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;