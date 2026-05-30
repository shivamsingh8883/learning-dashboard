throw new Error("TEST ERROR");
import { HomeClient } from "@/components/HomeClient";

export const dynamic = "force-dynamic";

export default async function Home() {
  const currentTime = new Date().toISOString();

  console.log("CURRENT TIME:", currentTime);

  return (
    <div
      style={{
        padding: "40px",
        color: "white",
        background: "black",
        minHeight: "100vh",
      }}
    >
      <h1>Dynamic Test</h1>
      <p>{currentTime}</p>
    </div>
  );
}
