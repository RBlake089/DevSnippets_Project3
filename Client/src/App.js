import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client'; // Import ApolloProvider
import { ThemeProvider } from 'react-bootstrap'; // Import ThemeProvider
import client from './index'; // Import your Apollo Client instance
import Home from './components/Home';
import SnippetList from './components/SnippetList';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import './styles.css';



function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider prefixes={{ btn: 'custom-btn' }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/snippets" element={<SnippetList />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;