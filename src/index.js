import { taskList } from './taskList';
import { dom } from './domstuff';
import { events } from './eventListeners';
import { localStore } from './local';

if (localStore.checkStorage() == 0) { 
    taskList.makeDefaultTask();
    dom.buildProjectList();    
}
else {
    taskList.makeTasks(localStore.getTasksFromStorage());
    taskList.initializeProjectList(localStore.getProjectsFromStorage());
    dom.buildProjectList();
    
}



dom.setStartProject();
events.pressAddProject();
events.pressAddTask();
console.log(localStorage.getItem('currentProject'));
console.log(taskList.projectList);









