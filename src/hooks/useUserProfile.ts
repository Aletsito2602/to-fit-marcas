import { useState, useEffect } from 'react';
import { doc, onSnapshot, collection, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';

export interface UserPost {
  id: string;
  id_posts: string;
  id_autor_post: string;
  nombre: string;
  perfil_alias: string;
  info: string;
  logo: string;
  portada: string;
  likes: string[];
  guardados_capsulas: string[];
}

export interface UserStats {
  followers: number;
  following: number;
  posts: number;
  likes: number;
}

export const useUserProfile = () => {
  const { user: authUser, firebaseUser } = useAuth();
  const [userPosts, setUserPosts] = useState<UserPost[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({
    followers: 0,
    following: 0,
    posts: 0,
    likes: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!firebaseUser) {
      setLoading(false);
      return;
    }

    // Cargar posts del usuario
    const postsQuery = query(
      collection(db, 'posts'),
      where('id_autor_post', '==', firebaseUser.uid),
      orderBy('fecha_creado', 'desc'),
      limit(20)
    );

    const unsubscribePosts = onSnapshot(postsQuery,
      (snapshot) => {
        const posts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as UserPost[];
        setUserPosts(posts);
        
        // Calcular estadísticas básicas
        const totalLikes = posts.reduce((sum, post) => sum + (post.likes?.length || 0), 0);
        setUserStats(prev => ({
          ...prev,
          posts: posts.length,
          likes: totalLikes
        }));
        
        setLoading(false);
      },
      (err) => {
        console.error('Error loading user posts:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => {
      unsubscribePosts();
    };
  }, [firebaseUser]);

  const refreshProfile = () => {
    setLoading(true);
    setError(null);
    // La suscripción se reactivará automáticamente
  };

  return {
    user: authUser, // Datos del usuario desde AuthContext con todos los campos de Firebase
    userPosts,
    userStats,
    loading,
    error,
    refreshProfile
  };
};