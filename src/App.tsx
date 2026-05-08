import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/header'
import Footer from './components/Footer'
import ArticlePage from './pages/ArticlePage'
import HomePage from './pages/HomePage'
import BlogPage from './pages/BlogPage'
import FAQPage from './pages/FAQPage'
import BookingGuidePage from './pages/BookingGuidePage'
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
          <Route path="/faqs" element={<FAQPage />} />
          <Route path="/booking-guide" element={<BookingGuidePage />} />
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
