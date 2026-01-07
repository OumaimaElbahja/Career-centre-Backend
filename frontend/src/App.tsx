import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import JobOffers from './pages/JobOffers';
import ExternalJobs from './pages/ExternalJobs';
import JobForm from './pages/JobForm';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="jobs" element={
            <ProtectedRoute>
              <JobOffers />
            </ProtectedRoute>
          } />
          <Route path="external-jobs" element={
            <ProtectedRoute>
              <ExternalJobs />
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="admin/post-job" element={
            <ProtectedRoute>
              <JobForm />
            </ProtectedRoute>
          } />
          <Route path="admin/edit-job/:id" element={
            <ProtectedRoute>
              <JobForm />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
