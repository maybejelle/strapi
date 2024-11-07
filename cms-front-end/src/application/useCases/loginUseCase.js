import { login } from "../../infrastructure/APICalls";
import { SessionServiceImpl } from "../../infrastructure/SessionServiceImpl";


export const loginUseCase = {
    async execute(username, password) {
        const sessionService = new SessionServiceImpl();


        const response = await login(username, password);
        sessionService.setTokenAndUserId(response.data.jwt, response.data.user.documentId);
    }
}