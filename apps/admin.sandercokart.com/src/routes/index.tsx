import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="grid gap-2 p-2">
      <h1 className="text-xl">Welcome!</h1>
      <p className="bg-slate-100 px-2 py-4 italic">
        <strong className="text-red-500">IMPORTANT!!!</strong> This is just an example of how to use authenticated
        routes with TanStack Router.
        <br />
        This is NOT an example how you'd write a production-level authentication system.
        <br />
        You'll need to take the concepts and patterns used in this example and adapt then to work with your
        authentication flow/system for your app.
      </p>
      <p>
        You are currently on the index route of the <strong>authenticated-routes</strong> example.
      </p>
      <p>You can try going through these options.</p>
      <ol className="list-inside list-disc px-2">
        <li>
          <Link className="text-blue-500" to="/login">
            Go to the public login page.
          </Link>
        </li>
        <li>
          <Link className="text-blue-500" to="/dashboard">
            Go to the auth-only dashboard page.
          </Link>
        </li>
      </ol>
    </div>
  );
}
