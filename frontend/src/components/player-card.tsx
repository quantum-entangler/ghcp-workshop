import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Define the player type with all necessary fields including statistics
type PlayerCardProps = {
  id: number;
  name: string;
  team: string;
  position: string;
  height: string;
  weight: string;
  stats?: {
    pointsPerGame: number;
    assistsPerGame: number;
    reboundsPerGame: number;
  };
};

export function PlayerCard({ 
  name, 
  team, 
  position, 
  height, 
  weight, 
  stats 
}: PlayerCardProps) {
  return (
    <Card 
      className="group transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-primary cursor-pointer"
    >
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
            {name}
          </CardTitle>
          <Badge variant="secondary" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            {position}
          </Badge>
        </div>
        <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
          {team}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Physical Stats Section */}
        <div className="grid grid-cols-2 gap-3 pb-3 border-b">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Height</p>
            <p className="text-sm font-semibold">{height}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Weight</p>
            <p className="text-sm font-semibold">{weight}</p>
          </div>
        </div>

        {/* Performance Stats Section - Only show if stats exist */}
        {stats && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Season Stats
            </p>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-muted/50 rounded-lg p-2 text-center group-hover:bg-primary/10 transition-colors">
                <p className="text-lg font-bold text-primary">{stats.pointsPerGame}</p>
                <p className="text-xs text-muted-foreground">PPG</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-2 text-center group-hover:bg-primary/10 transition-colors">
                <p className="text-lg font-bold text-primary">{stats.assistsPerGame}</p>
                <p className="text-xs text-muted-foreground">APG</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-2 text-center group-hover:bg-primary/10 transition-colors">
                <p className="text-lg font-bold text-primary">{stats.reboundsPerGame}</p>
                <p className="text-xs text-muted-foreground">RPG</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
