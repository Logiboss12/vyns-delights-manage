import api from './api';

export const adminService = {
  getStats: () => api.get('/admin/dashboard/stats'),
  getOrders: (page = 1) => api.get('/admin/orders', { params: { page } }),
  updateOrderStatus: (id, status) => api.patch(`/admin/orders/${id}/status`, { status }),
  getProducts: (page = 1) => api.get('/products', { params: { page } }),
  createProduct: (data) => api.post('/products', data),
  updateProduct: (id, data) => api.put(`/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/products/${id}`),
  getCategories: () => api.get('/categories'),
  getCharts: () => api.get('/admin/dashboard/charts'),


  
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
    getEvents: () => api.get('/admin/events'),
    createEvent: (data) => api.post('/events', data),
     updateEvent: (id, data) => api.put(`/events/${id}`, data),
    deleteEvent: (id) => api.delete(`/events/${id}`),
};