import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OrdersStackParamList } from '../types';

// Importar las pantallas de pedidos
import OrdersListScreen from '../screens/orders/OrdersListScreen';
import OrderDetailScreen from '../screens/orders/OrderDetailScreen';
import AddEditOrderScreen from '../screens/orders/AddEditOrderScreen';
import SelectProductsScreen from '../screens/orders/SelectProductsScreen';

const Stack = createStackNavigator<OrdersStackParamList>();

const OrdersNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#363636' },
      }}
      initialRouteName="OrdersList"
    >
      <Stack.Screen 
        name="OrdersList" 
        component={OrdersListScreen}
        options={{ title: 'Pedidos' }}
      />
      <Stack.Screen 
        name="OrderDetail" 
        component={OrderDetailScreen}
        options={{ title: 'Detalle del Pedido' }}
      />
      <Stack.Screen 
        name="AddEditOrder" 
        component={AddEditOrderScreen}
        options={{ title: 'Añadir/Editar Pedido' }}
      />
      <Stack.Screen 
        name="SelectProducts" 
        component={SelectProductsScreen}
        options={{ title: 'Seleccionar Productos' }}
      />
    </Stack.Navigator>
  );
};

export default OrdersNavigator;