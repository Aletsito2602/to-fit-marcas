import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { campaignsService, FirebaseCampaign } from '../services/campaignsService';

export const useCampaigns = () => {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState<FirebaseCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      setError(null);
      const campaignsData = await campaignsService.getCampaigns(user?.uid);
      setCampaigns(campaignsData);
    } catch (err) {
      console.error('Error fetching campaigns:', err);
      setError('Error al cargar las campañas');
    } finally {
      setLoading(false);
    }
  };

  const createCampaign = async (campaignData: Omit<FirebaseCampaign, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setError(null);
      const campaignId = await campaignsService.createCampaign({
        ...campaignData,
        createdBy: user?.uid || '',
      });
      
      // Refresh campaigns list
      await fetchCampaigns();
      
      return campaignId;
    } catch (err) {
      console.error('Error creating campaign:', err);
      setError('Error al crear la campaña');
      throw err;
    }
  };

  const updateCampaign = async (campaignId: string, updates: Partial<FirebaseCampaign>) => {
    try {
      setError(null);
      await campaignsService.updateCampaign(campaignId, updates);
      
      // Refresh campaigns list
      await fetchCampaigns();
    } catch (err) {
      console.error('Error updating campaign:', err);
      setError('Error al actualizar la campaña');
      throw err;
    }
  };

  const deleteCampaign = async (campaignId: string) => {
    try {
      setError(null);
      await campaignsService.deleteCampaign(campaignId);
      
      // Refresh campaigns list
      await fetchCampaigns();
    } catch (err) {
      console.error('Error deleting campaign:', err);
      setError('Error al eliminar la campaña');
      throw err;
    }
  };

  const getCampaignsByStatus = async (status: string) => {
    try {
      setError(null);
      const campaignsData = await campaignsService.getCampaignsByStatus(status, user?.uid);
      return campaignsData;
    } catch (err) {
      console.error('Error fetching campaigns by status:', err);
      setError('Error al cargar las campañas');
      return [];
    }
  };

  useEffect(() => {
    if (user?.uid) {
      fetchCampaigns();
    }
  }, [user?.uid]);

  return {
    campaigns,
    loading,
    error,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    getCampaignsByStatus,
    refetchCampaigns: fetchCampaigns,
  };
};