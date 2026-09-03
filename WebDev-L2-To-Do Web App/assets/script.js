const inpValue = document.getElementById("input_value");
const addBtn = document.querySelector(".add_btn");
const taskWaiting = document.querySelector(".div_left");
const taskCompleted = document.querySelector(".div_right");
const pending = document.querySelector(".pending");
const completed = document.querySelector(".completed");

function updateCounters() {
  const pendingCount = taskWaiting.querySelectorAll("li.task_li").length;
  const completedCount = taskCompleted.querySelectorAll("li.task_li").length;

  pending.textContent = `${pendingCount} pending`;
  completed.textContent = `${completedCount} completed`;
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let val = inpValue.value.trim();

  if (val === "") {
    alert("Please write something!");
    return;
  }

  let newLi = document.createElement("li");
  newLi.classList.add("task_li");

  let textLi = document.createElement("span");
  textLi.classList.add("text_li");
  textLi.textContent = val;

  let now = new Date();
  let year = now.getFullYear();
  let month = String(now.getMonth() + 1).padStart(2, "0");
  let day = String(now.getDate()).padStart(2, "0");
  let hours = String(now.getHours()).padStart(2, "0");
  let minutes = String(now.getMinutes()).padStart(2, "0");

  let date = `Added:${year}-${month}-${day} ${hours}:${minutes}`;

  let taskDate = document.createElement("span");
  taskDate.classList.add("task_date");
  taskDate.textContent = date;

  let textDiv = document.createElement("div");
  textDiv.classList.add("task_div_text");

  textDiv.appendChild(textLi);
  textDiv.appendChild(taskDate);

  newLi.appendChild(textDiv);

  let iconDiv = document.createElement("div");
  iconDiv.classList.add("task_div_icon");

  let readyIcon = document.createElement("i");
  readyIcon.className = "fa-solid fa-check";
  let readyButton = document.createElement("button");
  readyButton.appendChild(readyIcon);
  iconDiv.appendChild(readyButton);

  let editIcon = document.createElement("i");
  editIcon.className = "fa-solid fa-pen-to-square";
  let editButton = document.createElement("button");
  editButton.appendChild(editIcon);
  iconDiv.appendChild(editButton);

  let deleteIcon = document.createElement("i");
  deleteIcon.className = "fa-solid fa-trash";
  let deleteButton = document.createElement("button");
  deleteButton.appendChild(deleteIcon);
  iconDiv.appendChild(deleteButton);

  newLi.appendChild(iconDiv);
  taskWaiting.appendChild(newLi);

  inpValue.value = "";
  updateCounters();

  deleteButton.addEventListener("click", () => {
    newLi.remove();
    updateCounters();
  });

  readyButton.addEventListener("click", () => {
    taskCompleted.appendChild(newLi);
    readyButton.remove();
    editButton.remove();
    textLi.style.textDecoration = "line-through";
    textLi.style.color = "#8a8d91";

    let now = new Date();
    let year = now.getFullYear();
    let month = String(now.getMonth() + 1).padStart(2, "0");
    let day = String(now.getDate()).padStart(2, "0");
    let hours = String(now.getHours()).padStart(2, "0");
    let minutes = String(now.getMinutes()).padStart(2, "0");

    let updateDate = `Added:${year}-${month}-${day} ${hours}:${minutes}`;
    taskDate.textContent = updateDate;

    let backButton = document.createElement("button");
    backButton.classList.add("back_button");
    iconDiv.appendChild(backButton);

    let backIcon = document.createElement("i");
    backIcon.className = "fa-solid fa-rotate-left";
    backButton.appendChild(backIcon);

    iconDiv.insertBefore(backButton, deleteButton);

    updateCounters();

    backButton.addEventListener("click", () => {
      textLi.style.textDecoration = "none";
      textLi.style.color = "";
      taskWaiting.appendChild(newLi);
      backButton.remove();
      iconDiv.insertBefore(readyButton, deleteButton);
      iconDiv.insertBefore(editButton, deleteButton);

      updateCounters();
    });
  });

  editButton.addEventListener("click", () => {
    let updateText = prompt("Update the task.:", textLi.textContent);
    if (updateText !== null && updateText.trim() !== "") {
      textLi.textContent = updateText.trim();
    }
  });
});

updateCounters();
