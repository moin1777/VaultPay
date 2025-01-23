
export function Balance ({value}) {
  return (
    <div className="flex ml-2">
      <div className="font-bold text-lg">
        Your balance
      </div>
      <div className="font-semibold text-lg ml-4">
        Rs {value/100}
      </div>
    </div>
  )
}