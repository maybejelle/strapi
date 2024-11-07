import { getLocations } from "../../infrastructure/APICalls";
import { SessionServiceImpl } from "../../infrastructure/SessionServiceImpl";

export const fetchLocationsUseCase = {
    
    async execute() {
        const sessionService = new SessionServiceImpl();
        const jwt = sessionService.getToken();
        const response = await getLocations(jwt);
        return response.data.data;
    }
}