"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "final-boss-favorites";

function readFavorites(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    setFavorites(readFavorites());
  }, []);

  const toggle = useCallback((slug: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (slug: string) => favorites.has(slug),
    [favorites]
  );

  return { favorites, toggle, isFavorite };
}
