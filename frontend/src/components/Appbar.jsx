
export function Appbar ({firstName}) {
  return (
    <div className="shadow h-14 flex justify-between mb-2">
      <div className="flex flex-col justify-center h-full ml-4 text-xl font-semibold">
        VaultPay 
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4 text-lg">
          Hello, {firstName}
        </div>
        <div className="flex justify-center rounded-full h-12 w-12 bg-slate-200 mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {firstName[0].toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  )
}