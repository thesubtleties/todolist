import { dom } from './domstuff';
import { taskList } from './taskList';
import { localStore } from './local';


let events = (() => {

    
    

    let exitBox = () => {
        let exitButton = document.getElementById('exitBoxButton');
        exitButton.addEventListener('click', () => {
            dom.removeEditArea();
        })
    };

    let pressAddProject = () => {
        let addProjectButton = document.getElementById('addProject');
        addProjectButton.addEventListener('click', () => {
            dom.clearEditArea();
            dom.appendNewEditArea(dom.makeNewProjectBox());
        })

    }
    let pressAddTask = () => {
        let addTaskButton = document.getElementById('addTask');
        addTaskButton.addEventListener('click', () => {
            dom.clearEditArea();
            dom.appendNewEditArea(dom.makeNewTaskEditBox());
        })

    }

    let pressTaskComplete = () => {
        let completeButtons = document.querySelectorAll('.taskComplete, .taskNotComplete');
        completeButtons.forEach(button => {
            let id = button.getAttribute('data-id');
            button.addEventListener('click', () => {
                dom.toggleCompleteButton(id);
                taskList.toggleComplete(taskList.getTaskById(id));
                localStore.addToStorage();
            })
        })
    }

    let pressEditTask = () => {
        let editTaskButtons = document.querySelectorAll('.taskEdit');
        editTaskButtons.forEach(button => {
            let id = button.getAttribute('data-id');
            button.addEventListener('click', () => {
                let ourTask = taskList.getTaskById(id);
                dom.clearEditArea();
                dom.appendNewEditArea(dom.makeEditTaskBox(ourTask));
            })
        })
    }

    let pressEditProject = () => {
        let editProjectButtons = document.querySelectorAll('.projectEdit');
        editProjectButtons.forEach(button => {
            let project = button.getAttribute('data-project');
            button.addEventListener('click', () => {
                dom.clearEditArea();
                dom.appendNewEditArea(dom.makeProjectEditBox(project));
            })
        })

    }

    let submitAddProject = () => {
        let submitButton = document.getElementById('submit');
        submitButton.addEventListener('click', () => {

            let projectName = dom.returnProjectNameText();
            if (taskList.checkProjectDuplicate(projectName) == true) {
                alert('You already have a project with that name. Please choose another.');

            }
            else {
            taskList.addProject(projectName);
            dom.buildProjectList();
            dom.projectSelected(projectName, true);
            dom.clearEditArea();
            }
        })
        
    }

    let submitUpdateProjectButton = () => {
        let submitButton = document.getElementById('submit');
        let oldProject = dom.returnProjectNameText();
        submitButton.addEventListener('click', () => {
            let newProject = dom.returnProjectNameText();
            taskList.updateProject(oldProject, newProject);
            dom.buildProjectList(); 
            dom.projectSelected(newProject, true);
            dom.clearEditArea();
        });
    }

    let deleteProjectButton = () => {
        let deleteButton = document.getElementById('delete');
        let oldProject = dom.returnProjectNameText();
        deleteButton.addEventListener('click', () => {
            taskList.deleteProject(oldProject);
            dom.clearEditArea();
            let tempProjects = taskList.returnProjectList();
            if (tempProjects[0] == undefined){ 
                dom.clearTaskList();
                dom.clearProjectList();
            }
                else {
            
                dom.buildProjectList();
                dom.projectSelected(tempProjects[0], true);
                dom.buildTaskList(tempProjects[0]);
                }
            
        });

    }


    const pressSubmitAddTask = () => {
        let submitButton = document.getElementById('submit');
        submitButton.addEventListener('click', () => {
            let taskInput = dom.makeObjectFromInput();
            taskList.addTask(taskList.taskFactory(taskInput));
            dom.projectSelected(taskInput.project);
            dom.buildTaskList(taskInput.project); 
            dom.clearEditArea();
            
        })

    }

    const pressPickProjectButton = () => {
        let projects = document.querySelectorAll('.projectBox');
        projects.forEach(button => {
            let projectName = button.getAttribute('id');
            button.addEventListener('click', () => {
                dom.projectSelected(projectName);
            })
        })

    }

    const pressSubmitUpdateTask = () => {
        let oldTask = dom.getTaskForEdit();
        let submitButton = document.getElementById('submit');
        submitButton.addEventListener('click', () => {
            let newTask = dom.makeObjectFromInput();
            taskList.updateTask(oldTask, newTask);
            dom.projectSelected(newTask.project);
            dom.buildTaskList(newTask.project);
            dom.clearEditArea();
        })

    }

    const pressTaskDelete = () => {
        let oldTask = dom.getTaskForEdit();
        let oldProject = oldTask.project;
        let deleteButton = document.getElementById('delete');
        deleteButton.addEventListener('click', () => {
            taskList.removeTask(oldTask);
            dom.buildTaskList(oldProject);
            dom.clearEditArea();

        })
    }
    

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
        pressTaskDelete
    }
   


})();

export { events };