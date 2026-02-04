"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function LoginForm() {
  // Track form state for username and password inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Handle form submission with basic validation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Basic client-side validation
    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      console.log("Login attempted with:", { username, password, rememberMe });
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="space-y-2 pb-6">
          <CardTitle className="text-2xl font-semibold">
            NBA App Login
          </CardTitle>
          <CardDescription>
            Access your NBA stats and scores
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Input Field */}
            <div className="space-y-2">
              <Label htmlFor="username">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                className="transition-all"
              />
            </div>

            {/* Password Input Field */}
            <div className="space-y-2">
              <Label htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="transition-all"
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
                className="w-4 h-4 rounded border-input focus:ring-2 focus:ring-ring cursor-pointer accent-primary"
              />
              <Label
                htmlFor="remember"
                className="cursor-pointer"
              >
                Remember me
              </Label>
            </div>

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Success Alert */}
            {success && (
              <Alert className="bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 border-green-200 dark:border-green-700">
                <AlertDescription>
                  Login successful! Redirecting...
                </AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Login"}
            </Button>

            {/* Forgot Password Link */}
            <div className="text-center pt-2">
              <button
                type="button"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
                onClick={() => console.log("Forgot password clicked")}
              >
                Forgot password?
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
