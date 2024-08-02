export class Login {
    username!: string;
    password!: string;

    constructor() {}

    deserialize(input: any): this {
        if (input) {
            Object.assign(this, input);
        }
        return this;
    }
}