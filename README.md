# Activity Availability and Registration Logger

### File Structure

```sh
imports/
  startup/
    client/
      index.js                 # import client startup through a single index entry point
      routes.js                # set up all routes in the app
      useraccounts-configuration.js # configure login templates
    server/
      fixtures.js              # fill the DB with example data on startup
      index.js                 # import server startup through a single index entry point

  api/
    events/                    # a unit of domain logic
      server/
        publications.js        # all event-related publications
        publications.tests.js  # tests for the event publications
      events.js                # definition of the Events collection
      events.tests.js          # tests for the behavior of that collection
      methods.js               # methods related to events
      methods.tests.js         # tests for those methods

  ui/
    components/                # all reusable components in the application
                               # can be split by domain if there are many
    layouts/                   # wrapper components for behaviour and visuals
    pages/                     # entry points for rendering used by the router

client/
  main.js                      # client entry point, imports all client code

server/
  main.js                      # server entry point, imports all server code
```
