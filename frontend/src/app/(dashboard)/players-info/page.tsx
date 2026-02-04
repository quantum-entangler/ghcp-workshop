"use client";

import { useEffect, useMemo, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PlayerCard } from "@/components/player-card";

// Define the player shape returned by the backend for stronger typing.
type PlayerInfo = {
  id: number;
  name: string;
  team: string;
  weight: string;
  height: string;
  position: string;
  stats?: {
    pointsPerGame: number;
    assistsPerGame: number;
    reboundsPerGame: number;
  };
};

// Centralize the API base URL with a safe fallback.
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function PlayersInfoPage() {
  // Track loading, error, and data states for robust UX.
  const [players, setPlayers] = useState<PlayerInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Memoize the endpoint to avoid re-creating strings across renders.
  const endpoint = useMemo(
    () => `${API_BASE_URL}/api/player-info`,
    []
  );

  useEffect(() => {
    // Use AbortController so the request can be canceled on unmount.
    const controller = new AbortController();

    const loadPlayers = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const response = await fetch(endpoint, {
          method: "GET",
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          // Provide a clear error message and status for troubleshooting.
          throw new Error(
            `Failed to load players (status ${response.status}).`
          );
        }

        const data: PlayerInfo[] = await response.json();
        setPlayers(data);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        // Surface a user-friendly message while keeping the root cause for logs.
        console.error("Error fetching player info:", error);
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Something went wrong while loading players."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadPlayers();

    return () => {
      controller.abort();
    };
  }, [endpoint]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Player Information
        </h1>
        <p className="text-sm text-muted-foreground">
          Browse NBA player details powered by the backend API.
        </p>
      </div>

      {isLoading && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={`skeleton-${index}`}>
              <CardHeader>
                <Skeleton className="h-6 w-2/3" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && errorMessage && (
        <Alert variant="destructive">
          <AlertTitle>Unable to load players</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      {!isLoading && !errorMessage && players.length === 0 && (
        <Alert>
          <AlertTitle>No players found</AlertTitle>
          <AlertDescription>
            The API did not return any player data. Please try again later.
          </AlertDescription>
        </Alert>
      )}

      {!isLoading && !errorMessage && players.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {players.map((player) => (
            <PlayerCard key={player.id} {...player} />
          ))}
        </div>
      )}
    </div>
  );
}