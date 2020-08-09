import * as fns from 'date-fns';
import { taskList } from './taskList';
import { dateRules } from './dateRules';
import { events } from './eventListeners';
import { localStore } from './local';

const dom = (() => {
  const pListDiv = document.querySelector('.projectList');
  const tListDiv = document.querySelector('.taskList');
  const editDiv = document.querySelector('.editList');

  const buildProjectDiv = (project) => {
    const projectDiv = document.createElement('div');
    projectDiv.classList.add('projectBox');
    projectDiv.setAttribute('id', `${project}`);
    projectDiv.innerHTML = `<div class = "projectEdit" data-project = "${project}">p</div>
                                <div class = "projectName">${project}</div>`;
    return projectDiv;
  };
  const addProjectDiv = (div) => {
    pListDiv.appendChild(div);
  };
  const clearProjectList = () => {
    pListDiv.innerHTML = '';
  };
  const clearTaskList = () => {
    tListDiv.innerHTML = '';
  };
  const clearEditArea = () => {
    editDiv.innerHTML = '';
    localStore.addToStorage();
  };
  const buildProjectList = () => {
    clearProjectList();
    const projectArray = taskList.returnProjectList();
    projectArray.forEach((project) => {
      addProjectDiv(buildProjectDiv(project));
    });
    events.pressEditProject();
    events.pressPickProjectButton();
  };
  const buildTaskDiv = (task) => {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add(`taskBox${task.priority}`);
    taskDiv.innerHTML = `<div class = "taskName">${task.name}</div>
                            <div class = "description">${task.description}</div>
                            <div class = "dueDate">Due on: ${task.dueDate}</div>
                            <div class = "dateAdded">Made on: ${task.timeMade}</div>
                            <div class = ${(task.isComplete !== true) ? 'taskComplete' : 'taskNotComplete'} id = "completeButton" data-id = "${task.id}">q</div>
                            <div class = "taskEdit" data-id = "${task.id}">p</div>`;
    return taskDiv;
  };
  const addTaskDiv = (div) => {
    tListDiv.appendChild(div);
  };
  const buildTaskList = (project) => {
    tListDiv.innerHTML = '';
    const taskArray = taskList.returnTasksByProject(project);

    taskArray.forEach((task) => {
      addTaskDiv(buildTaskDiv(task));
    });
    events.pressTaskComplete();
    events.pressEditTask();
  };
  const makeProjectDropdown = () => {
    const projects = taskList.returnProjectList();
    let projectOptions;
    projects.forEach((project) => {
      const projectOption = (taskList.currentProject === project) ? `<option value="${project}" selected="selected">${project}</option>` : `<option value="${project}">${project}</option>`;
      projectOptions += projectOption;
    });
    return projectOptions;
  };
  const makePrioritySelection = (task) => {
    if (task.priority === 'High') {
      const priorityText = '<option value="Low">Low</option><option value="Mid">Medium</option><option value="High" selected="selected">High</option>';
      return priorityText;
    } if (task.priority === 'Mid') {
      const priorityText = '<option value="Low">Low</option><option value="Mid" selected="selected">Medium</option><option value="High">High</option>';
      return priorityText;
    } if (task.priority === 'Low') {
      const priorityText = '<option value="Low" selected="selected">Low</option><option value="Mid">Medium</option><option value="High">High</option>';
      return priorityText;
    }
  };
  const makeNewTaskBox = () => {

  };
  const makeEditTaskBox = (task) => {
    const taskEditDiv = document.createElement('div');
    taskEditDiv.classList.add('editTaskBox');
    taskEditDiv.setAttribute('id', task.id);
    taskEditDiv.innerHTML = `<div class = "editAreaTitle">Edit Task</div>
                                <div id = "exitBoxButton" class = "exitEditTaskBox">x</div>
                                <button id = "submit" class = "submitButton">Submit</button>
                                <button id = "delete" class = "deleteButton">Delete</button>
                                <div class = "editTaskName">Task: <input type="text" id="title" name="title" value ="${task.name}"></div>
                                <div class = "editProjectName">Project: <select id="project" name="project">${makeProjectDropdown()}</select></div>
                                <div class = "editPriority">Priority <select id="priority" name="priority">${makePrioritySelection(task)}</select></div>
                                <div class = "editDescription">Description: <input type="text" id="description" name="description" value="${task.description}"></div>
                                <div class = "editDueDate">Due: <input type="date" id="editDueDate" name="editDueDate" value="${dateRules.prettyDateToHTMLType(task.dueDate)}"></div>`;
    return taskEditDiv;
  };

  const makeNewTaskEditBox = () => {
    const newTaskDiv = document.createElement('div');
    newTaskDiv.classList.add('newTaskBox');
    newTaskDiv.innerHTML = `<div class = "editAreaTitle">Add Task</div>
                                <div id = "exitBoxButton" class = "exitEditTaskBox">x</div>
                                <button id = "submit" class = "submitButton">Submit</button>
                                <div class = "editTaskName">Task: <input type="text" id="title" name="title" value ="Task name"></div>
                                <div class = "editProjectName">Project: <select id="project" name="project">${makeProjectDropdown()}</select></div>
                                <div class = "editPriority">Priority <select id="priority" name="priority"><option value="Low" selected="selected">Low</option><option value="Mid">Medium</option><option value="High">High</option></select></div>
                                <div class = "editDescription">Description: <input type="text" id="description" name="description" value="Task description goes here."></div>
                                <div class = "editDueDate">Due: <input type="date" id="editDueDate" name="editDueDate"></div>`;
    return newTaskDiv;
  };
  const makeProjectEditBox = (project) => {
    const projectEditDiv = document.createElement('div');
    projectEditDiv.classList.add('editProjectBox');
    projectEditDiv.innerHTML = `<div class = "editAreaTitle">Edit Project</div>
                                <div id = "exitBoxButton" class = "exitEditTaskBox">x</div>
                                <button id = "submit" class = "submitButton">Submit</button>
                                <button id = "delete" class = "deleteButton">Delete</button>
                                <div class = "editProjectNameText">Name: <input type="text" id="projectNameText" name="projectNameText" value ="${project}"></div>`;
    return projectEditDiv;
  };
  const makeNewProjectBox = () => {
    const newProjectDiv = document.createElement('div');
    newProjectDiv.classList.add('makeNewProjectBox');
    newProjectDiv.innerHTML = `<div class = "editAreaTitle">New Project</div>
                                <div id = "exitBoxButton" class = "exitEditTaskBox">x</div>
                                <button id = "submit" class = "submitButton">Submit</button>
                                <div class = "editProjectNameText">Name: <input type="text" id="projectNameText" name="projectNameText" value ="Project Name"></div>`;
    return newProjectDiv;
  };

  const appendNewEditArea = (div) => {
    editDiv.appendChild(div);
    if (div.getAttribute('class') === 'makeNewProjectBox') {
      events.submitAddProject();
    } else if (div.getAttribute('class') === 'editProjectBox') {
      events.submitUpdateProjectButton();
      events.deleteProjectButton();
    } else if (div.getAttribute('class') === 'newTaskBox') {
      events.pressSubmitAddTask();
    } else if (div.getAttribute('class') === 'editTaskBox') {
      events.pressSubmitUpdateTask();
      events.pressTaskDelete();
    }
    events.exitBox();
  };
  const removeEditArea = () => {
    editDiv.innerHTML = '';
  };

  const toggleCompleteButton = (id) => {
    let completeCheck = document.querySelectorAll(`.taskComplete[data-id="${id}"]`);

    if (completeCheck.length === 0) {
      completeCheck = document.querySelectorAll(`.taskNotComplete[data-id="${id}"]`);
    }

    const completeButton = completeCheck;
    completeButton.forEach((button) => {
      if (button.getAttribute('class') === 'taskComplete') {
        button.classList.remove('taskComplete');
        button.classList.add('taskNotComplete');
      } else if (button.getAttribute('class') === 'taskNotComplete') {
        button.classList.remove('taskNotComplete');
        button.classList.add('taskComplete');
      }
    });
  };
  const getElementValue = (input) => {
    const valueOf = document.getElementById(`${input}`);
    return valueOf.value;
  };

  const makeObjectFromInput = () => {
    const taskName = getElementValue('title');
    const project = getElementValue('project');
    const description = getElementValue('description');
    const priority = getElementValue('priority');
    const dueDate = (getElementValue('editDueDate')) ? fns.format(fns.parseISO(`${getElementValue('editDueDate')}`), dateRules.dateFormat) : '';

    const obj = {
      name: taskName,
      description,
      dueDate,
      priority,
      project,
    };
    return obj;
  };

  const returnProjectNameText = () => getElementValue('projectNameText');

  const projectSelected = (project, isFirst) => {
    if (isFirst !== true) { turnOffOldProject(taskList.currentProject); }
    const projectDiv = document.getElementById(`${project}`);
    projectDiv.classList.toggle('projectSelected');
    buildTaskList(project);
    taskList.currentProject = project;
  };
  const turnOffOldProject = (oldProject) => {
    const projectDiv = document.getElementById(`${oldProject}`);
    projectDiv.classList.toggle('projectSelected');
  };
  const setStartProject = () => {
    const projectList = taskList.returnProjectList();
    projectSelected(projectList[0], true);
  };

  const getTaskForEdit = () => {
    const taskBoxDiv = document.querySelector('.editTaskBox');
    const taskId = taskBoxDiv.getAttribute('id');
    return taskList.getTaskById(taskId);
  };

  return {
    buildProjectDiv,
    addProjectDiv,
    buildProjectList,
    buildTaskDiv,
    buildTaskList,
    makeNewTaskBox,
    makeEditTaskBox,
    appendNewEditArea,
    removeEditArea,
    makeNewTaskEditBox,
    makeProjectEditBox,
    makeNewProjectBox,
    toggleCompleteButton,
    makeObjectFromInput,
    returnProjectNameText,
    clearProjectList,
    clearTaskList,
    clearEditArea,
    projectSelected,
    setStartProject,
    getTaskForEdit,

  };
})();

export { dom };
