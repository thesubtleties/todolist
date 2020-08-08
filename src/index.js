import { taskList } from './taskList';
import { dom } from './domstuff';
import { events } from './eventListeners';
import { localStore } from './local';

if (localStore.checkStorage() == 0) { 
    taskList.makeDefaultTask();
    dom.buildProjectList();    
}
const tempProjectCheck = localStore.getProjectsFromStorage();
console.log(tempProjectCheck);
console.log(tempProjectCheck != []);
if (tempProjectCheck.length != 0) {
    taskList.makeTasks(localStore.getTasksFromStorage());
    taskList.initializeProjectList(localStore.getProjectsFromStorage());
    dom.buildProjectList();
}
else {
    taskList.makeDefaultTask();
    dom.buildProjectList();    
    
}



dom.setStartProject();
events.pressAddProject();
events.pressAddTask();
console.log(localStorage.getItem('currentProject'));
console.log(taskList.projectList);









