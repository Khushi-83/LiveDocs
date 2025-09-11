export function getSignalingUrl(): string {
  const env = (import.meta as unknown as { env?: Record<string, string | boolean> }).env || {};
  const sameOrigin = (window.location.protocol === 'https:' ? 'wss://' : 'ws://') + window.location.host;
  const devDefault = (window.location.protocol === 'https:' ? 'wss://' : 'ws://') + 'localhost:3000';
  const isDev = Boolean((env as unknown as { DEV?: boolean }).DEV);
  const explicit = (env as unknown as { VITE_WS_URL?: string }).VITE_WS_URL;
  return explicit || (isDev ? devDefault : sameOrigin);
}

export function createSignalingSocket(overrideUrl?: string): WebSocket {
  const url = overrideUrl || getSignalingUrl();
  return new WebSocket(url);
}


