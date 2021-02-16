import Menu from './components/Menu'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './components/Main';
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/app.scss';

function App() {
  return (
    <Container fluid={true}>
            
      <Router>
        <Route render={componentProps => <Menu />} />
        <Main />
      </Router>
       
    </Container>
  );
}

export default App;
