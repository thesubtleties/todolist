import { dom } from './domstuff';
import { taskList } from './taskList';
import { localStore } from './local';

const events = (() => {
  const exitBox = () => {
    const exitButton = document.getElementById('exitBoxButton');
    exitButton.addEventListener('click', () => {
      dom.removeEditArea();
    });
  };

  const pressAddProject = () => {
    const addProjectButton = document.getElementById('addProject');
    addProjectButton.addEventListener('click', () => {
      dom.clearEditArea();
      dom.appendNewEditArea(dom.makeNewProjectBox());
    });
  };
  const pressAddTask = () => {
    const addTaskButton = document.getElementById('addTask');
    addTaskButton.addEventListener('click', () => {
      dom.clearEditArea();
      dom.appendNewEditArea(dom.makeNewTaskEditBox());
    });
  };

  const pressTaskComplete = () => {
    const completeButtons = document.querySelectorAll('.taskComplete, .taskNotComplete');
    completeButtons.forEach((button) => {
      const id = button.getAttribute('data-id');
      button.addEventListener('click', () => {
        dom.toggleCompleteButton(id);
        taskList.toggleComplete(taskList.getTaskById(id));
        localStore.addToStorage();
      });
    });
  };

  const pressEditTask = () => {
    const editTaskButtons = document.querySelectorAll('.taskEdit');
    editTaskButtons.forEach((button) => {
      const id = button.getAttribute('data-id');
      button.addEventListener('click', () => {
        const ourTask = taskList.getTaskById(id);
        dom.clearEditArea();
        dom.appendNewEditArea(dom.makeEditTaskBox(ourTask));
      });
    });
  };

  const pressEditProject = () => {
    const editProjectButtons = document.querySelectorAll('.projectEdit');
    editProjectButtons.forEach((button) => {
      const project = button.getAttribute('data-project');
      button.addEventListener('click', () => {
        dom.clearEditArea();
        dom.appendNewEditArea(dom.makeProjectEditBox(project));
      });
    });
  };

  const submitAddProject = () => {
    const submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', () => {
      const projectName = dom.returnProjectNameText();
      if (taskList.checkProjectDuplicate(projectName) === true) {
        alert('You already have a project with that name. Please choose another.');
      } else {
        taskList.addProject(projectName);
        dom.buildProjectList();
        dom.projectSelected(projectName, true);
        dom.clearEditArea();
      }
    });
  };

  const submitUpdateProjectButton = () => {
    const submitButton = document.getElementById('submit');
    const oldProject = dom.returnProjectNameText();
    submitButton.addEventListener('click', () => {
      const newProject = dom.returnProjectNameText();
      taskList.updateProject(oldProject, newProject);
      dom.buildProjectList();
      dom.projectSelected(newProject, true);
      dom.clearEditArea();
    });
  };

  const deleteProjectButton = () => {
    const deleteButton = document.getElementById('delete');
    const oldProject = dom.returnProjectNameText();
    deleteButton.addEventListener('click', () => {
      taskList.deleteProject(oldProject);
      dom.clearEditArea();
      const tempProjects = taskList.returnProjectList();
      if (tempProjects[0] === undefined) {
        dom.clearTaskList();
        dom.clearProjectList();
      } else {
        dom.buildProjectList();
        dom.projectSelected(tempProjects[0], true);
        dom.buildTaskList(tempProjects[0]);
      }
    });
  };

  const pressSubmitAddTask = () => {
    const submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', () => {
      const taskInput = dom.makeObjectFromInput();
      if (taskInput.project !== '') {
        taskList.addTask(taskList.taskFactory(taskInput));
        dom.projectSelected(taskInput.project);
        dom.buildTaskList(taskInput.project);
        dom.clearEditArea();
      }
    });
  };

  const pressPickProjectButton = () => {
    const projects = document.querySelectorAll('.projectBox');
    projects.forEach((button) => {
      const projectName = button.getAttribute('id');
      button.addEventListener('click', () => {
        dom.projectSelected(projectName);
      });
    });
  };

  const pressSubmitUpdateTask = () => {
    const oldTask = dom.getTaskForEdit();
    const submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', () => {
      const newTask = dom.makeObjectFromInput();
      taskList.updateTask(oldTask, newTask);
      dom.projectSelected(newTask.project);
      dom.buildTaskList(newTask.project);
      dom.clearEditArea();
    });
  };

  const pressTaskDelete = () => {
    const oldTask = dom.getTaskForEdit();
    const oldProject = oldTask.project;
    const deleteButton = document.getElementById('delete');
    deleteButton.addEventListener('click', () => {
      taskList.removeTask(oldTask);
      dom.buildTaskList(oldProject);
      dom.clearEditArea();
    });
  };

  return {
    exitBox,
    pressAddProject,
    pressAddTask,
    pressTaskComplete,
    pressEditTask,
    pressEditProject,
    submitAddProject,
    submitUpdateProjectButton,
    deleteProjectButton,
    pressSubmitAddTask,
    pressPickProjectButton,
    pressSubmitUpdateTask,
    pressTaskDelete,
  };
})();

export { events };
