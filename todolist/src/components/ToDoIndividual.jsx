import { useState } from "react"

export default function ToDoIndividual({item, onUpdate, onDelete}){

    const[isEdit, setIsEdit]= useState(false)
    function FormEdit() {
        const [newValue, setNewValue] = useState(item.title)
        function handleSubmit(e){
            e.preventDefault()


        }
        function handleChange(e){
            const value = e.target.value
            setNewValue(value)
        }
        function handleClick(e) {
            e.preventDefault()
            onUpdate(item.id, newValue)
            setIsEdit(false)
        }
        return <form className="todoUpdateForm" onSubmit={handleSubmit}>
         <input type='text' className="todoInput" onChange={handleChange} value={newValue}/>
         <button className="btn" onClick={handleClick}>Update</button>
        </form>
    }
    function TodoElement() {
        return <div className="todoInfo">
        <span className="todoTitle">  {item.title}</span>
          <button className="btn" onClick={()=>setIsEdit(true)}>Edit</button>
        <button className="btn btnDelete" onClick={(e)=>onDelete(item.id)}>Delete</button>
        </div>
    }
    return(
    <div className="todo">

    { isEdit ? <FormEdit/> : <TodoElement/>}
    </div>)
    
   
}