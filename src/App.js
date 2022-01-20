
import './App.css';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import ContextProvider from './context/ContextProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Update from './components/Update';
import Login from './components/Login';
import AuthProvider from './context/AuthProvider';


function App() {
  return (
    <div className='App'>
    <ContextProvider>
    <AuthProvider>
     
    
    <BrowserRouter>
    <Header></Header>
      <Routes>
     
        <Route path="/" element={<Home/>}/>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='update' element={<Update/>}>
          <Route path=':id' element={<Update/>}></Route>
        </Route>
        <Route path='todoform' element={<TodoForm></TodoForm>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        
      </Routes>
    </BrowserRouter>
    
    </AuthProvider>
    </ContextProvider>

    </div>
  );
}
export default App;
