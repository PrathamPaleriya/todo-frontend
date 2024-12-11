import axios from "axios"

const ROUTE = "https://todoapp-1upt.onrender.com/tasks"

export const ping = () => {
    try {
        const response = axios.get("https://todoapp-1upt.onrender.com/ping");
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error.message);
        return [];
    }
}

export const getTask = async () => {
    try {
        const response = await axios.get(`${ROUTE}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error.message);
        return [];
    }
}

export const addTask = async (data) => {
    try {
        const response = await axios.post(`${ROUTE}`, {"task": data});
        return response.data;
    } catch (error) {
        console.error('Error adding tasks:', error.message);
        return null;
    }
}

export const updateTask = async (id,data) => {
    try {
        const response = await axios.put(`${ROUTE}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating tasks:', error.message);
        return null;
    }
}

export const deleteTask = async (id) => {
    try {
        const response = await axios.delete(`${ROUTE}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error completing tasks:', error.message);
        return null;
    }
}
