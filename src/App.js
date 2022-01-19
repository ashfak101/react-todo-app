
import './App.css';
import Header from './components/Header';
import Todolist from './components/Todolist';
import TodoForm from './components/TodoForm';
import ContextProvider from './context/ContextProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Update from './components/Update';


function App() {
  return (
    <div className='App'>
    <ContextProvider>
    
     
    
    <BrowserRouter>
    <Header></Header>
      <Routes>
     
        <Route path="/" element={<Home/>}/>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='update' element={<Update/>}>
          <Route path=':id' element={<Update/>}></Route>
        </Route>
        <Route path='todoform' element={<TodoForm></TodoForm>}></Route>
        
      </Routes>
    </BrowserRouter>
    
    
    </ContextProvider>

    </div>
  );
}
export default App;
