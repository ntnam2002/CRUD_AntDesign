import axiosInstance from "./axiosConfig";

export const getUsers = async () => {
    try {
        const response = await axiosInstance.get("/getUser");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserById = async (userId) => {
    try {
        const response = await axiosInstance.get(`/getUser?id=${userId}`);

        return response.data;
    } catch (error) {
        throw error;
    }
};
export const createUser = async (userData) => {
    try {
        const response = await axiosInstance.post("/createUser", userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (userId, updatedUserData) => {
    try {
        console.log("Updating user", userId);
        const response = await axiosInstance.put(
            `/updateUser/${userId}`,
            updatedUserData,
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteUser = async (userId) => {
    try {
        const response = await axiosInstance.delete(`/deleteUser/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
