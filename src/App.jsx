import Header from "./Header"
import MainContent from "./MainContent"
import Footer from "./Footer"
import data from "./data"

export default function App() {

  const entryElements = data.map((entry) => {
    return (
      <MainContent
        img={entry.img}
        title={entry.title}
        region={entry.region}
        shopLink={entry.shopLink}
        type={entry.type}
        caffeine={entry.caffeine}
        text={entry.text}
      />
    )
  })

  return (
    <>
      <Header />
      <main className="container">
        {entryElements}
      </main>
      <Footer />
    </>
  )
}
