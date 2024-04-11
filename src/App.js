import Layout from './Components/Layout'
import ListHome from './Features/lists/ListHome'
import ListPage from './Features/lists/ListPage'
import { Route, Routes } from 'react-router-dom'

function App() {
  

  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ListHome />} />
          <Route path="lists/:id" element={<ListPage />} />
        </Route>
      </Routes>
  );
}

export default App;
