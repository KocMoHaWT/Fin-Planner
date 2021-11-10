
class InjectableContainer {
    private dependencies: Record<string, any> = {};
    private instances: Record<string, any> = {};


    setDependency(dependency: any, key: string, arrayOfDependencies: string[]) {
        this.instances[key] = {
            instance: dependency,
            args: arrayOfDependencies,
        };
    }

    initDependency(el: string) {
        const params: Record<string, any> = {};
        const entity = this.instances[el];
        entity.args.map((arg: string) => {
            if (this.dependencies[arg]) {
                params[arg] = this.dependencies[arg];
            } else {
                params[arg] = this.initDependency(arg)
            }
        })
        const isClass = /^\s*class\s+/.test(this.instances[el].instance.toString());
        if (!isClass) {
            this.dependencies[el] = this.instances[el].instance;
            return this.dependencies[el];
        }
        // needs in order to not create instance a lot of times because of recursion
        if (!this.dependencies[el]) {
            this.dependencies[el] = new this.instances[el].instance(entity.args.length ? { ...params } : undefined);
        }
        return this.dependencies[el];
    }

    initialise() {
        for (const [key] of Object.entries(this.instances)) {
            this.initDependency(key);
        }
    }

    getDepency(key: string) {
        if (!this.dependencies[key]) {
            return null
        }
        return this.dependencies[key]
    }
}

export default new InjectableContainer();