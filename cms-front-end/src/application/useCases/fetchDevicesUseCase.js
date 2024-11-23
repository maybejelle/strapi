import { getDevices } from "../../infrastructure/APICalls";
import { SessionServiceImpl } from "../../infrastructure/SessionServiceImpl";

export const fetchDevicesUseCase = {
  async execute(id) {
    const sessionService = new SessionServiceImpl();
    const jwt = sessionService.getToken();
    const response = await getDevices(id, jwt);
    return response.data;
  },
};
