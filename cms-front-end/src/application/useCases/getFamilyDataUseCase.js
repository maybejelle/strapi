import { getFamilyData } from "../../infrastructure/APICalls";
import { SessionServiceImpl } from "../../infrastructure/SessionServiceImpl";



export const getFamilyDataUseCase = {

    async execute(familyId) {
        const sessionService = new SessionServiceImpl();
        const jwt = sessionService.getToken();
        const response = await getFamilyData(jwt,familyId);
        return response;
    }
};