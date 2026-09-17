import App from '@/components/App';
import { getSiteContent } from '@/lib/content';

// Statically rendered; Payload hooks call revalidatePath('/') on every content change.
export default async function Page() {
  const content = await getSiteContent();
  return <App content={content} />;
}
