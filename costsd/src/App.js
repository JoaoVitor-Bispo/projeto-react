import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
//Pages
import Contato from './components/pages/Contato'
import Empresa from './components/pages/Empresa';
import Home from './components/pages/Home'
import NewProject from './components/pages/NewProject';
import Project from './components/pages/Projects';
//Layout
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Container from './components/layout/Container';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Container customClass='min-height'>
          <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route path='/projetos' element={<Project/>}/>
            <Route path='/empresa' element={<Empresa/>}/>
            <Route path='/contato' element={<Contato/>}/>
            <Route path='/newproject' element={<NewProject/>}/>
          </Routes>
        </Container>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
