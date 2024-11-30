import { getPersonalData } from "../../infrastructure/APICalls";
import { SessionServiceImpl } from "../../infrastructure/SessionServiceImpl";



export const getPersonalDataUseCase = {

    async execute() {
        const sessionService = new SessionServiceImpl();
        const jwt = sessionService.getToken();
        const response = await getPersonalData(jwt);
        return response.data;
    }
};