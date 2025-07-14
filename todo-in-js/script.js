function addTask() {
  const taskInput = document.getElementById('taskInput')
  const taskList = document.getElementById('taskList');
  const taskText = taskInput.value.trim();
  
  if (taskText === '') {
    alert('please enter a task');
    return;
  }

  const li = document.createElement('li')
  li.textContent = taskText;

  li.addEventListener("click",  () => {
    taskList.removeChild(li);
  })

  taskList.appendChild(li)
  taskInput.value = ''

}