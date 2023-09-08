import { useState, useEffect } from 'react';
import { AppwriteException } from 'appwrite';
import { useLocation } from 'wouter';

import { LiveBeatEvent } from '@/types/events';

import Layout from '@/components/Layout';
import Container from '@/components/Container';
import Button from '@/components/Button';

import { getEventById, deleteEventById } from '@/lib/events';
import { getPreviewImageById } from '@/lib/storage';
import { useAuth } from '@/hooks/use-auth';

function Event({ params }: { params: { eventId: string }}) {
  const [, navigate] = useLocation();
  const [event, setEvent] = useState<LiveBeatEvent | undefined>();
  const { isAdmin } = useAuth();

  const imageUrl = event?.imageFileId && getPreviewImageById(event.imageFileId)

  const image = {
    url: imageUrl,
    alt: '',
    height: event?.imageHeight,
    width: event?.imageWidth,
  };

  useEffect(() => {
    (async function run() {
      try {
        const { event } = await getEventById(params.eventId);
        setEvent(event);
      } catch(error: unknown) {
        if ( error instanceof AppwriteException ) {
          navigate(`${window.location.pathname}?error=${error.type}`)
        } else {
          navigate(`${window.location.pathname}?error=unknown_error`)
        }
      }
    })();
  }, [params.eventId]);

  async function handleOnDeleteEvent() {
    if ( !event?.$id ) return;
    try {
      await deleteEventById(event.$id);
      navigate('/');
    } catch(error: unknown) {
      if ( error instanceof AppwriteException ) {
        navigate(`${window.location.pathname}?error=${error.type}`)
      } else {
        navigate(`${window.location.pathname}?error=unknown_error`)
      }
    }
  }

  return (
    <Layout>
      <Container className="grid gap-12 grid-cols-1 md:grid-cols-2">
        <div>
          {image?.url && (
            <img
              className="block rounded"
              width={image.width}
              height={image.height}
              src={String(image.url)}
              alt={image.alt}
            />
          )}
        </div>

        <div>
          {event && (
            <>
              <h1 className="text-3xl font-bold mb-6">
                { event?.name }
              </h1>
              <p className="text-lg font-medium text-neutral-600 dark:text-neutral-200">
                <strong>Date:</strong> { event?.date && new Date(event?.date).toLocaleString('en-US', { month: 'long', day: 'numeric' }) }
              </p>
              <p className="text-lg font-medium text-neutral-600 dark:text-neutral-200">
                <strong>Location:</strong> { event?.location }
              </p>
              {isAdmin && (
                <>
                  <p className="mt-6">
                    <Button color="red" onClick={handleOnDeleteEvent}>Delete Event</Button>
                  </p>
                </>
              )}
            </>
          )}
        </div>
      </Container>
    </Layout>
  )
}

export default Event;
