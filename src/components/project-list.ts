import {DragTarget} from '../models/drag-drop'
import { Project, ProjectStatus } from '../models/project';
import { Component } from './base-component';
import { autobind } from '../decorators/autobind';
import { projectState } from '../state/project-state';
import { ProjectItem } from './project-item';

     //ProjectList Class
    export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
        assignedProjects: Project[];
        
        constructor(private type: 'active' | 'finished') { //private type is for the type of project list we are creating (active or finished)
            super('project-list', 'app',false ,`${type}-projects`)
            this.assignedProjects = [];
            this.configure();
            this.renderContent(); // renderContent() is a private method, it is called here because it is called in the constructor
        }

        @autobind
        dragOverHandler(event: DragEvent) {
            if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
                event.preventDefault();
                const listEl = this.element.querySelector('ul')!;
                listEl.classList.add('droppable')
            }
        }

        @autobind
        dropHandler(event: DragEvent) {
            const prjId = event.dataTransfer!.getData('text/plain');
            projectState.moveProject(prjId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
        }

        @autobind
        dragLeaveHandler(_: DragEvent) {
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.remove('droppable')
        }

        configure() {
            this.element.addEventListener('dragover', this.dragOverHandler);
            this.element.addEventListener('dragleave', this.dragLeaveHandler);
            this.element.addEventListener('drop', this.dropHandler);
            projectState.addListener((projects: Project[]) => { // projectState is the instance of the ProjectState class for the active and finished projects, instane is a static property.
                const relevantProjects = projects.filter(prj => {
                    if (this.type === 'active') {
                        return prj.status === ProjectStatus.Active;
                    }
                    return prj.status === ProjectStatus.Finished;
                })
                this.assignedProjects = relevantProjects;
                this.renderProjects();
                
            })
        }

        renderContent() { // private method to render the content of the project list
            const listId = `${this.type}-projects-list`;
            this.element.querySelector('ul')!.id = listId; // querySelector() returns the first element that matches the specified group of selectors. ! is for type assertion, it means that the element is not null is already there
            this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS'; // textContent is a property of the HTMLElement interface, it is used to get or set the textual content of the specified element.
        
        }

        private renderProjects() { // private method to render the projects
            const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement; // ! is for type assertion, it means that the element is not null is already there
            listEl.innerHTML = ''; // here we get rid of the previous content of the list
            for (const prjItem of this.assignedProjects) {
                new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
            }
        }  
    }
