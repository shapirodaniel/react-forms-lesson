# React Forms

Welcome to React Forms! This repo demos a controlled React form, with full backend support + frontend state management for CRUD ops.

## Getting Started

Fork and clone this repo to your local machine, then `$ npm i` to install dependencies. `$ createdb react-forms-demo` and `$ psql react-forms-demo`, then run `$ npm run db:build` to seed the database.

## What's Inside

This demo repo contains an API that handles User and Address entity CRUD ops, a backend database adapters setup to communicate these changes to a PostgreSQL database instance, and a React frontend that leverages React-Redux bindings and React-Thunk to provide an API service layer to the Redux store.

In `src/components/AddressForm.js` you'll find a controlled React form that leverages common React patterns like managing local form state via `this.state`, and form fields generated from a list of form objects that describe the type and name of each input field.
