interface ClientCardProps {
  client: {
    name: string;
    email: string;
    phone: string;
    contractStatus: 'active' | 'expiring' | 'draft';
    expiryDate: string;
    service: string;
    lastCheck?: string;
    oneflowStatus?: string;
  };
}

export const ClientCard = ({ client }: ClientCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'border-green-500 bg-green-50';
      case 'expiring': return 'border-red-500 bg-red-50';
      case 'draft': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-300 bg-white';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expiring': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`rounded-lg p-6 shadow-md border-l-4 ${getStatusColor(client.contractStatus)}`}>
      <h3 className="text-lg font-bold text-gray-900 mb-3">{client.name}</h3>
      
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <span className="mr-2">📧</span>
          <span>{client.email}</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">📞</span>
          <span>{client.phone}</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">📄</span>
          <span>Contract: </span>
          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold uppercase ${getStatusBadge(client.contractStatus)}`}>
            {client.contractStatus === 'expiring' ? 'Expiring Soon' : client.contractStatus}
          </span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">🗓️</span>
          <span>{client.contractStatus === 'draft' ? 'Pending Signature' : `Expires: ${client.expiryDate}`}</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">🔍</span>
          <span>Service: {client.service}</span>
        </div>
        {client.lastCheck && (
          <div className="flex items-center">
            <span className="mr-2">{client.contractStatus === 'expiring' ? '⚠️' : '✅'}</span>
            <span>{client.lastCheck}</span>
          </div>
        )}
        {client.oneflowStatus && (
          <div className="flex items-center">
            <span className="mr-2">📋</span>
            <span>OneFlow Status: {client.oneflowStatus}</span>
          </div>
        )}
      </div>
    </div>
  );
};