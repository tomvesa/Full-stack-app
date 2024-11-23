
import Header from "./components/Header"
import Footer from "./components/Footer"
import AppRoutes from "./Routes"




const App = () => {

  return (
    <div className="page-container">
    <Header /> 
      <AppRoutes />
    <Footer />
    </div>
  )
}

export default App
