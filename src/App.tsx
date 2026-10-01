import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { JsonFormatter, JsonMinifier, JsonToTypescript, JsonToJava } from './pages/json'
import { Base64 } from './pages/Base64'
import { JwtDecoder } from './pages/JwtDecoder'
import { UuidGenerator } from './pages/UuidGenerator'
import { RegexTester } from './pages/RegexTester'
import { UrlEncoder } from './pages/UrlEncoder'
import { ImageResizer } from './pages/ImageResizer'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/json-formatter" element={<JsonFormatter />} />
          <Route path="/json-minifier" element={<JsonMinifier />} />
          <Route path="/json-to-typescript" element={<JsonToTypescript />} />
          <Route path="/json-to-java" element={<JsonToJava />} />
          <Route path="/base64" element={<Base64 />} />
          <Route path="/jwt-decoder" element={<JwtDecoder />} />
          <Route path="/uuid-generator" element={<UuidGenerator />} />
          <Route path="/regex-tester" element={<RegexTester />} />
          <Route path="/url-encoder" element={<UrlEncoder />} />
          <Route path="/image-resizer" element={<ImageResizer />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
