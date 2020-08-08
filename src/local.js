import { taskList } from './taskList';

const localStore = (() => {
    const addToStorage = () => {
        localStorage.setItem('check', 'true');
        let tempProjectList = taskList.returnProjectList();
        let tempTasks = taskList.getTasks();
        let tempCurrent = taskList.currentProject;
        localStorage.setItem('projectList', JSON.stringify(tempProjectList));
        localStorage.setItem('tasks', JSON.stringify(tempTasks));
        localStorage.setItem('currentProject', JSON.stringify(tempCurrent));
    }
    const getProjectsFromStorage = () => {
        return JSON.parse(localStorage.getItem('projectList'));
    }
    const getTasksFromStorage = () => {
        return JSON.parse(localStorage.getItem('tasks'));
    }
    const getCurrentFromStorage = () => {
        return JSON.parse(localStorage.getItem('currentProject'));
    }

    const checkStorage = () => {
        if (localStorage.check == 'true') {
            return 1;
        }
        else {
            return 0;
        }
    }

    return {
        addToStorage,
        checkStorage,
        getProjectsFromStorage,
        getTasksFromStorage,
        getCurrentFromStorage

    }
})();

export { localStore };