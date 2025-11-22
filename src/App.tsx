import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { ForgotPasswordPage } from './components/ForgotPasswordPage';
import { DashboardPage } from './components/DashboardPage';
import { StockPage } from './components/StockPage';
import { MoveHistoryPage } from './components/MoveHistoryPage';
import { OperationsPage } from './components/OperationsPage';
import { SettingsPage } from './components/SettingsPage';
import { WarehousePage } from './components/WarehousePage';
import { LocationPage } from './components/LocationPage';
import { ReceiptsListView } from './components/ReceiptsListView';
import { ReceiptDetailsView } from './components/ReceiptDetailsView';
import { DeliveryListView } from './components/DeliveryListView';
import { DeliveryDetailsView } from './components/DeliveryDetailsView';
import { StockLedgerPage } from './components/StockLedgerPage';

type Page = 'login' | 'signup' | 'forgot-password' | 'dashboard' | 'operations' | 'stock' | 'move-history' | 'settings' | 'warehouse' | 'location' | 'receipts' | 'receipts-details' | 'delivery' | 'delivery-details' | 'stock-ledger';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedReceiptId, setSelectedReceiptId] = useState<string | null>(null);
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<string | null>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleSelectReceipt = (receiptId: string) => {
    setSelectedReceiptId(receiptId);
    setCurrentPage('receipts-details');
  };

  const handleSelectDelivery = (deliveryId: string) => {
    setSelectedDeliveryId(deliveryId);
    setCurrentPage('delivery-details');
  };

  const handleBackToReceipts = () => {
    setCurrentPage('receipts');
    setSelectedReceiptId(null);
  };

  const handleBackToDeliveries = () => {
    setCurrentPage('delivery');
    setSelectedDeliveryId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {!isLoggedIn && (
        <div className="flex items-center justify-center min-h-screen p-8">
          {currentPage === 'login' && <LoginPage onNavigate={setCurrentPage} onLogin={handleLogin} />}
          {currentPage === 'signup' && <SignUpPage onNavigate={setCurrentPage} />}
          {currentPage === 'forgot-password' && <ForgotPasswordPage onNavigate={setCurrentPage} />}
        </div>
      )}
      
      {isLoggedIn && currentPage === 'dashboard' && <DashboardPage onNavigate={setCurrentPage} />}
      {isLoggedIn && currentPage === 'operations' && <OperationsPage onNavigate={setCurrentPage} />}
      {isLoggedIn && currentPage === 'stock' && <StockPage onNavigate={setCurrentPage} />}
      {isLoggedIn && currentPage === 'move-history' && <MoveHistoryPage onNavigate={setCurrentPage} />}
      {isLoggedIn && currentPage === 'settings' && <SettingsPage onNavigate={setCurrentPage} />}
      {isLoggedIn && currentPage === 'warehouse' && <WarehousePage onNavigate={setCurrentPage} />}
      {isLoggedIn && currentPage === 'location' && <LocationPage onNavigate={setCurrentPage} />}
      {isLoggedIn && currentPage === 'receipts' && (
        <ReceiptsListView onNavigate={setCurrentPage} onSelectReceipt={handleSelectReceipt} />
      )}
      {isLoggedIn && currentPage === 'receipts-details' && selectedReceiptId && (
        <ReceiptDetailsView receiptId={selectedReceiptId} onNavigate={setCurrentPage} onBack={handleBackToReceipts} />
      )}
      {isLoggedIn && currentPage === 'delivery' && (
        <DeliveryListView onNavigate={setCurrentPage} onSelectDelivery={handleSelectDelivery} />
      )}
      {isLoggedIn && currentPage === 'delivery-details' && selectedDeliveryId && (
        <DeliveryDetailsView deliveryId={selectedDeliveryId} onNavigate={setCurrentPage} onBack={handleBackToDeliveries} />
      )}
      {isLoggedIn && currentPage === 'stock-ledger' && <StockLedgerPage onNavigate={setCurrentPage} />}
    </div>
  );
}