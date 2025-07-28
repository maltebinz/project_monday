import { ChatContainer } from '../components/Chat/ChatContainer';

export const ChatPage = () => {
  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">AI Chat Assistant</h1>
        <p className="text-gray-600 mt-1">Get intelligent assistance with your OneFlow client management tasks • Powered by Google Gemini</p>
      </div>
      <div className="flex-1 overflow-hidden">
        <ChatContainer />
      </div>
    </div>
  );
};