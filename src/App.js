import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Todolist from './components/Todolist';
import TodoForm from './components/TodoForm';
import ContextProvider from './context/ContextProvider';

function App() {
  return (
    <ContextProvider>
    <div className="App">
     
      <Header></Header>
      <TodoForm></TodoForm>
      <Todolist></Todolist>
    </div>
    </ContextProvider>
  );
}

export default App;
