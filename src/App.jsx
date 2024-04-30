import { useEffect, useState } from 'react'
import useCurrencyInfo from './hooks/useCurrencyInfo';
import {Input} from './components';

function App() {

  const [amount, setAmount] = useState()
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState()

  const currencyInfo = useCurrencyInfo(from)

// I write below code to solve the select issue but it didn't work
//   const [currencyInfo, setCurrencyInfo] = useState({})
//   useEffect(()=>{
//     let data = currencyInfo(from)
//     setCurrencyInfo(data);
//   }, [from])

  const options = Object.keys(currencyInfo)
  // this is the array currencyOptions in input.jsx

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }


  return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url('https://images.pexels.com/photos/15830348/pexels-photo-15830348/free-photo-of-lights-stripes-over-water-at-night.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load')`,
        }}
    >
        <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      convert()
                    }}
                >
                    <div className="w-full mb-1">
                        <Input
                          label="From"
                          amount={amount}
                          currencyOptions={options}
                          onCurrencyChange={(currency) => setFrom(currency)}
                          selectCurrency={from}
                          onAmountChange={(amount) => setAmount(amount)}
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                            onClick={swap}
                        >
                            swap
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                        <Input
                          label="To"
                          amount={convertedAmount}
                          currencyOptions={options}
                          onCurrencyChange={(currency) => setTo(currency)}
                          selectCurrency={to}
                          amountDisable
                          // if we just pass amountDisable it is set as true, you can even pass as amountDisable=true
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    </div>
);
}

export default App
