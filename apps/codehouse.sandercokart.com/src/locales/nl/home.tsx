import { spans } from 'next/dist/build/webpack/plugins/profiling-plugin';

export default {
  'hero': {
    description:
      'Een tech stack om effectieve en efficiënte oplossingen te leveren voor uw bedrijf.\nGebruikmakend van de nieuwste technologieën en beste praktijken.',
    contact: 'Neem contact met ons op om uw volgende project te plannen!',
    title: (
      <span>
        We build <span className="text-accent">websites and webapps</span> for you.
      </span>
    ),
  },
  'email': 'Email',
  'subject': 'Onderwerp',
  'message': 'Bericht',
  'name': 'Naam',
  'send': 'Verzenden',
  'makeAnAppointment': 'Maak een afspraak',
  'draft': 'Ik zou graag een afspraak willen maken tussen DATUM en DATUM, kan dat?\n\nMet vriendelijke groet,\nNAAM',
  'example': {
    email: 'voorbeeld@domein.com',
    name: 'John Doe',
  },
  'tech-stack': {
    react:
      'React is ons framework van keuze voor het bouwen van websites en webapps. De reden hiervoor is dat React de grootste community heeft en het meest populaire framework is. Dit betekent dat we veel tijd kunnen besparen door bestaande oplossingen en bibliotheken te gebruiken om de ontwikkeling te versnellen.',
    next: 'We gebruiken NextJS voor onze websiteprojecten. NextJS gebruikt strategieën zoals server side rendering, static generation en code splitting om de snelste ervaring te bieden. Het gebruikt React onder de motorkap, zodat we toegang hebben tot alle geweldige bibliotheken die er zijn. Wanneer mogelijk, gebruiken we NextJS boven alleenstaand React, Vue of Laravel + JavaScript Framework oplossingen vanwege de enorme prestatieboost die NextJS biedt. codehouse.sandercokart.com is hiermee gemaakt!',
    vue: 'We gebruiken VueJS als alternatief voor React. Het wordt vaak gecombineerd met NuxtJS, wat veel lijkt op NextJS, maar voor Vue. Statistisch gezien is Vue sneller dan React vanwege hoe het reactiviteit behandelt. Het is veel jonger dan React en heeft een kleinere community. Dit betekent dat er minder bestaande oplossingen en bibliotheken beschikbaar zijn.',
    laravel:
      'We gebruiken laravel voor onze backend en fullstack projecten. Of u nu een eenvoudige API of een volledig webapp nodig heeft, laravel is een goede keuze. We combineren vaak laravel met andere tools zoals InertiaJS, waardoor we een rijke javascript ondersteunde webapp kunnen bouwen zonder een apart (sub)domein nodig te hebben.',
  },
  'project': {
    nawijzer: {
      description:
        'NaWijzer.nl is een website die ik heb gebouwd voor mijn eerste klant: Adequaat, Groningen. De website presenteert een politieke vragenlijst aan de gebruikers. De website heeft ook een webapp achter de schermen die het mogelijk maakt om rapporten te genereren, evenals nieuwe vragen en antwoorden-sets te maken.',
      caption1: 'Vragenlijst',
      caption2: 'Filament admin paneel met donkere modus',
    },
  },
  'moreOnGithub': 'Zie meer projecten op GitHub',
  'previousProject': 'Vorige project',
  'nextProject': 'Volgende project',
  'insertTemplate': 'Voeg sjabloon in',
} as const;
