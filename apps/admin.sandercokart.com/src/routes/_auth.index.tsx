import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/')({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <main className="grid grow place-items-center">
      <h1 className="text-center text-3xl sm:text-5xl lg:text-7xl 2xl:text-9xl">
        sandercokart.com <small className="cap block">Admin Panel</small>
      </h1>
    </main>
  );
}
