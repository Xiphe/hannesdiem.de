import ErrorLayout from "./(common)/components/ErrorLayout";

export default function NotFound() {
  return (
    <ErrorLayout>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, we couldn’t find the page you’re looking for.</p>
      <a href="/">Go back to the homepage</a>
    </ErrorLayout>
  );
}
