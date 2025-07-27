import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainNavigator from './MainNavigator';
import DrawerMenu from '../components/DrawerMenu';

// Import all screens
import CampaignsScreen from '../screens/campaigns/CampaignsScreen';
import AddCampaignScreen from '../screens/campaigns/AddCampaignScreen';
import SelectProductsScreen from '../screens/campaigns/SelectProductsScreen';
import StoreScreen from '../screens/store/StoreScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import CollectionsScreen from '../screens/collections/CollectionsScreen';
import InvoicesScreen from '../screens/invoices/InvoicesScreen';
import ReportsScreen from '../screens/reports/ReportsScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import SupportScreen from '../screens/support/SupportScreen';
import InventoryScreen from '../screens/main/InventoryScreen';

export type DrawerParamList = {
  MainTabs: undefined;
  Profile: undefined;
  Store: undefined;
  Products: undefined;
  Inventory: undefined;
  Collections: undefined;
  Campaigns: undefined;
  AddCampaign: undefined;
  SelectProducts: undefined;
  Invoices: undefined;
  Reports: undefined;
  Support: undefined;
  Settings: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerMenu {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: 280,
        },
        swipeEnabled: true,
        swipeEdgeWidth: 50,
      }}
    >
      <Drawer.Screen 
        name="MainTabs" 
        component={MainNavigator}
        options={{
          drawerItemStyle: { display: 'none' }
        }}
      />
      
      {/* Additional Screens */}
      <Drawer.Screen 
        name="Campaigns" 
        component={CampaignsScreen}
        options={{
          drawerItemStyle: { display: 'none' }
        }}
      />
      
      <Drawer.Screen 
        name="AddCampaign" 
        component={AddCampaignScreen}
        options={{
          drawerItemStyle: { display: 'none' }
        }}
      />
      
      <Drawer.Screen 
        name="SelectProducts" 
        component={SelectProductsScreen}
        options={{
          drawerItemStyle: { display: 'none' }
        }}
      />
      
      
      <Drawer.Screen 
        name="Store" 
        component={StoreScreen}
        options={{
          drawerItemStyle: { display: 'none' }
        }}
      />
      
      <Drawer.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          drawerItemStyle: { display: 'none' }
        }}
      />
      
      <Drawer.Screen 
        name="Collections" 
        component={CollectionsScreen}
        options={{
          drawerItemStyle: { display: 'none' }
        }}
      />
      
      <Drawer.Screen 
        name="Invoices" 
        component={InvoicesScreen}
        options={{
          drawerItemStyle: { display: 'none' }
        }}
      />
      
      <Drawer.Screen 
        name="Reports" 
        component={ReportsScreen}
        options={{
          drawerItemStyle: { display: 'none' }
        }}
      />
      
      <Drawer.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          drawerItemStyle: { display: 'none' }
        }}
      />
      
      <Drawer.Screen 
        name="Support" 
        component={SupportScreen}
        options={{
          drawerItemStyle: { display: 'none' }
        }}
      />
      
      <Drawer.Screen 
        name="Inventory" 
        component={InventoryScreen}
        options={{
          drawerItemStyle: { display: 'none' }
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;