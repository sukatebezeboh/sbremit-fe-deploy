import { useQuery } from "react-query";
import endpoints from "util/endpoints";
import { getRequest } from "util/http";

export const useMaintenanceData = () => {
  const customEndpoint = endpoints.HEALTH_CHECK;
  return useQuery(customEndpoint, () => getRequest(customEndpoint, ""));
};
