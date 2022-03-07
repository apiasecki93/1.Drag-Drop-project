import { Component } from './base-component';
import {Validatable, validate} from '../util/validation'
import { autobind } from '../decorators/autobind';
import { projectState } from '../state/project-state';



      //ProjectInput Class
    export  class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
        
        titleInputElement: HTMLInputElement;
        descriptionInputElement: HTMLInputElement;
        peopleInputElement: HTMLInputElement; 
        constructor() {
            super('project-input', 'app', true, 'user-input')
            this.configure(); // this method is called when the form is submitted
            this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
            this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
            this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
            
        }

        configure() {
            this.element.addEventListener('submit', this.submitHandler); // submitHandler() is a method that is called when the form is submitted.
        }

        renderContent() { 
            
        }

        private gatherUsersInput(): [string, string, number] | void {
            const enteredTitle = this.titleInputElement.value;
            const enteredDescription = this.descriptionInputElement.value;
            const enteredPeople = this.peopleInputElement.value;


            const titleValidatable: Validatable = {
                value: enteredTitle,
                required: true
            }

            const descriptionValidatable: Validatable = {
                value: enteredDescription,
                required: true,
                minLength: 5
            }

            const peopleValidatable: Validatable = {
                value: +enteredPeople,
                required: true,
                min: 1,
                max: 5
            }

            if (
                !validate(titleValidatable) ||
                !validate(descriptionValidatable) ||
                !validate(peopleValidatable)
            ) {
                alert('Invalid input, please try again');
                return;
            } else {
                return [enteredTitle, enteredDescription, +enteredPeople];
                //console.log(enteredTitle, enteredDescription, +enteredPeople);
                
            }
        }

        //private methods mean to be used only in this class and not in the outside of the class
        
        private clearInputs() {
            this.titleInputElement.value = '';
            this.descriptionInputElement.value = '';
            this.peopleInputElement.value = '';
        }


        @autobind //autobind decorator for class methods
        private submitHandler(event: Event) { // this method should triger when the form is submitted
            event.preventDefault(); // preventDefault() prevents the default action of an element from occurring.
            //console.log(this.titleInputElement.value);
            const userInput = this.gatherUsersInput() //
            if (Array.isArray(userInput)) {
                const [title, desc, people] = userInput;
                projectState.addProject(title, desc, people);
                console.log(title, desc, people);
                this.clearInputs();
            }
        }
    }
