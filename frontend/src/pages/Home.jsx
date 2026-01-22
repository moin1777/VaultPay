import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-300">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-gray-800">
                  VaultPay
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate("/signin")}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
              >
                Sign In
              </button>
              <button 
                onClick={() => navigate("/signup")}
                className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-bold text-gray-800 mb-8 leading-tight">
              Secure Digital
              <br />
              <span className="text-5xl md:text-6xl">Payments</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience the future of money transfers with VaultPay. Send, receive, and manage your finances with military-grade security and lightning-fast speed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-lg mx-auto">
              <div className="w-full sm:w-auto">
                <button
                  onClick={() => navigate("/signup")}
                  className="w-full sm:w-auto px-8 py-4 bg-gray-800 text-white rounded-xl font-semibold text-lg hover:bg-gray-900 transition-all duration-300 shadow-2xl transform hover:-translate-y-1"
                >
                  Start Sending Money
                </button>
              </div>
              <button 
                onClick={() => navigate("/signin")}
                className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold text-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Sign In
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">256-bit SSL Encryption</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">PCI DSS Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">24/7 Fraud Monitoring</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose VaultPay?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with cutting-edge technology to provide you with the most secure, fast, and user-friendly payment experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="group text-center hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="relative">
                <div className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:shadow-gray-500/25 transition-all duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Bank-Grade Security</h3>
              <p className="text-gray-600 leading-relaxed">
                Military-grade encryption, biometric authentication, and real-time fraud detection keep your money safe.
              </p>
            </div>
            
            <div className="group text-center hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="relative">
                <div className="w-20 h-20 bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:shadow-gray-500/25 transition-all duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">⚡</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                Instant transfers powered by advanced blockchain technology. Money moves at the speed of thought.
              </p>
            </div>
            
            <div className="group text-center hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="relative">
                <div className="w-20 h-20 bg-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:shadow-gray-500/25 transition-all duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">★</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">User-Friendly</h3>
              <p className="text-gray-600 leading-relaxed">
                Intuitive design that makes complex financial operations simple. No technical knowledge required.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">$2.5B+</div>
              <div className="text-gray-300">Total Transferred</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">1M+</div>
              <div className="text-gray-300">Active Users</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">99.9%</div>
              <div className="text-gray-300">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <span className="text-2xl font-bold">VaultPay</span>
          </div>
          <p className="text-gray-400 mb-6">Secure. Fast. Reliable.</p>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-500">© 2025 VaultPay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}