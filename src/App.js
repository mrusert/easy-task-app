import Layout from './Layout/Layout'
import Home from './Components/Home'
import ListPage from './Components/ListPage'
import { Route, Routes } from 'react-router-dom'
import { DataProvider } from './Context/DataContext'

function App() {
  

  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="lists" element={<Home />} />
          <Route path="lists/:id" element={<ListPage />} />
        </Route>
      </Routes>
    </DataProvider>
  );
}

export default App;
