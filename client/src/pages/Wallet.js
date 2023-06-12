import { useState, useEffect } from "react"
import Card from "../components/Card"
import AddWalletcryptoForm from "../components/AddWalletcryptoForm"

function Wallet({walletKey, wallet}) {
  const [walletcryptos, setWalletcryptos] = useState([])

  useEffect(() => {
    fetch('/wallet')
      .then(r => r.json())
      .then(wallet => setWalletcryptos(wallet.walletcryptos))
  }, [])

  // why can't i get walletcryptos collection from wallet? // OR AM I?
  // const navigate = useNavigate()
  
  const renderCards = walletcryptos.map(walletcrypto => <Card walletcrypto={walletcrypto} onDeleteWalletcrypto={handleDeleteWalletcrypto} key={walletcrypto.id} />)

  function handleAddWalletcrypto(walletcrypto) {
    setWalletcryptos([...walletcryptos, walletcrypto]) // .sort() alphabetically by name
  }

  function handleDeleteWalletcrypto(deleted) {
    const filtered = walletcryptos.filter(walletcrypto => {
      return walletcrypto.id !== deleted.id   
    })
    setWalletcryptos(filtered)
  }

  return (
    <>
      <h2>My Cryptos</h2>
      <h3>Wallet Key {walletKey}</h3>        
      {
        walletcryptos.length === 0
        ? <p>There are no cryptos in your wallet 🥺<br />
        </p>
        : <ul className="list">{renderCards}</ul>
      }
      <AddWalletcryptoForm wallet={wallet} onAddWalletcrypto={handleAddWalletcrypto} />
      {/* cryptos={cryptos} */}
    </>
  )
}

export default Wallet