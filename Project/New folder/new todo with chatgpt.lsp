<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo list App</title>
</head>
<style>
    /* ... Your CSS styles ... */
</style>

<body>
    <div class="contianer">
        <h1>ToDo</h1>

        <div class="to-do-tasks2">
            <input type="text" name="" id="input-box" placeholder="Add your todo">
            <input type="date" name="" id="date">
            <button onclick="AddToList()">Add</button>
        </div>
        <div class="to-do-tasks to-do-tasks1">
            <!-- Existing tasks will be added here -->
        </div>
    </div>
</body>

<script>
    let inputVal;
    let dateValue;
    let tasks = [];

    // Retrieve tasks from localStorage
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        // Populate existing tasks
        tasks.forEach(task => {
            addToToDo(task.text, task.date, task.checked);
        });
    }

    function AddToList() {
        let input = document.getElementById('input-box');
        let date = document.getElementById('date');

        dateValue = date.value
        inputVal = input.value;

        input.value = '';

        addToToDo();

        // Save tasks to localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function addToToDo() {
        let newelmnt = document.createElement('div');
        let newelmnt2 = document.createElement('div');
        let ToDodate = document.createElement('div');
        let checkBox = document.createElement('div');
        let inputchk = document.createElement('input');
        let p = document.createElement('p');
        let datep = document.createElement('p');
        let button = document.createElement('button');

        inputchk.setAttribute('type', 'checkbox');
        checkBox.appendChild(inputchk);

        button.innerHTML = 'delete';
        p.innerHTML += inputVal;

        datep.innerHTML = dateValue;
        ToDodate.appendChild(datep);

        newelmnt.appendChild(p);
        newelmnt2.appendChild(button);

        addd = document.querySelector('.to-do-tasks');
        addd.appendChild(checkBox);
        addd.appendChild(newelmnt);
        addd.appendChild(ToDodate);
        addd.appendChild(newelmnt2);

        // Save the task to the tasks array
        tasks.push({ text: inputVal, date: dateValue, checked: false });

        button.addEventListener('click', function () {
            newelmnt.remove();
            newelmnt2.remove();
            ToDodate.remove();
            checkBox.remove();
            // Remove the task from the tasks array
            tasks = tasks.filter(task => task.text !== inputVal);
            // Save updated tasks to localStorage
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });

        checkBox.addEventListener('click', function () {
            newelmnt.classList.toggle('done');
            ToDodate.classList.toggle('done');
            // Update the checked property in the tasks array
            const taskIndex = tasks.findIndex(task => task.text === inputVal);
            if (taskIndex !== -1) {
                tasks[taskIndex].checked = !tasks[taskIndex].checked;
            }
            // Save updated tasks to localStorage
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });
    }
</script>

</html>
