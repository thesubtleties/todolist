import * as fns from 'date-fns';
import { dateRules } from './dateRules';
import { local } from './local';

const taskList = (() => {
    let tasks = [];
    let projectList = [];
    let currentProject;
    let currentTask;
    let taskCounter = 1;

    const defaultTask = {
        name: 'Your first task',
        description: 'Here is what a task looks like - feel free to remove this.',
        dueDate: '06/10/2021',
        priority: 'High',
        timeMade: `${fns.format(new Date(), dateRules.dateFormat)}`,
        isComplete: false,
        project: 'Your First Project',
        id: 0
    };

    const taskFactory = (task) => {
        let newTask = {name: task.name, description: task.description, dueDate: task.dueDate, priority: task.priority, timeMade: (task.timeMade) ? task.timeMade : `${fns.format(new Date(), dateRules.dateFormat)}`, isComplete: (task.isComplete) ? task.isComplete : false, project: task.project, id: taskCounter };
        upTaskCount();
        return newTask;
    };

    const makeDefaultTask = () => {
        addTask(taskFactory(defaultTask));
        
    };
    const makeTasks = (tempTasks) => {
        tempTasks.forEach(task => {
            addTask(taskFactory(task));
        })
    }

    const addTask = (task) => {
        tasks.push(task);
    };
    const findTaskNumber = (task) => {
        const taskNumber = tasks.findIndex(aTask => aTask.id === task.id);
        return taskNumber;
    }
    const removeTask = (task) => {
        tasks.splice(findTaskNumber(task), 1);
    }
    const getTasks = () => {
        return tasks;
    }
    const updateTask = (oldTask, newTask) => {
        const tempTask = Object.assign(oldTask, newTask);
        tasks.splice(findTaskNumber(oldTask), 1, tempTask);
    }

    const returnTasksByProject = (projectName) => {
        return tasks.filter(task => (task.project === projectName));
    }

    const returnProjectList = () => {
        tasks.forEach(task => {
            if (!projectList.some(project => project == task.project)) {
                projectList.push(task.project);
            }
        }
        )
        return projectList;
    }

    const updateProject = (oldProjectName, newProjectName) => {
        tasks.forEach(task => {
            if (task.project == oldProjectName) {
                task.project = newProjectName;
            }
        })
        projectList.forEach(project => {
            if (project == oldProjectName) {
                removeProjectFromList(oldProjectName);
                addProject(newProjectName);
            }
        })
    }
    const addProject = (projectName) => {
        if (checkProjectDuplicate(projectName) == false) {
        projectList.push(projectName);
        }
    }
    const deleteProject = (projectName) => {
        tasks.forEach(task => {
            if (task.project == projectName) {
                tasks.splice(findTaskNumber(task), 1)
            }
        })
        removeProjectFromList(projectName);
    }

    const setCurrentProject = (projectName) => {
        currentProject = projectName;
    }
    const setCurrentTask = (id) => {
        tasks.forEach(task => {
            if (task.id == id) {
                currentTask = task;
            }

        })
    }
    const upTaskCount = () => {
        taskCounter++;
    }
    const getTaskById = (id) => {
        let ourTask = tasks.find(task => (task.id == id));
        return ourTask;
    }

    const toggleComplete = (task) => {
        tasks[findTaskNumber(task)].isComplete = !tasks[findTaskNumber(task)].isComplete;
    }

    const checkProjectDuplicate = (newProject) => {
        let isDupe;
        if (projectList.length > 0) {
        projectList.some(project => {
            if (project.toLowerCase() == newProject.toLowerCase()) {
                return isDupe = true;
                
            }
            else {
                isDupe = false;
            }
        })
    }
    else { 
        isDupe = false; 
    }
        return isDupe;

    }
    const removeProjectFromList = (projectToRemove) => {
        let projectNumber = projectList.findIndex(project => project == projectToRemove);
        projectList.splice(projectNumber, 1);
    }

    const initializeProjectList = (savedProjects) => {
        savedProjects.forEach(project => {
            taskList.addProject(project);
        })

    }


    
    return {
        getTasks,
        addTask,
        findTaskNumber,
        removeTask,
        updateTask,
        returnTasksByProject,
        returnProjectList,
        updateProject,
        deleteProject,
        addProject,
        setCurrentProject,
        setCurrentTask,
        upTaskCount,
        toggleComplete,
        tasks,
        taskCounter,
        getTaskById,
        checkProjectDuplicate,
        removeProjectFromList,
        taskFactory,
        makeDefaultTask,
        projectList,
        makeTasks,
        initializeProjectList
    };
})();

export { taskList };