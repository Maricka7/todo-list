import './styles/index.scss';

let modal = document.getElementById('modal');
let openModalButton = document.getElementById('open-modal-button');
let closeModalButton = document.getElementById('button-x');

openModalButton.addEventListener('click', openModal);
closeModalButton.addEventListener('click', closeModal);

let editingTask = null;

const textInputField = document.getElementById('input-task-name');
const todoList = document.getElementById('todo-list');
const submitButton = document.getElementById('submit-button');

function openModal() {
	modal.classList.add('active');
}

function closeModal() {
	modal.classList.remove('active');
	textInputField.value = '';
	editingTask = null;

}

submitButton.addEventListener("click", (e) => {
	e.preventDefault();
	e.stopPropagation();

	if (textInputField.value.trim().length == '') return;

	if (editingTask) return submitEdit();

	const lastElement = document.querySelector('#todo-list .todo-item-container:last-of-type .stall');

	let index = 0;

	if (lastElement) {
		index = Number(lastElement.innerHTML) + 1;
	} else {
		index = 1;
	}

	const todoItemContainer = document.createElement('div');

	todoItemContainer.classList.add('todo-item-container');

	todoList.appendChild(todoItemContainer);

	todoItemContainer.innerHTML = `
		<p class="stall">${index}</p>
		<p class="task-name">${textInputField.value}</p>
		<p class="todo-status">To do</p>
		<div>
			<i class="fa-solid fa-pencil edit-button"></i>
			<i class="fa-sharp fa-solid fa-trash delete-button"></i>
		</div>
	`;

	const editButtons = document.getElementsByClassName('edit-button');
	for (let i = 0; i < editButtons.length; i++) {
		const element = editButtons[i];

		element.addEventListener('click', () => {
			const todoItemContainer = element.parentElement.parentElement;
			const taskName = todoItemContainer.querySelector('.task-name').innerHTML;

			editTask(taskName);
		})
	}

	const todoStatusElements = document.getElementsByClassName('todo-status');

	for (let i = 0; i < todoStatusElements.length; i++) {
		const todoStatusElement = todoStatusElements[i];

		todoStatusElement.addEventListener('click', () => {
			const status = todoStatusElement.innerHTML;

			if (status === "To do") {
				todoStatusElement.innerHTML = "In progress";
			} else if (status === "In progress") {
				todoStatusElement.innerHTML = "Done";
			} else if (status === "Done") {
				todoStatusElement.innerHTML = "To do";
			}
		});
	}

	const deleteButtons = document.getElementsByClassName('delete-button');

	for (let i = 0; i < deleteButtons.length; i++) {
		const element = deleteButtons[i];

		element.addEventListener('click', () => {
			const todoItemContainer = element.parentElement.parentElement;

			todoItemContainer.remove();
		})
	}

	closeModal();
});

function editTask(taskName) {
	editingTask = taskName;
	textInputField.value = taskName;

	openModal();
}

function submitEdit() {
	const todos = document.querySelectorAll('.todo-item-container');

	for (let i = 0; i < todos.length; i++) {
		const todo = todos[i];
		const taskNameElement = todo.querySelector('.task-name');
		const taskName = taskNameElement.innerHTML;

		if (taskName === editingTask) {
			taskNameElement.innerHTML = textInputField.value;
		}
	}

	editingTask = null;
	closeModal();
}
