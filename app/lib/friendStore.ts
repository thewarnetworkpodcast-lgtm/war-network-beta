import { createThreadIfNotExists } from "./messageStore";

export type Friend = {
  id: string;
  name: string;
};

export type FriendRequest = {
  id: string;
  name: string;
  status: "pending" | "accepted";
};

const FRIENDS_KEY = "war-friends";
const REQUESTS_KEY = "war-friend-requests";

export function getFriends(): Friend[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(FRIENDS_KEY);
  return data ? (JSON.parse(data) as Friend[]) : [];
}

export function getFriendCount(): number {
  return getFriends().length;
}

export function getFriendRequests(): FriendRequest[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(REQUESTS_KEY);
  return data ? (JSON.parse(data) as FriendRequest[]) : [];
}

export function addFriendRequest(name: string): FriendRequest[] {
  const trimmedName = name.trim();
  if (!trimmedName) return getFriendRequests();

  const requests = getFriendRequests();

  const newRequest: FriendRequest = {
    id: trimmedName.toLowerCase().replace(/\s+/g, "-"),
    name: trimmedName,
    status: "pending",
  };

  const exists = requests.find((r) => r.id === newRequest.id);
  if (exists) return requests;

  const updated = [...requests, newRequest];
  localStorage.setItem(REQUESTS_KEY, JSON.stringify(updated));
  return updated;
}

export function addFriend(name: string): Friend[] {
  const trimmedName = name.trim();
  if (!trimmedName) return getFriends();

  const friends = getFriends();

  const newFriend: Friend = {
    id: trimmedName.toLowerCase().replace(/\s+/g, "-"),
    name: trimmedName,
  };

  const exists = friends.find((f) => f.id === newFriend.id);
  if (exists) return friends;

  const updated = [...friends, newFriend];
  localStorage.setItem(FRIENDS_KEY, JSON.stringify(updated));
  return updated;
}

export function acceptFriendRequest(
  id: string
): { requests: FriendRequest[]; friends: Friend[] } {
  const requests = getFriendRequests();
  const target = requests.find((r) => r.id === id);

  if (!target) {
    return {
      requests,
      friends: getFriends(),
    };
  }

  const updatedRequests: FriendRequest[] = requests.map((r) =>
    r.id === id ? { ...r, status: "accepted" } : r
  );

  localStorage.setItem(REQUESTS_KEY, JSON.stringify(updatedRequests));

  const friends = getFriends();
  const exists = friends.find((f) => f.id === target.id);

  let updatedFriends = friends;

  if (!exists) {
    updatedFriends = [
      ...friends,
      {
        id: target.id,
        name: target.name,
      },
    ];

    localStorage.setItem(FRIENDS_KEY, JSON.stringify(updatedFriends));
  }

  createThreadIfNotExists(target.id);

  return {
    requests: updatedRequests,
    friends: updatedFriends,
  };
}

export function removeFriendRequest(id: string): FriendRequest[] {
  const requests = getFriendRequests().filter((r) => r.id !== id);
  localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
  return requests;
}