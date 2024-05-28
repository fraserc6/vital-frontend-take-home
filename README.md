## Fraser Cook - Vital Frontend Take Home Test

You can follow instructions below to run the project locally or feel free to view it on this [Vercel deployment](https://vital-frontend-take-home.vercel.app/).

- Core stack: Next.js + Tailwind CSS
- Time spent: ~ 6 hours

### Running Locally

First, install the project dependencies:

```bash
npm i
```

You should then be able to run the dev server with:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to view.

### Considerations

#### User Interface

Originally I built a mock dashboard layout, representing the core navigation and overall structure that can be seen on the current Vital dashboard. In order to trim down code and keep this demo focused, I opted to remove this and go for a simplistic UI which demonstrates the core requirements

#### Vital API Usage

During the initial stages of this project, I noticed the Vital API appears to be limited to server-to-server requests only; at least all of my browser based tests ran into CORS issues.

The test instructions also stated that we should use client side filtering for the biomarkers. As the Vital API returns a paginated set of results capped at 100 per page, a mechanism was required to loop the available pages to provide an exhaustive list of markers in which to filter locally.

To achieve this, I wrote a little script to grab a complete set of biomarkers and labs which would be referenced when filtering biomarkers. This script can be found at `./scripts/generate-data.ts` and can be run with `npm run generate-data`. In the spirit of keeping this challenge simple, I've already ran this script and included a data export in the repository, so you can effectively just run the demo and use it without any further setup.

To provide a basic demo of filtering against an API from the biomarker selection page, I built a local mock API (`./app/api/*`) for markers and labs, which simply grabs the data from the local `.json` files and performs basic filtering where necessary. This allows me to perform API requests in my components just as I would to the Vital API (e.g. via SWR or fetch).

I think it goes without saying that this whole approach is not ideal, especially in a production environment. We'd simply just filter via the API directly or have endpoints which provided complete data sets if we wanted to filter anything locally.

#### Vital API Filtering

During testing, I did attempt to use the Vital API directly to power the biomarker selection screen. The API accepts a name and set of lab ID's, however I noticed the name search seems a little inaccurate.

As the instructions also stated we should use local filtering, I dropped querying directly against the Vital API all together aside from the initial data generation.

#### SSR (Server Side Rendering)

I'd have liked to have shown off some SSR possibilities with this demo. However, as we're dealing with local data, it's pretty redundant, so you'll find most components which deal with any form of data are client components.

A simple use case for SSR would be pulling through the user's saved panels server side, then using client side rendering / requests for more dynamic pages like we have done on the biomarker selection screen.

### Data generation

As mentioned in the project considerations, this project references a set of local biomarkers and labs which are generated via the Vital API.

While a base set of data already exists in this repo, you can override it via the generation command below. Before doing this, you will need a Vital API key and relevant API base path for your region.

You can start by duplicating the example environment file and updating the values accordingly:

```bash
cp .env.example .env.local
```

Then simply run the data generation script with:

```bash
npm run generate-data
```

### Third Party Packages

#### [Next.js](https://nextjs.org/)

As Next.js is built on top of React and is used internally, I figured it'd be okay to use this as the base for the project. I simply bootstraped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) using the default configuration.

#### [Tailwind CSS](https://tailwindcss.com/)

My styling library of choice - I use it daily and have done for years. In my opinion, it's the best way to style and scale a component driven web app and it's dead easy to maintain.

I've included the `@tailwindcss/forms` plugin as it provides a clean base state for form inputs across browsers to build on top of.

#### [React Hook Form](https://react-hook-form.com/) + Resolvers + [Zod](https://zod.dev/)

I typically use RHF and Zod to handle data flow within forms and enforce a schema + validation. It also provides some other cool stuff out the box such as exposing various form states and makes it easy to build more advanced forms.

In an attempt to keep this project light, I wasn't originally going to include this, however I didn't love the idea of submitting a version without any validation at all. By the time I'd hand engineered some basic validation, it endeded up being more markup than if I'd just installed the setup I usually use and would generally recommend.

#### [Class Variance Authority (CVA)](https://cva.style/docs)

When building more complex components with various visual states and conditionals, you can quickly run into pretty horrible class strings. I always reach for `cva` in these circumstances to create robust class name structures which are much easier to read, maintain and scale.

This is only used on the `<Button />` component right now to provide an insight into how and why this is useful.

#### [Sonner](https://sonner.emilkowal.ski/)

A simple toast notification library. It can be customised, but it provides a great out of the box experience with some useful features (e.g. hover and stacking functionality).

#### [SWR](https://swr.vercel.app/)

I tend to use SWR for all client side requests. It handles caching, deduping and smart revalidation out of the box. It can also be used to support paginated data and immutable requests (no fancy features, just grab the data once).

#### Misc

To power the data generation script, I had to include `dotenv` and `tsx` - just a note to explain what these guys are doing in there.

### Future Ehancements

I tried to strike a balance between keeping things simple but also including some features that I'd typically encorporate into day to day projects. Just to give a nod to things I would change or explore:

- Leverage SSR for initial page data
- Filter via API directly
- Edit / delete user panels
- Alter the UI to fit a dashboard style layout
- Interaction animations (e.g. when optimistically pushing new data to a list)
