import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProductsStackParamList } from '../types';

// Importar las pantallas de productos
import ProductsListScreen from '../screens/products/ProductsListScreen';
import ProductDetailScreen from '../screens/products/ProductDetailScreen';
import AddEditProductScreen from '../screens/products/AddEditProductScreen';
import AddVariantsScreen from '../screens/products/AddVariantsScreen';

const Stack = createStackNavigator<ProductsStackParamList>();

const ProductsNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#363636' },
      }}
      initialRouteName="ProductsList"
    >
      <Stack.Screen 
        name="ProductsList" 
        component={ProductsListScreen}
        options={{ title: 'Productos' }}
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen}
        options={{ title: 'Detalle del Producto' }}
      />
      <Stack.Screen 
        name="AddEditProduct" 
        component={AddEditProductScreen}
        options={{ title: 'Añadir/Editar Producto' }}
      />
      <Stack.Screen 
        name="AddVariants" 
        component={AddVariantsScreen}
        options={{ title: 'Añadir Variantes' }}
      />
    </Stack.Navigator>
  );
};

export default ProductsNavigator;