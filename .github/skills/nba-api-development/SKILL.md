---
name: NBA API Endpoint Development
description: Create new Flask API endpoints and Next.js frontend pages following the NBA app architecture patterns
---

# NBA API Endpoint Development Skill

This skill helps you quickly create new API endpoints in the Flask backend and corresponding Next.js pages in the frontend, following the established patterns in this NBA application.

## When to Use This Skill

Use this skill when you need to:
- Add new REST API endpoints to the Flask backend
- Create new frontend pages that consume backend data
- Ensure consistent error handling and CORS configuration
- Follow the established microservices architecture pattern
- Maintain code quality and consistency across the application

## Prerequisites

- Flask backend running on port 8080
- Next.js frontend running on port 3000
- Understanding of the data structure in `backend/data/` directory
- Basic knowledge of TypeScript and Python

## Architecture Pattern

This application follows a clear separation:

**Backend (Flask)**
- Location: `backend/app.py`
- Data files: `backend/data/*.json`
- API base URL: `http://localhost:8080/api/`
- CORS enabled for localhost:3000

**Frontend (Next.js 14)**
- Location: `frontend/src/app/(dashboard)/`
- Components: `frontend/src/components/`
- Uses environment variable: `NEXT_PUBLIC_API_URL`
- Follows App Router conventions with server/client components

## How to Use

### Creating a New API Endpoint

Ask Copilot:
```
Using the NBA API Endpoint Development skill, create:
1. A new Flask endpoint /api/[resource-name] that returns data from [data-file].json
2. Include proper error handling and CORS
3. Follow the existing pattern in app.py
```

### Creating a Matching Frontend Page

Ask Copilot:
```
Using the NBA API Endpoint Development skill, create:
1. A new Next.js page at /[page-name]
2. Fetch data from the /api/[resource-name] endpoint
3. Display data in cards using shadcn components
4. Include loading states, error handling, and TypeScript types
5. Add a navigation link
```

## Code Patterns to Follow

### Backend Pattern (Flask)
```python
@app.route('/api/resource-name', methods=['GET'])
def get_resource_name():
    """Get resource description"""
    # load_json_file handles file-related errors and returns None on failure
    data = load_json_file('resource.json')
    if data is None:
        return jsonify({'error': 'Failed to load data'}), 500
    
    return jsonify(data), 200
```

### Frontend Pattern (Next.js)
```typescript
"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";

type DataType = {
  id: number;
  // ... other fields
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function PageName() {
  const [data, setData] = useState<DataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/resource-name`, {
          signal: controller.signal,
        });
        
        if (!response.ok) {
          throw new Error(`Failed to load data (status ${response.status})`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
    return () => controller.abort();
  }, []);

  // Return JSX with loading/error states and data display
}
```

## Best Practices

1. **Error Handling**: Always handle both backend and frontend errors gracefully
2. **Loading States**: Show skeleton loaders while data is fetching
3. **Type Safety**: Define TypeScript interfaces for all data structures
4. **Responsive Design**: Use Tailwind CSS grid classes for responsive layouts
5. **Component Reusability**: Extract common UI patterns into separate components
6. **AbortController**: Always use AbortController to cancel requests on unmount
7. **Environment Variables**: Use `NEXT_PUBLIC_API_URL` for API base URL
8. **Comments**: Add clear comments explaining the purpose of each section

## File Locations

- Backend endpoints: `backend/app.py`
- Data files: `backend/data/*.json`
- Frontend pages: `frontend/src/app/(dashboard)/[page-name]/page.tsx`
- Reusable components: `frontend/src/components/[component-name].tsx`
- Navigation: `frontend/src/components/navigation.tsx`

## Common Tasks

### Adding a Navigation Link
Edit `frontend/src/components/navigation.tsx`:
```typescript
import { IconName } from "lucide-react"; // or from react-icons

const routes = [
  // ... existing routes
  {
    label: "New Page",
    href: "/new-page",
    icon: IconName,
    activeIcon: IconName,
  },
];
```

### Creating a Reusable Card Component
Follow the pattern in `frontend/src/components/player-card.tsx`:
- Accept typed props
- Use shadcn UI components (Card, Badge, etc.)
- Include hover effects and transitions
- Make it responsive with Tailwind CSS

## Troubleshooting

**CORS Errors**: Ensure Flask CORS configuration includes `origins=['http://localhost:3000']`

**404 on API**: Verify the Flask server is running on port 8080

**TypeScript Errors**: Make sure all data types match the backend response structure

**Data Not Loading**: Check browser console and Flask logs for error messages

## Example: Complete Feature Implementation

To add a new "Teams" feature:

1. Create `backend/data/teams.json` with team data
2. Add endpoint in `backend/app.py`: `/api/teams`
3. Create page: `frontend/src/app/(dashboard)/teams/page.tsx`
4. Optionally create component: `frontend/src/components/team-card.tsx`
5. Add navigation link in `frontend/src/components/navigation.tsx`
6. Test the complete flow from frontend to backend

This ensures consistency with the existing NBA Scores, Stadiums, and Players features.
