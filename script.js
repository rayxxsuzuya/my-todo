const $input = document.querySelector('#text');
const $block = document.querySelector('.block');
const $addBtn = document.querySelector('.add-btn');

$input.addEventListener('keydown', addItem);

let todos;

function toLocal() {
  todos = $block.innerHTML;
  localStorage.setItem('todos', todos);
}

document.body.addEventListener('click', (el) => {
  if (el.target.classList.contains('task-complete')) {
    el.preventDefault();
    el.target.parentElement.children[0].classList.add('completed');
    toLocal();
  } else if (el.target.classList.contains('task-delete')) {
      el.target.parentElement.remove();
      toLocal();
  }
});

$addBtn.addEventListener('click', function(e) {
    e.preventDefault();
    let item = document.createElement('div');
    let taskText = document.createElement('p');
    taskText.classList.add('task-text');
    taskText.innerHTML = $input.value;
    item.append(taskText);
    let taskComplete = document.createElement('button');
    taskComplete.classList.add('fas','fa-check', 'task-complete');
    taskComplete.addEventListener('click', completeItem);
    item.append(taskComplete);
    let taskDelete = document.createElement('button');
    taskDelete.classList.add('fas','fa-trash-alt', 'task-delete');
    taskDelete.addEventListener('click', removeItem);
    item.append(taskDelete);
    item.classList.add('item');
    $block.insertAdjacentElement('beforeend', item);
    $input.value = '';
    toLocal();
});

function addItem(e) {
  if (e.key === 'Enter' && e.target.value) {
    let item = document.createElement('div');
    let taskText = document.createElement('p');
    taskText.classList.add('task-text');
    taskText.innerHTML = e.target.value;
    item.append(taskText);
    let taskComplete = document.createElement('button');
    taskComplete.classList.add('fas','fa-check', 'task-complete');
    taskComplete.addEventListener('click', completeItem);
    item.append(taskComplete);
    let taskDelete = document.createElement('button');
    taskDelete.classList.add('fas','fa-trash-alt', 'task-delete');
    taskDelete.addEventListener('click', removeItem);
    item.append(taskDelete);
    item.classList.add('item');
    $block.insertAdjacentElement('beforeend', item);
    e.target.value = '';
    toLocal();
  }
} 

function completeItem(e) {
  e.preventDefault();
  e.target.parentElement.children[0].classList.add('completed');
  toLocal();
}

function removeItem(e) {
  e.target.parentElement.remove();
  toLocal();
}

if (localStorage.getItem('todos')) {
  $block.innerHTML = localStorage.getItem('todos');
}