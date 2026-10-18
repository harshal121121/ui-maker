
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export interface GeneratedComponent {
  id: string;
  type:
    | "button"
    | "input"
    | "card"
    | "heading"
    | "text"
    | "image"
    | "container";
  properties: Record<string, unknown>;
}

export interface GenerateUIResponse {
  components: GeneratedComponent[];
}

export async function generateUI(
  prompt: string
): Promise<GenerateUIResponse> {
  const response = await fetch(`${API_BASE_URL}/api/generate-ui`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed: ${response.status}`);
  }

  const data: unknown = await response.json();

  if (
    typeof data !== "object" ||
    data === null ||
    !("components" in data) ||
    !Array.isArray(data.components)
  ) {
    throw new Error("The server returned an invalid UI response.");
  }

  return data as GenerateUIResponse;
}
