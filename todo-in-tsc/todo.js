var todos = [];
var currentId = 1;
// add new task
function addTask(task) {
    var newTask = {
        id: currentId++,
        task: task,
        completed: false
    };
    todos.push(newTask);
    console.log(" new task added ".concat(newTask));
}
// remove tasks
function removeTask(id) {
    todos = todos.filter(function (item) { return item.id !== id; });
    console.log("remove tasks with id num ".concat(id));
}
// display all tasks
function displayAllTasks() {
    console.log('\n To-Do Lists');
    if (todos.length == 0) {
        console.log("no tasks available");
    }
    todos.forEach(function (item) {
        console.log("ID: ".concat(item.id, ", Task: ").concat(item.task, ", Completed: ").concat(item.completed));
    });
}
// Example 
addTask("doing task 2");
addTask("doing task 3");
displayAllTasks();
removeTask(1);
displayAllTasks();
