import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import BackgroundPattern from '../../components/BackgroundPattern';
import BottomTabBar from '../../components/BottomTabBar';

const InvoicesScreen: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Todas');
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const filters = ['Todas', 'Pendientes', 'Pagadas', 'Vencidas'];
  
  const invoices = [
    {
      id: 'FAC-2025-001',
      customer: 'Arthuro Lopez',
      amount: 299980,
      date: '2025-01-15',
      status: 'paid',
      dueDate: '2025-01-30',
    },
    {
      id: 'FAC-2025-002',
      customer: 'María González',
      amount: 156500,
      date: '2025-01-14',
      status: 'pending',
      dueDate: '2025-01-29',
    },
    {
      id: 'FAC-2025-003',
      customer: 'Carlos Ruiz',
      amount: 89990,
      date: '2025-01-10',
      status: 'overdue',
      dueDate: '2025-01-25',
    },
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'paid':
        return { text: 'Pagada', color: '#4ADE80', bg: 'rgba(74, 222, 128, 0.1)' };
      case 'pending':
        return { text: 'Pendiente', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' };
      case 'overdue':
        return { text: 'Vencida', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' };
      default:
        return { text: 'Desconocido', color: '#6B7280', bg: 'rgba(107, 114, 128, 0.1)' };
    }
  };

  const getFilterCount = (filter: string) => {
    if (filter === 'Todas') return invoices.length;
    if (filter === 'Pendientes') return invoices.filter(inv => inv.status === 'pending').length;
    if (filter === 'Pagadas') return invoices.filter(inv => inv.status === 'paid').length;
    if (filter === 'Vencidas') return invoices.filter(inv => inv.status === 'overdue').length;
    return 0;
  };

  const getTotalFacturado = () => {
    return invoices
      .filter(inv => inv.status === 'paid')
      .reduce((total, inv) => total + inv.amount, 0);
  };

  const getTotalPendiente = () => {
    return invoices
      .filter(inv => inv.status === 'pending' || inv.status === 'overdue')
      .reduce((total, inv) => total + inv.amount, 0);
  };

  const renderFilterButton = (filter: string) => {
    const count = getFilterCount(filter);
    
    return (
      <TouchableOpacity
        key={filter}
        style={[
          styles.filterButton,
          activeFilter === filter && styles.activeFilterButton
        ]}
        onPress={() => setActiveFilter(filter)}
      >
        <Text
          style={[
            styles.filterText,
            activeFilter === filter && styles.activeFilterText
          ]}
        >
          {filter} ({count})
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundPattern opacity={0.06} />
      <Header />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Facturas</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => Alert.alert('Nueva Factura', 'Abriendo formulario para crear nueva factura...')}
          >
            <Ionicons name="add" size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Nueva</Text>
          </TouchableOpacity>
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>${getTotalFacturado().toLocaleString('es-AR')}</Text>
            <Text style={styles.summaryLabel}>Facturado este mes</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>${getTotalPendiente().toLocaleString('es-AR')}</Text>
            <Text style={styles.summaryLabel}>Pendiente de cobro</Text>
          </View>
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {filters.map(renderFilterButton)}
        </ScrollView>

        {/* Invoices List */}
        <View style={styles.invoicesContainer}>
          {(() => {
            const filteredInvoices = invoices.filter((invoice) => {
              if (activeFilter === 'Todas') return true;
              if (activeFilter === 'Pendientes') return invoice.status === 'pending';
              if (activeFilter === 'Pagadas') return invoice.status === 'paid';
              if (activeFilter === 'Vencidas') return invoice.status === 'overdue';
              return true;
            });

            if (filteredInvoices.length === 0) {
              return (
                <View style={styles.emptyState}>
                  <Ionicons name="document-text-outline" size={48} color="#A0A0A0" />
                  <Text style={styles.emptyStateText}>
                    No hay facturas {activeFilter.toLowerCase()}
                  </Text>
                </View>
              );
            }

            return filteredInvoices.map((invoice) => {
              const statusInfo = getStatusInfo(invoice.status);
              
              return (
              <TouchableOpacity 
                key={invoice.id} 
                style={styles.invoiceCard}
                onPress={() => {
                  setSelectedInvoice(invoice);
                  setShowInvoiceModal(true);
                }}
              >
                <View style={styles.invoiceHeader}>
                  <View style={styles.invoiceInfo}>
                    <Text style={styles.invoiceId}>{invoice.id}</Text>
                    <Text style={styles.customerName}>{invoice.customer}</Text>
                  </View>
                  
                  <View style={styles.invoiceAmount}>
                    <Text style={styles.amountText}>${invoice.amount.toLocaleString('es-AR')}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: statusInfo.bg }]}>
                      <Text style={[styles.statusText, { color: statusInfo.color }]}>
                        {statusInfo.text}
                      </Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.invoiceFooter}>
                  <View style={styles.dateInfo}>
                    <Text style={styles.dateLabel}>Fecha: {invoice.date}</Text>
                    <Text style={styles.dateLabel}>Vence: {invoice.dueDate}</Text>
                  </View>
                  
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="document-text-outline" size={16} color="#007AFF" />
                    <Text style={styles.actionText}>Ver PDF</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              );
            });
          })()}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Acciones rápidas</Text>
          
          <TouchableOpacity style={styles.quickActionButton}>
            <Ionicons name="download-outline" size={20} color="#FFFFFF" />
            <Text style={styles.quickActionText}>Exportar facturas</Text>
            <Ionicons name="chevron-forward" size={16} color="#A0A0A0" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickActionButton}>
            <Ionicons name="settings-outline" size={20} color="#FFFFFF" />
            <Text style={styles.quickActionText}>Configurar facturación</Text>
            <Ionicons name="chevron-forward" size={16} color="#A0A0A0" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      {/* Invoice Detail Modal */}
      <Modal
        visible={showInvoiceModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowInvoiceModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowInvoiceModal(false)}
            >
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Detalle de Factura</Text>
            <View style={styles.modalCloseButton} />
          </View>
          
          {selectedInvoice && (
            <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
              <View style={styles.invoiceDetailHeader}>
                <Text style={styles.invoiceDetailId}>{selectedInvoice.id}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusInfo(selectedInvoice.status).bg }]}>
                  <Text style={[styles.statusText, { color: getStatusInfo(selectedInvoice.status).color }]}>
                    {getStatusInfo(selectedInvoice.status).text}
                  </Text>
                </View>
              </View>
              
              <View style={styles.invoiceDetailSection}>
                <Text style={styles.sectionTitle}>Información del Cliente</Text>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Cliente:</Text>
                  <Text style={styles.detailValue}>{selectedInvoice.customer}</Text>
                </View>
              </View>
              
              <View style={styles.invoiceDetailSection}>
                <Text style={styles.sectionTitle}>Detalles de Facturación</Text>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Fecha de emisión:</Text>
                  <Text style={styles.detailValue}>{selectedInvoice.date}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Fecha de vencimiento:</Text>
                  <Text style={styles.detailValue}>{selectedInvoice.dueDate}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Monto total:</Text>
                  <Text style={styles.detailValueAmount}>${selectedInvoice.amount.toLocaleString('es-AR')}</Text>
                </View>
              </View>
              
              <View style={styles.invoiceDetailSection}>
                <Text style={styles.sectionTitle}>Productos/Servicios</Text>
                <View style={styles.productItem}>
                  <Text style={styles.productName}>Consultoría de Marketing Digital</Text>
                  <Text style={styles.productDetails}>Cantidad: 1 | Precio: ${selectedInvoice.amount.toLocaleString('es-AR')}</Text>
                </View>
              </View>
              
              <View style={styles.modalActions}>
                <TouchableOpacity 
                  style={styles.modalActionButton}
                  onPress={() => {
                    setShowInvoiceModal(false);
                    Alert.alert('Descargar PDF', `Descargando factura ${selectedInvoice.id}.pdf`);
                  }}
                >
                  <Ionicons name="download-outline" size={20} color="#FFFFFF" />
                  <Text style={styles.modalActionText}>Descargar PDF</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.modalActionButton}
                  onPress={() => {
                    setShowInvoiceModal(false);
                    Alert.alert('Compartir', `Compartiendo factura ${selectedInvoice.id}`);
                  }}
                >
                  <Ionicons name="share-outline" size={20} color="#FFFFFF" />
                  <Text style={styles.modalActionText}>Compartir</Text>
                </TouchableOpacity>
                
                {selectedInvoice.status === 'pending' && (
                  <TouchableOpacity 
                    style={[styles.modalActionButton, styles.primaryButton]}
                    onPress={() => {
                      setShowInvoiceModal(false);
                      Alert.alert('Factura Pagada', `Factura ${selectedInvoice.id} marcada como pagada`);
                    }}
                  >
                    <Ionicons name="card-outline" size={20} color="#FFFFFF" />
                    <Text style={[styles.modalActionText, styles.primaryButtonText]}>Marcar como Pagada</Text>
                  </TouchableOpacity>
                )}
                
                <TouchableOpacity 
                  style={styles.modalActionButton}
                  onPress={() => {
                    setShowInvoiceModal(false);
                    Alert.alert('Enviar por Email', `Enviando factura ${selectedInvoice.id} por email`);
                  }}
                >
                  <Ionicons name="mail-outline" size={20} color="#FFFFFF" />
                  <Text style={styles.modalActionText}>Enviar por Email</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </SafeAreaView>
      </Modal>
      
      <BottomTabBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(41, 41, 41, 1)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 55,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  summaryContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  summaryValue: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },
  filtersContainer: {
    marginBottom: 20,
  },
  filtersContent: {
    gap: 10,
  },
  filterButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#A0A0A0',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  activeFilterButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  filterText: {
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    fontSize: 14,
  },
  activeFilterText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#000000',
  },
  invoicesContainer: {
    marginBottom: 30,
  },
  invoiceCard: {
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  invoiceInfo: {
    flex: 1,
  },
  invoiceId: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  customerName: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },
  invoiceAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
  },
  invoiceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateInfo: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    marginBottom: 2,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  actionText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#007AFF',
    marginLeft: 4,
  },
  quickActions: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333333',
  },
  quickActionText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    marginLeft: 15,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    marginTop: 12,
    textAlign: 'center',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(41, 41, 41, 1)',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  modalCloseButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  invoiceDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    marginBottom: 20,
  },
  invoiceDetailId: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  invoiceDetailSection: {
    marginBottom: 25,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },
  detailValue: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
  },
  detailValueAmount: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#4ADE80',
  },
  productItem: {
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#333333',
  },
  productName: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  productDetails: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },
  modalActions: {
    paddingVertical: 20,
    gap: 12,
  },
  modalActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  modalActionText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    marginLeft: 10,
  },
  primaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: '#FFFFFF',
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
});

export default InvoicesScreen;