class InjectableContainer {
    private dependencies: Record<string, any> = {};
    private instances: Record<string, any> = {};


    setDependency(dependency: any, key: string, arrayOfDependencies: string []) {
        this.instances[key] = {
            instance: dependency,
            args: arrayOfDependencies,
        };
    }

    initDependency(el: string) {
        const params: Record<string, any> = {};
        const entity =  this.instances[el];
        console.log('el', el);
        entity.args.map((arg: string) => {
            if(this.dependencies[arg]) {
                params[arg] = this.dependencies[arg];
            } else {
                this.initDependency(arg)
            }
        })

        this.dependencies[el] = new this.instances[el].instance(entity.args.length ? {...params} : undefined)
    }

    initialise() {
        for (const [key, value] of Object.entries(this.instances)) {
            this.initDependency(key);
          }

          console.log(this.dependencies)
    }
}

export default new InjectableContainer();