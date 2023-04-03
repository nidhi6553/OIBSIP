let todo =[]
const todoin = document.querySelector('.todo')
const completedtask = document.querySelector('.completed')
const uncompletedtask = document.querySelector('.uncompleted')
 
window.onload = () => {

let storage = localStorage.getItem('todo')
if(storage !== null){
    todo = JSON.parse(storage)
}

render()

     
}

todoin.onkeyup =  ((e) => {

    let value =e.target.value.replace(/^\s+/,"")
    if(value && e.keyCode === 13){
        addTodo(value)

        todoin.value=''
        todoin.focus()
    }
savenrender()
})
 function addTodo(text){
    todo.push({
        id:Date.now(),
        text,
        completed:false
    })
    
 }

 //remove

 function removeTodo(id){
    todo = todo.filter(todos => todos.id !== Number(id))
    savenrender()
 }


 //marks as completed

 function markc(id){
    todo=todo .filter(todos =>{
        if(todos.id === Number(id)){
            todos.completed = true
        }
        return todos
    })
    savenrender()
 }

 //mark as uncompleted
 function marku(id) {
    todo=todo.filter(todos =>{
        if(todos.id === Number(id)){
            todos.completed = false
        }
        return todos
    })
    savenrender()
 }

 //save

 function save(){ 
localStorage.setItem('todo', JSON.stringify(todo))
 }
 //render 
 function render() {
    let uncompletedtodo = todo.filter(item => !item.completed)
    let completedtodo = todo.filter(item => item.completed)

    completedtask.innerHTML = ''
    uncompletedtask.innerHTML=''
    if(uncompletedtodo.length > 0){
        
         
        uncompletedtodo.forEach(todos => {
            uncompletedtask.append(create(todos))
        })
    }else{
        uncompletedtask.innerHTML= `<div class='empty'>No uncomplete task</div>`

    }
    if(completedtodo.length > 0){
        completedtask.innerHTML=`<div class='completed-title'>Completed (${completedtodo.length} / ${todo.length})</div>`
         
        completedtodo.forEach(todos => {
            completedtask.append(create(todos))
        })
 }
}

 //save  and render
 function savenrender(){
    save()
    render()
 }

 // create todo list
 function create(todos){
    const todoDiv = document.createElement('div')
    todoDiv.setAttribute('data-id',todos.id)
    todoDiv.className='todo-element'

    const todoTextSpan = document.createElement('span')
    todoTextSpan.innerHTML=todos.text

    const todoInputCheckbox =  document.createElement('input')
    todoInputCheckbox.type ='checkbox'
    todoInputCheckbox.checked=todos.completed
    todoInputCheckbox.onclick=(e) =>{
        let id =e.target.closest('.todo-element').dataset.id
        e.target.checked ? markc(id) : marku(id)
    }


const todoRemove =  document.createElement('a')
todoRemove.href='#'
todoRemove.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
<path d="M18 6l-12 12"></path>
<path d="M6 6l12 12"></path>
</svg>`
todoRemove.onclick = (e) => {
    let id = e.target.closest('.todo-element').dataset.id 
    removeTodo(id)
}
todoTextSpan.prepend(todoInputCheckbox)
todoDiv.appendChild(todoTextSpan)
todoDiv.appendChild(todoRemove)
 return todoDiv
 }
