 import {Project, ProjectStatus} from '../models/project'
 
 // Project State Management Class 

    type Listener<T> = (items: T[]) => void; //listener is a function that takes an array of projects and returns void

    class State<T> { 
        protected listeners: Listener<T>[] = [] //listeners is an array of functions that take an array of projects and returns void
        addListener(listenerFn: Listener<T>) {
            this.listeners.push(listenerFn);
        }
    }


    export class ProjectState extends State<Project> {
        private projects: Project[] = [];
        private static instance: ProjectState;
        
        private constructor() {
            super()
        }


        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            this.instance = new ProjectState();
            return this.instance;
        }

        

        addProject(title: string, description: string, numOfPeople: number) {
            const newProject = new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.Active);
            this.projects.push(newProject);
            this.updateListeners()
        }

        moveProject(projectId: string, newStatus: ProjectStatus) {
            const project = this.projects.find(prj => prj.id === projectId);
            if (project && project.status !== newStatus) {
                project.status = newStatus;
                this.updateListeners()
            }
        }

        private updateListeners() {
            for (const listenerFn of this.listeners) {
                listenerFn(this.projects.slice());
            }
        }
    }

    export const projectState = ProjectState.getInstance()
