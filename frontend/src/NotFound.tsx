import { Link } from "@tanstack/react-router";
import { Button } from "./components/ui/button";

const NotFound = () => {
  return (
    <main>
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p>Please check the URL or return to the homepage.</p>
      <Link to="/">
        <Button className="bg-blue-500 text-white px-4 py-2 rounded">
          Go to Homepage
        </Button>
      </Link>
    </main>
  );
};

export default NotFound;
