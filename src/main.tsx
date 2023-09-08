import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router as WouterRouter, Route } from 'wouter';

import { AuthProvider } from '@/hooks/use-auth';

import Home from '@/pages/index';
import Login from '@/pages/login';
import Session from '@/pages/session';
import EventsNew from '@/pages/events/new';
import Event from '@/pages/event/[eventId]';

import '@/styles/global.css'

const Router = () => {
  return (
    <WouterRouter >
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/session" component={Session} />
      <Route path="/events/new" component={EventsNew} />
      <Route path="/event/:eventId" component={Event} />
    </WouterRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>,
)
