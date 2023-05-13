const $ = (selector) => {
  const elements = document.querySelectorAll(selector);
  return elements.length === 1 ? elements[0] : elements;
};
Element.prototype.$ = function (selector) {
  const elements = this.querySelectorAll(selector);
  return elements.length === 1 ? elements[0] : elements;
};
const dayToggle = $('.theme div'),
      backGrounds = $('.back-img div'),
      input = $('.input'),
      submit = $('.add'),
      tasksDiv = $('.tasks'),
      leftTaskSpan = $('.items-left div:nth-child(1) span'),
      leftTaskTxt = $('.items-left div:nth-child(1) div'),
      clearCompleted = $('.items-left > div:nth-child(2)'),
      filteredTasks = $('.filtered-tasks span')
;
[...dayToggle].forEach(el => {
  el.addEventListener('click',(e) => {
    e.stopPropagation();
    document.body.classList.toggle('dark');
    [...dayToggle][0].classList.toggle('active');
    [...dayToggle][1].classList.toggle('active');
    [...backGrounds].forEach(bg => bg.classList.toggle('active'));
  });
});
let tasksArray = [];
let delSpan = $('.del');
if (localStorage.getItem('tasks')) {
  tasksArray = JSON.parse(localStorage.getItem('tasks'));
}
function leftTasks() {
  leftTaskSpan.innerHTML = tasksDiv.childElementCount
};
takeMeToLocStorage();
leftTasks();

submit.onclick = () => {
  if (input.value !== '') {
    addTaskToArray(input.value);
    input.value = '';
  }
  leftTasks();
};
[...filteredTasks].forEach(e => {
  e.onclick = (delClass) => {
    filteredTasks.forEach((sibling) => {
      sibling.classList.remove('active');
    });
    delClass.target.classList.add('active');
    toggleActiveCompleted();
  };
});
tasksDiv.addEventListener('click', (e) => {
  if (e.target.classList.contains('del')) {
    deleteTaskWith(e.target.parentElement.dataset.id);
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains('task')) {
    toggleStatusTask(e.target.dataset.id);
    e.target.classList.toggle('done');
  }
  leftTasks();
});
input.onblur = () => {
  submit.click();
};
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    submit.click();
  }
});
clearCompleted.onclick = () => {
  [...tasksDiv.children].forEach((e) => {
    if (e.classList.contains('done')) {
      e.remove();
      deleteCompleted(e.dataset.id)
    }
  });
  leftTasks()
}

function addTaskToArray(taskTxt) {
  const task = {
    id: Date.now(),
    title: taskTxt,
    completed:false,
  };
  tasksArray.push(task);
  appendMe(tasksArray);
  addMeToLocStorage(tasksArray);
};
function appendMe(tasksArray) {
  tasksDiv.innerHTML = '';
  tasksArray.forEach(task => {
    let div = document.createElement('div'),
        span = document.createElement('span');
    div.className = 'task';
    div.dataset.id = task.id;
    if (task.completed) {
      div.className = 'task done';
    }
    div.appendChild(document.createTextNode(task.title));
    span.className = 'del';
    div.appendChild(span);
    tasksDiv.appendChild(div);
  });
};
function addMeToLocStorage(tasksArray) {
  window.localStorage.setItem('tasks', JSON.stringify(tasksArray));
};
function takeMeToLocStorage() {
  let data = window.localStorage.getItem('tasks');
  if (data) {
    let tasks = JSON.parse(data);
    appendMe(tasks);
  }
};
function deleteTaskWith(taskId) {
  tasksArray = tasksArray.filter(e => e.id != taskId);
  addMeToLocStorage(tasksArray)
};
function toggleStatusTask(taskId) {
  for (let i = 0; i < tasksArray.length; i++) {
    if (tasksArray[i].id == taskId) {
      tasksArray[i].completed = !tasksArray[i].completed;
    }
  }
  addMeToLocStorage(tasksArray)
};
function deleteCompleted(taskCompletedId) {
  tasksArray = tasksArray.filter(e => e.completed == false);
  addMeToLocStorage(tasksArray);
}
function toggleActiveCompleted() {
  if (filteredTasks[0].classList.contains('active')) [...tasksDiv.children].forEach(e => e.style.display = 'flex');
  if (filteredTasks[1].classList.contains('active')) {
    [...tasksDiv.children].forEach((e) => {
      e.style.display = 'none';
      if (!e.classList.contains('done')) e.style.display = 'flex';
    });
  }
  if (filteredTasks[2].classList.contains('active')) {
    [...tasksDiv.children].forEach((e) => {
      e.style.display = 'none';
      if (e.classList.contains('done')) e.style.display = 'flex';
    });
  }
}