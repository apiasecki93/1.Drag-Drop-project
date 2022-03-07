
     //Component Base Class, like user interface component which is rendered on the screen
    export  abstract class Component<T extends HTMLElement,U extends HTMLElement>{  //here we are using Generics <T,U> to make the code more flexible and reusable
        templateElement: HTMLTemplateElement;
        hostElement: T;
        element: U;

        constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {
            this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
            this.hostElement = document.getElementById(hostElementId)! as T;

            const importedNode = document.importNode(this.templateElement.content, true);
            this.element = importedNode.firstElementChild as U;
            if (newElementId) {
            this.element.id = newElementId;
            }
            this.attach(insertAtStart);
        }
        private attach(insertAtBeginning: boolean) {
            this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
        }

        abstract configure(): void; //abstract method, which is going to be implemented in the subclasses of the component 
        abstract renderContent(): void;

    }  
