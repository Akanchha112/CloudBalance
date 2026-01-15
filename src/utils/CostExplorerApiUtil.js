
import { getAuthHeaders } from "./authHeaders";
import api from "./axiosInstance";
// import { GROUP_BY_ENUM } from "../constants/costExplorerEnums";

export const getAccountsByRole = async () => {
  try {
    const response = await api.get("/api/accounts", {
      headers: getAuthHeaders()
    });
    return response.data;

  } catch (error) {
    console.error("Failed to fetch accounts:", error);
    throw error;
  }
};

export const getCostData = async ({
  accountId,
  startDate,
  endDate,
  groupBy = "",
  services = [],
  instanceTypes = [],
  usageTypes = [],
  platforms = [],
  regions = [],
  usageTypeGroups = []
}) => {
  try {
    const params = new URLSearchParams();
    params.append("accountId", accountId);
    params.append("startDate", startDate);
    params.append("endDate", endDate);

    if (groupBy) params.append("groupBy", groupBy);
    services.forEach(s => params.append("services", s));
    instanceTypes.forEach(s => params.append("instanceTypes", s));
    usageTypes.forEach(s => params.append("usageTypes", s));
    platforms.forEach(s => params.append("platforms", s));
    regions.forEach(s => params.append("regions", s));
    usageTypeGroups.forEach(s => params.append("usageTypeGroups", s));
    console.log("Cost explorer api data: ",`/api/cost-explorer/data?${params.toString()}`);
    
    const response = await api.get(`/api/cost-explorer/data?${params.toString()}`, {
      headers: getAuthHeaders()
    });
    console.log("Cost explorer api data res: ",response.data);
    
    return response.data; // contains message, data, status
  } catch (error) {
    console.error("Failed to fetch cost data:", error);
    throw error;
  }
};


export const getFilterValues = async (filterType, accountId) => {
  try {
    console.log("Cost explorer filter api: ",`/api/cost-explorer/filters/${filterType}?accountId=${accountId}`);
    const response = await api.get(
      `/api/cost-explorer/filters/${filterType}?accountId=${accountId}`,
      { headers: getAuthHeaders() }
    );
    console.log("Cost explorer filter api: ",response.data);
    return response.data; // contains message, data, status
  } catch (error) {
    console.error(`Failed to fetch filter values for ${filterType}:`, error);
    throw error;
  }
};
