import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    socket = io('http://localhost:5000', {
      autoConnect: false,
    });
  }
  return socket;
};

export const connectSocket = (token: string) => {
  const s = getSocket();
  s.auth = { token };
  if (!s.connected) {
    s.connect();
  }
};

export const disconnectSocket = () => {
  if (socket?.connected) {
    socket.disconnect();
  }
};
