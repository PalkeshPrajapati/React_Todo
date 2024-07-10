import { useEffect, useState, useRef } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)
  const isFirstRender = useRef(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(todoString)
      setTodos(todos)
    }
  }, [])
  
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // 👈️ return early if initial render
    }
    console.log(todos)
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  

  const handleAdd = () => {
    setTodos([...todos, {id: uuidv4(), todo, isCompelete: false}])
    setTodo("")
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id
    });
    setTodos(newTodos)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter((item) => {
      return item.id === id;
    })
    setTodo(t[0].todo)
    let newTodos = todos.filter((item) => {
      return item.id !== id
    });
    setTodos(newTodos)
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e, id) => {
    let index = todos.findIndex((item) => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompelete = !newTodos[index].isCompelete;
    setTodos(newTodos)
  }

  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-rose-200 my-5 rounded-xl p-5 min-h-[80vh]">

        <div className="addTodo mb-4">
          <h2 className="font-bold text-xl mb-3">Add Todo</h2>
          <input type="text" onChange={handleChange} value={todo} className="w-2/3 p-1 ml-3 font-mono font-semibold rounded-sm"/>
          <button className="btn" disabled={todo.length <= 3} onClick={handleAdd}>Save</button>
        </div>
        
        <input type="checkbox" onChange={toggleFinished} checked={showFinished}/> <span>Show Finished</span> 

        <h2 className="font-bold text-xl my-3">Your Todo</h2>

        <div className="todos mt-4">

          {todos.length === 0 && <div>No todo to display</div>}
          {todos.map((item) => {
            return (showFinished || !item.isCompelete) && <>
              <div key={item.id} className="todo flex items-center m-4 w-2/3 justify-between">
                <div className='flex gap-2'>
                  <input type="checkbox" onChange={e => handleCheckbox(e, item.id)} checked={item.isCompelete}/>
                  <div className={item.isCompelete ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex">
                  <button className='btn' onClick={e => handleEdit(e, item.id)}>Edit</button>
                  <button className='btn' onClick={e => handleDelete(e, item.id)}>Delete</button>
                </div>
              </div>
              <div className='border-y border-collapse border-slate-800'></div>
            </>
          })}

        </div>

      </div>
    </>
  )
}

export default App
