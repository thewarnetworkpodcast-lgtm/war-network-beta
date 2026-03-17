"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AuthPanel() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async () => {
  await supabase.auth.signInWithOtp({
    email: email 
    
  });
};

const signOut = async () => {
  await supabase.auth.signOut();
};

  return (
    <div className="mt-6 text-center text-white">
      {user ? (
        <>
          <p className="mb-2">Logged in as {user.email}</p>
          <button
            onClick={signOut}
            className="bg-red-600 px-4 py-2 rounded"
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 text-black rounded mr-2"
          />
          <button
            onClick={signIn}
            disabled={loading}
            className="bg-yellow-500 px-4 py-2 rounded text-black"
          >
            {loading ? "Sending..." : "Sign In"}
          </button>
          <p className="mt-2">{message}</p>
        </>
      )}
    </div>
  );
}