import { taskList } from './taskList';
import { dom } from './domstuff';
import { events } from './eventListeners';
import { localStore } from './local';

if (localStore.checkStorage() === 0) {
  taskList.makeDefaultTask();
  dom.buildProjectList();
}
const tempProjectCheck = localStore.getProjectsFromStorage();
if (tempProjectCheck.length !== 0) {
  taskList.makeTasks(localStore.getTasksFromStorage());
  taskList.initializeProjectList(localStore.getProjectsFromStorage());
  dom.buildProjectList();
} else {
  taskList.makeDefaultTask();
  dom.buildProjectList();
}

dom.setStartProject();
events.pressAddProject();
events.pressAddTask();
