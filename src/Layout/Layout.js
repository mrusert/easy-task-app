import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'
import {Outlet} from 'react-router-dom'
import { useContext } from 'react'
import DataContext from '../Context/DataContext'

const Layout = () => {
  const { search, setSearch } = useContext(DataContext)
  return (
    <div className="App">
      <Header
        title="Easy Task App" 
      />
      <Nav
        search={search}
        setSearch={setSearch}
      />
      <Outlet />
      <Footer /> 
      </div>
  )
}

export default Layout