import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function SendMoney () {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState(null); // 'success', 'failed', or null
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleTransfer = async () => {
    if (!amount || amount <= 0) {
      setErrorMessage("Please enter a valid amount");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    
    try {
      const response = await axios.post("http://localhost:3000/api/v1/account/transfer", {
        to: id,
        amount: parseFloat(amount)
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      
      setTransactionStatus('success');
      
      // Navigate to dashboard after 2 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
      
    } catch (err) {
      console.log("transfer not successful", err);
      setTransactionStatus('failed');
      setErrorMessage(err.response?.data?.message || "Transfer failed. Please try again.");
      
      // Navigate to dashboard after 3 seconds even on failure
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  // Success Modal
  if (transactionStatus === 'success') {
    return (
      <div className="min-h-screen bg-slate-300 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Transfer Successful!</h2>
          <p className="text-gray-600 mb-4">
            ₹{amount} has been successfully sent to {name}
          </p>
          <div className="animate-pulse text-sm text-gray-500">
            Redirecting to dashboard...
          </div>
        </div>
      </div>
    );
  }

  // Failed Modal
  if (transactionStatus === 'failed') {
    return (
      <div className="min-h-screen bg-slate-300 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Transfer Failed</h2>
          <p className="text-gray-600 mb-4">{errorMessage}</p>
          <div className="animate-pulse text-sm text-gray-500">
            Redirecting to dashboard...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-300 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate("/dashboard")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold text-gray-800">Send Money</h2>
            <div className="w-9"></div> {/* Spacer for center alignment */}
          </div>
        </div>

        {/* Recipient Info */}
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full flex items-center justify-center">
              <span className="text-2xl text-white font-semibold">
                {name ? name[0].toUpperCase() : 'U'}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
              <p className="text-gray-500">VaultPay User</p>
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Amount (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                  ₹
                </span>
                <input
                  className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-lg text-lg font-medium focus:border-gray-500 focus:outline-none transition-colors"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium">{errorMessage}</span>
              </div>
            )}

            {/* Transfer Button */}
            <button 
              onClick={handleTransfer}
              disabled={isLoading || !amount}
              className="w-full py-3 bg-gray-800 text-white rounded-lg font-semibold text-lg hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>Send ₹{amount || '0'}</span>
                </>
              )}
            </button>

            {/* Security Note */}
            <div className="flex items-center space-x-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Your transaction is secured with bank-grade encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}