import Layout from './Layout/Layout'
import Home from './Components/Home'
import { Route, Routes } from 'react-router-dom'
import { DataProvider } from './Context/DataContext'

function App() {
  

  return (
    <DataProvider>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>} />
      </Route>
    </Routes>
    </DataProvider>
  );
}

export default App;
