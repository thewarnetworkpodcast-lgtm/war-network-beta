export type Message = {
  id: string;
  text: string;
  sender: string;
  createdAt: string;
};

const THREAD_KEY = "war-threads";

function getThreads(): Record<string, Message[]> {
  if (typeof window === "undefined") return {};
  const data = localStorage.getItem(THREAD_KEY);
  return data ? JSON.parse(data) : {};
}

function saveThreads(threads: Record<string, Message[]>) {
  localStorage.setItem(THREAD_KEY, JSON.stringify(threads));
}

export function getThread(id: string): Message[] {
  const threads = getThreads();
  return threads[id] || [];
}

export function createThreadIfNotExists(id: string) {
  const threads = getThreads();

  if (!threads[id]) {
    threads[id] = [
      {
        id: "welcome",
        text: "Welcome Home.",
        sender: "system",
        createdAt: new Date().toISOString(),
      },
    ];
  }

  saveThreads(threads);
}

export function sendMessage(id: string, text: string, sender: string) {
  const threads = getThreads();

  if (!threads[id]) {
    threads[id] = [];
  }

  threads[id].push({
    id: Date.now().toString(),
    text,
    sender,
    createdAt: new Date().toISOString(),
  });

  saveThreads(threads);
}