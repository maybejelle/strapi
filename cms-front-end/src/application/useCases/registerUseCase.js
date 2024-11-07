import { register } from "../../infrastructure/APICalls";

export const registerUseCase = {
    async execute(name,email,password){

        const response = await register(name,email,password);

        return response;
    }
}