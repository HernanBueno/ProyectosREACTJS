import { useState } from "react"
import ToDoIndividual from "./ToDoIndividual";
import  "./ToDo.css";
export default function ToDo() {

    const [title, setTitle]=useState('');
    const [todos, setTodos]=useState([])
    
    function handleChange(e) {
        e.preventDefault()
        const value = e.target.value
        setTitle(value)
    }
    function handleSubmit(e) {
        e.preventDefault()
        const newTodo = {
            id: crypto.randomUUID(),
            title:title,
            completed:false
        }

        setTodos([...todos, newTodo])
        setTitle('')
    }
    function handleUpdate(id, value){
        const temp = [...todos];
        const item = temp.find(i => i.id === id)
        item.title = value
        setTodos(temp)
    }
    function handleDelete(id) {
        const temp = todos.filter(i => i.id !== id)
        setTodos(temp)
    }

    return <div className="todoContainer">
        <form className="todoCreateForm" onSubmit={handleSubmit}>
            <input onChange={handleChange} className="todoInput" value={title}/>
            <input onClick={handleSubmit} className='btn btnCreate'type='submit' value='Create To Do'/>
        </form>


        <div className="todosContainer">
            {
                todos.map(item => (
                 <ToDoIndividual
                 className='todo'
                 key={item.id}
                    item={item}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                 />
                ))
            }
        </div>
    </div>
}