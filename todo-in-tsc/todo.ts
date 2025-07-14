// define interface
interface TodoItem {
    id: number;
    task: String;
    completed: false;
}

let todos: TodoItem[] = []
let currentId = 1


// add new task
function addTask(task: string): void {
    const newTask: TodoItem = {
        id: currentId++,
        task: task,
        completed: false
    }

    todos.push(newTask)
    console.log(` new task added ${newTask}`)
}

// remove tasks
function removeTask(id: number): void {
    todos = todos.filter(item => item.id !== id)
    console.log(`remove tasks with id num ${id}`)
}

// display all tasks
function displayAllTasks(): void {
    console.log('\n To-Do Lists')
    if (todos.length == 0){ console.log("no tasks available")}

    todos.forEach(item => {
        console.log(`ID: ${item.id}, Task: ${item.task}, Completed: ${item.completed}`)
    })
}

// Example 
addTask("doing task 2");
addTask("doing task 3");
displayAllTasks();
removeTask(1);
displayAllTasks();