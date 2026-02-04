"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Add router import

const ErrorPageFixing = () => {
  const router = useRouter(); // Initialize router
  const [playerName, setPlayerName] = useState("");
  const [playerPosition, setPlayerPosition] = useState("");
  const [playerTeam, setPlayerTeam] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [ppg, setPpg] = useState("");
  const [apg, setApg] = useState("");
  const [rpg, setRpg] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      // Use backend API URL
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
      const response = await fetch(`${apiUrl}/api/players`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: playerName,
          position: playerPosition,
          team: playerTeam,
          height: height,
          weight: weight,
          stats: {
            pointsPerGame: parseFloat(ppg) || 0,
            assistsPerGame: parseFloat(apg) || 0,
            reboundsPerGame: parseFloat(rpg) || 0,
          }
        }),
      });

      if (!response.ok) {
        if (response.status === 404) {
          setErrorMessage(`Error ${response.status}: API endpoint not found. The /api/players route does not exist.`);
        } else {
          setErrorMessage(`Error ${response.status}: Failed to create player`);
        }
      } else {
        console.log("Player created successfully");
        // Reset form after successful creation
        setPlayerName("");
        setPlayerPosition("");
        setPlayerTeam("");
        setHeight("");
        setWeight("");
        setPpg("");
        setApg("");
        setRpg("");
        setErrorMessage("Player created successfully!");
      }
    } catch (error) {
      setErrorMessage("Network error: Failed to connect to the server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New NBA Player</CardTitle>
        <CardDescription>Add a new player with complete stats and information</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter player name"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="position" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Position:
            </label>
            <input
              type="text"
              id="position"
              value={playerPosition}
              onChange={(e) => setPlayerPosition(e.target.value)}
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="e.g., Point Guard, Center"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="team" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Team:
            </label>
            <input
              type="text"
              id="team"
              value={playerTeam}
              onChange={(e) => setPlayerTeam(e.target.value)}
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter team name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="height" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Height:
              </label>
              <input
                type="text"
                id="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="e.g., 6'7&quot;"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="weight" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Weight:
              </label>
              <input
                type="text"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="e.g., 250 lbs"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium leading-none">Statistics (Per Game)</label>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label htmlFor="ppg" className="text-xs text-muted-foreground">PPG</label>
                <input
                  type="number"
                  id="ppg"
                  value={ppg}
                  onChange={(e) => setPpg(e.target.value)}
                  step="0.1"
                  min="0"
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="0.0"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="apg" className="text-xs text-muted-foreground">APG</label>
                <input
                  type="number"
                  id="apg"
                  value={apg}
                  onChange={(e) => setApg(e.target.value)}
                  step="0.1"
                  min="0"
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="0.0"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="rpg" className="text-xs text-muted-foreground">RPG</label>
                <input
                  type="number"
                  id="rpg"
                  value={rpg}
                  onChange={(e) => setRpg(e.target.value)}
                  step="0.1"
                  min="0"
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="0.0"
                />
              </div>
            </div>
          </div>

          {errorMessage && (
            <div className={`p-3 rounded-md ${errorMessage.includes('successfully') 
              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border border-green-300 dark:border-green-600' 
              : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border border-red-300 dark:border-red-600'}`}>
              {errorMessage}
            </div>
          )}
          <button 
            type="submit"
            disabled={isLoading}
            className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 ${
              isLoading 
                ? 'bg-primary/50 cursor-not-allowed' 
                : 'bg-primary text-primary-foreground shadow hover:bg-primary/90'
            }`}>
            {isLoading ? 'Creating...' : 'Create Player'}
          </button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <p>Fill out the form to add a new NBA player.</p>
      </CardFooter>
    </Card>
  );
};

export default ErrorPageFixing;
