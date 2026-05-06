import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/header'
import HeaderSlideshow from './components/HeaderSlideshow'
import Features from './components/Features'
import Vehicles from './components/Vehicles'
import Tours from './components/Tours'
import Blog from './components/Blog'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ArticlePage from './pages/ArticlePage'
import HomePage from './pages/HomePage'
import BlogPage from './pages/BlogPage'
import { PageProvider } from './context/PageContext'
import './App.css'

function AppLayout() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<ArticlePage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <Router>
      <PageProvider>
        <AppLayout />
      </PageProvider>
    </Router>
  )
}

export default App
