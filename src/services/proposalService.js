import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

const ProposalService = {
  submitProposal: async (data) => {
    const response = await api.post(`/submit`, data);
    return response.data;
  },

  getProposals: async (vendorId) => {
    if (!vendorId) throw new Error("vendorId is required");

    const userId = vendorId;
    const response = await api.get(`/vendor?userId=${userId}`);
    return response.data;
  },

  getProposalsForVendor: async (vendorId) => {
    if (!vendorId) throw new Error("vendorId is required");

    const userId = vendorId;
    const response = await api.get(`/vendor?vendorId=${vendorId}`);
    return response.data;
  },


  updateProposalStatus: async (proposalId, status) => {
    try {
      const response = await api.patch(`/proposals/${proposalId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error("Error updating proposal status:", error);
      throw error;
    }
  }

};

export default ProposalService;
