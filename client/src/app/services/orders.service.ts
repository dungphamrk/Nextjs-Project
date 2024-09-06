// src/services/oderService.ts
import axios from 'axios';
import { Order, Product } from '../interfaces/types'; // Import the Oder interface (adjust as per your actual file location)

const API_URL = 'http://localhost:3000/orders'; // Replace with your actual API URL

export const OrderService = {
  async getAllOrders(): Promise<Order[]> {
    const response = await axios.get<Order[]>(API_URL);
    return response.data;
  },

  async addOrder(oder: Order): Promise<Order> {
    const response = await axios.post<Order>(API_URL, oder);
    return response.data;
  },

  async updateOrder(oder: Order): Promise<Order> {
    const response = await axios.put<Order>(`${API_URL}/${oder.id}`, oder);
    return response.data;
  },

  async deleteOrder(id: number): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
  },  

};
