"use client";

import { useEffect, useMemo, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// Define the stadium shape returned by the backend API
type Stadium = {
  id: number;
  name: string;
  team: string;
  location: string;
  capacity: number;
  opened: number;
  imageUrl?: string;
};

// API response wrapper type
type StadiumsResponse = {
  stadiums: Stadium[];
};

// Centralize the API base URL with a safe fallback
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function StadiumsPage() {
  // Track loading, error, and data states for robust UX
  const [stadiums, setStadiums] = useState<Stadium[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Memoize the endpoint to avoid re-creating strings across renders
  const endpoint = useMemo(() => `${API_BASE_URL}/api/stadiums`, []);

  useEffect(() => {
    // Use AbortController so the request can be canceled on unmount
    const controller = new AbortController();

    const loadStadiums = async () => {
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
          // Provide a clear error message and status for troubleshooting
          throw new Error(
            `Failed to load stadiums (status ${response.status}).`
          );
        }

        const data: StadiumsResponse = await response.json();
        setStadiums(data.stadiums || []);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        // Surface a user-friendly message while keeping the root cause for logs
        console.error("Error fetching stadiums:", error);
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Something went wrong while loading stadiums."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadStadiums();

    return () => {
      controller.abort();
    };
  }, [endpoint]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          NBA Stadiums
        </h1>
        <p className="text-sm text-muted-foreground">
          Explore NBA arenas and their home teams
        </p>
      </div>

      {isLoading && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={`skeleton-${index}`}>
              <CardHeader>
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-1/2 mt-2" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && errorMessage && (
        <Alert variant="destructive">
          <AlertTitle>Unable to load stadiums</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      {!isLoading && !errorMessage && stadiums.length === 0 && (
        <Alert>
          <AlertTitle>No stadiums found</AlertTitle>
          <AlertDescription>
            The API did not return any stadium data. Please try again later.
          </AlertDescription>
        </Alert>
      )}

      {!isLoading && !errorMessage && stadiums.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {stadiums.map((stadium) => (
            <Card
              key={stadium.id}
              className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-primary cursor-pointer"
            >
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                    {stadium.name}
                  </CardTitle>
                </div>
                <Badge
                  variant="secondary"
                  className="w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  {stadium.team}
                </Badge>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Location and Basic Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b">
                    <span className="text-sm text-muted-foreground">
                      Location
                    </span>
                    <span className="text-sm font-semibold">
                      {stadium.location}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b">
                    <span className="text-sm text-muted-foreground">
                      Capacity
                    </span>
                    <span className="text-sm font-semibold">
                      {stadium.capacity.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Opened
                    </span>
                    <span className="text-sm font-semibold">
                      {stadium.opened}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

