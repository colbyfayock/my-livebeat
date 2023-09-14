import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route } from 'wouter';

import Home from '@/pages/index';
import Login from '@/pages/login';
import Session from '@/pages/session';
import EventsNew from '@/pages/events/new';
import Event from '@/pages/event/[eventId]';

import '@/styles/global.css'

const Router = () => {
  return (
    <>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/session" component={Session} />
      <Route path="/events/new" component={EventsNew} />
      <Route path="/event/:eventId" component={Event} />
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)
