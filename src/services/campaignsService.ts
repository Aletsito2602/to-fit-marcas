import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

export interface FirebaseCampaign {
  id?: string;
  marca: string;
  comision: string;
  imagen: string;
  descripcion?: string;
  fechaInicio: Date;
  fechaFin?: Date;
  nombreCampañante: string;
  objetivo: string;
  publicoObjetivo: string;
  mercado: string;
  contenidoIncluido: string[];
  links: {
    afiliacion: string;
    duracion: string;
  };
  materiales: Array<{
    id: number;
    tipo: 'imagen' | 'video';
    url: string;
    thumbnail: string;
  }>;
  productos: Array<{
    id: number;
    nombre: string;
    precio: string;
    imagen: string;
    disponible: boolean;
  }>;
  reglas: string;
  seguimiento: string;
  contenido: {
    historia: Array<{ id: number; title: string; image: string; type: string }>;
    post: Array<{ id: number; title: string; image: string; type: string }>;
    video: Array<{ id: number; title: string; image: string; type: string }>;
  };
  status: 'active' | 'inactive' | 'pending' | 'completed';
  createdBy: string; // user ID
  createdAt: Date;
  updatedAt: Date;
}

class CampaignsService {
  private collectionName = 'campaigns';

  async createCampaign(campaign: Omit<FirebaseCampaign, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const campaignData = {
        ...campaign,
        fechaInicio: Timestamp.fromDate(campaign.fechaInicio),
        fechaFin: campaign.fechaFin ? Timestamp.fromDate(campaign.fechaFin) : null,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      const docRef = await addDoc(collection(db, this.collectionName), campaignData);
      return docRef.id;
    } catch (error) {
      console.error('Error creating campaign:', error);
      throw error;
    }
  }

  async getCampaigns(userId?: string): Promise<FirebaseCampaign[]> {
    try {
      let q;
      
      if (userId) {
        q = query(
          collection(db, this.collectionName),
          where('createdBy', '==', userId)
        );
      } else {
        q = query(collection(db, this.collectionName));
      }

      const querySnapshot = await getDocs(q);
      const campaigns: FirebaseCampaign[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        campaigns.push({
          id: doc.id,
          ...data,
          fechaInicio: data.fechaInicio.toDate(),
          fechaFin: data.fechaFin?.toDate() || undefined,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        } as FirebaseCampaign);
      });

      // Sort by createdAt in memory to avoid index requirement
      campaigns.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      return campaigns;
    } catch (error) {
      console.error('Error getting campaigns:', error);
      throw error;
    }
  }

  async updateCampaign(campaignId: string, updates: Partial<FirebaseCampaign>): Promise<void> {
    try {
      const updateData = {
        ...updates,
        updatedAt: Timestamp.now(),
      };

      if (updates.fechaInicio) {
        updateData.fechaInicio = Timestamp.fromDate(updates.fechaInicio);
      }

      if (updates.fechaFin) {
        updateData.fechaFin = Timestamp.fromDate(updates.fechaFin);
      }

      const campaignRef = doc(db, this.collectionName, campaignId);
      await updateDoc(campaignRef, updateData);
    } catch (error) {
      console.error('Error updating campaign:', error);
      throw error;
    }
  }

  async deleteCampaign(campaignId: string): Promise<void> {
    try {
      const campaignRef = doc(db, this.collectionName, campaignId);
      await deleteDoc(campaignRef);
    } catch (error) {
      console.error('Error deleting campaign:', error);
      throw error;
    }
  }

  async getCampaignsByStatus(status: string, userId?: string): Promise<FirebaseCampaign[]> {
    try {
      let q;
      
      if (userId) {
        q = query(
          collection(db, this.collectionName),
          where('createdBy', '==', userId),
          where('status', '==', status)
        );
      } else {
        q = query(
          collection(db, this.collectionName),
          where('status', '==', status)
        );
      }

      const querySnapshot = await getDocs(q);
      const campaigns: FirebaseCampaign[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        campaigns.push({
          id: doc.id,
          ...data,
          fechaInicio: data.fechaInicio.toDate(),
          fechaFin: data.fechaFin?.toDate() || undefined,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        } as FirebaseCampaign);
      });

      // Sort by createdAt in memory to avoid index requirement
      campaigns.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      return campaigns;
    } catch (error) {
      console.error('Error getting campaigns by status:', error);
      throw error;
    }
  }
}

export const campaignsService = new CampaignsService();
export default campaignsService;