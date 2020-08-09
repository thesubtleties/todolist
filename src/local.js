import { taskList } from './taskList';

const localStore = (() => {
  const addToStorage = () => {
    localStorage.setItem('check', 'true');
    const tempProjectList = taskList.returnProjectList();
    const tempTasks = taskList.getTasks();
    const tempCurrent = taskList.currentProject;
    localStorage.setItem('projectList', JSON.stringify(tempProjectList));
    localStorage.setItem('tasks', JSON.stringify(tempTasks));
    localStorage.setItem('currentProject', JSON.stringify(tempCurrent));
  };
  const getProjectsFromStorage = () => JSON.parse(localStorage.getItem('projectList'));
  const getTasksFromStorage = () => JSON.parse(localStorage.getItem('tasks'));
  const getCurrentFromStorage = () => JSON.parse(localStorage.getItem('currentProject'));

  const checkStorage = () => {
    if (localStorage.check === 'true') {
      return 1;
    }
    return 0;
  };

  return {
    addToStorage,
    checkStorage,
    getProjectsFromStorage,
    getTasksFromStorage,
    getCurrentFromStorage,

  };
})();

export { localStore };
