import { getLogs } from "../../infrastructure/APICalls";
import { SessionServiceImpl } from "../../infrastructure/SessionServiceImpl";


export const fetchLogsUseCase = {
    async execute() {
        const sessionService = new SessionServiceImpl();
        const jwt = sessionService.getToken();
        const response = await getLogs(jwt);
        return response.data.logs.data;
    }
}