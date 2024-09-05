import { getApiDocs } from "@/lib/swagger";
import ReactSwagger from "./react-swagger";

export default async function IndexPage() {
  const spec = await getApiDocs();
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <header className="w-full bg-blue-600 text-white py-4 shadow-lg">
        <h1 className="text-center text-2xl font-bold">Gas Station Swagger API Example</h1>
      </header>
      <main className="flex flex-col items-center w-full max-w-7xl mt-8 p-4">
        <div className="w-full bg-white rounded-lg shadow-md p-6">
          <ReactSwagger spec={spec} />
        </div>
      </main>
      <footer className="w-full bg-blue-600 text-white py-2 mt-auto">
        <p className="text-center text-sm">© 2024 Gas Station API Documentation</p>
      </footer>
    </div>
  );
}
