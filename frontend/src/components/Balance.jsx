
export function Balance ({value}) {
  const formatBalance = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount / 100);
  };

  return (
    <div className="mb-4">
      <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
        {formatBalance(value)}
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
        <span>Available Balance</span>
      </div>
    </div>
  )
}