import { useState, useEffect } from 'react';
import { AppwriteException } from 'appwrite';
import { Link, useLocation } from 'wouter';
import { useSearch } from "wouter/use-location";

import { useAuth } from '@/hooks/use-auth';

import Container from '@/components/Container';

const errors: { [key: string]: string } = {
  event_not_found: 'Event not found.',
  user_invalid_token: 'Your login session expired, please try again.',
  user_unauthorized: 'You must be logged in to submit a new event.',
  unknown_error: 'Something went wrong. Please try again.'
}

const Nav = () => {
  const [, navigate] = useLocation();
  const search = useSearch();
  const { session, logOut } = useAuth()
  const [bannerMessage, setBannerMessage] = useState<string | undefined>();

  useEffect(() => {
    if ( !search ) return;

    const params = new URLSearchParams(search);
    const errorCode = params.get('error');

    if ( !errorCode ) return;

    if ( typeof errorCode === 'string' && errors[errorCode] ) {
      setBannerMessage(errors[errorCode]);
    } else {
      setBannerMessage(errors.unknown_error);
    }
  }, [search]);

  async function handleOnLogOut() {
    try {
      await logOut();
    } catch(error: unknown) {
      if ( error instanceof AppwriteException ) {
        navigate(`${window.location.pathname}?error=${error.type}`)
      } else {
        navigate(`${window.location.pathname}?error=unknown_error`)
      }
    }
  }

  function handleOnClearMessage() {
    const params = new URLSearchParams(window.location.search);
    params.delete('error');
    navigate(`${window.location.pathname}?${params.toString()}`, { replace: true });
    setBannerMessage(undefined);
  }

  return (
    <nav>
      {bannerMessage && (
        <div className="bg-yellow-100 text-sm text-center py-2">
          <Container className="relative">
            <p>{ bannerMessage }</p>
            <p className="absolute top-0 bottom-0 my-auto right-5">
              <button className="w-4 text-yellow-800" onClick={handleOnClearMessage}>
                <svg className="w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                </svg>
                <span className="sr-only">Close</span>
              </button>
            </p>
          </Container>
        </div>
      )}
      <Container className="py-16">
        <p className="text-center mb-2">
          <Link href="/">
            <a className="text-4xl font-bold text-slate-900 dark:text-white hover:text-slate-900 dark:hover:text-gray-100 drop-shadow-[0_2px_0px_rgba(255,255,255,1)] dark:drop-shadow-[0_2px_0px_rgba(0,0,0,1)]">LiveBeat</a>
          </Link>
        </p>
        <p className="flex justify-center gap-4">
          { session && (
            <button className="font-medium hover:text-[#535bf2] cursor-pointer" onClick={handleOnLogOut}>
              Log Out
            </button>
          )}
          {!session && (
            <Link href="/login">
              <a className="font-medium text-inherit">Log In</a>
            </Link>
          )}
        </p>
      </Container>
    </nav>
  )
}

export default Nav;