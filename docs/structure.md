# Why This Structure?

Many tutorials place everything under lib/ or utils/, which quickly becomes difficult to navigate. Our structure separates responsibilities clearly:

- features/ contains business logic grouped by domain.
- services/ contains application services and orchestration.
- repositories/ handles all database access.
- components/ contains reusable UI.
- actions/ contains Next.js Server Actions.
- lib/ contains shared infrastructure, such as the database client and authentication helpers.

This organization scales well as the application grows.