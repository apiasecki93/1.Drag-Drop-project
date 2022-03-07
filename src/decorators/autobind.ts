
     //autobind decorator for class methods
    export function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {  // underscore _ is a hint for type sciprt that we are not goin to use this values:(_ and _2)
        const originalMethod = descriptor.value;
        const adjDescriptor: PropertyDescriptor = {
            configurable: true,
            get() {
                const boundFn = originalMethod.bind(this);
                return boundFn;
            }
        };
        return adjDescriptor;
    }
