import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavBar from "./NavBar"
import Login from "../pages/Login"
import Wallet from "../pages/Wallet"
import Cryptos from "../pages/Cryptos"

function App() {
  const [walletKey, setWalletKey] = useState(null)
  const [wallet, setWallet] = useState(null)
  const [cryptos, setCryptos] = useState(null)
  const [walletcryptos, setWalletcryptos] = useState(null)

  useEffect(() => {
    // auto-login
    fetch('/wallet').then(r => {
      if (r.ok) {
        r.json().then(wallet => setWalletKey(wallet.wallet_key))
      }
    })
  }, [])

  useEffect(() => {
    fetch('/wallet')
      .then(r => r.json())
      .then(wallet => setWallet(wallet))
  }, [])

    useEffect(() =>{
      fetch('/cryptos')
      .then(r => r.json())
      .then(cryptos => setCryptos(cryptos))
    }, [wallet, walletcryptos])

    useEffect(() => {
      fetch('/wallet')
        .then(r => r.json())
        .then(wallet => setWalletcryptos(wallet.walletcryptos))
    }, [])

  function handleLogin(wallet) {
    setWalletKey(wallet.wallet_key)
    setWallet(wallet)
  }

  function handleAddCrypto(crypto) {
    setCryptos([...cryptos, crypto])
  }

  function handleAddWalletcrypto(walletcrypto) {
    setWalletcryptos([...walletcryptos, walletcrypto])
  }

  function handleDeleteWalletcrypto(deleted) {
    const filtered = walletcryptos.filter(walletcrypto => {
      return walletcrypto.id !== deleted.id   
    })
    setWalletcryptos(filtered)
  }

  if (!walletKey) return <Login onLogin={handleLogin} />

  return (
    <main className='wrapper'>
      <Router>
        <NavBar walletKey={walletKey} setWalletKey={setWalletKey} />
        <Routes>
          <Route
            path='/'
            element={<Wallet
              walletKey={walletKey}
              wallet={wallet}
              cryptos={cryptos}
              walletcryptos={walletcryptos}
              onAddWalletcrypto={handleAddWalletcrypto}
              onDeleteWalletcrypto={handleDeleteWalletcrypto}
            />}
          />
          <Route 
            path='/cryptos' 
            element={<Cryptos
              walletKey={walletKey}
              wallet={wallet}
              cryptos={cryptos}
              onAddCrypto={handleAddCrypto}
            />} 
          />
        </Routes>
      </Router>
    </main>
  );
}

export default App