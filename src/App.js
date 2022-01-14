import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Todolist from './components/Todolist';
import TodoForm from './components/TodoForm';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <TodoForm></TodoForm>
      <Todolist></Todolist>
    </div>
  );
}

export default App;
