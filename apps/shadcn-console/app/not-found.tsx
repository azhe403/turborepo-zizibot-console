// app/404.tsx
import MainLayout from '@zizibot/ui/layouts/main-layout';

export default function NotFoundPage() {
  return (
    <MainLayout>
      <div style={{ textAlign: 'left', padding: '2rem' }}>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
      </div>
    </MainLayout>
  );
}
