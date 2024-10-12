import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import ResultsPage from './components/resultsPage.jsx'
import SearchPage from './components/searchPage.jsx'

const App = () => {

  return (
    <Routes>
        <Route exact path="/" element={<SearchPage />} />
        <Route exact path="/search/:id" element={<ResultsPage />} />
    </Routes>
  )
}

export default App
