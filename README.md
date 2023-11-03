This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

It uses [TailwindCSS](https://tailwindcss.com/) - a utility-first CSS framework for styling and [Radix UI Primitives](https://www.radix-ui.com/primitives) for UI components.

## Getting Started

First, install dependencies and run the development server:

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## More about this Project

This carbon calculator is a refined version of the methodology found at [Sustainable Web Design](https://sustainablewebdesign.org/calculating-digital-emissions/).

Specifically, it only uses the two system segments; Consumer device use and Network use, ignoring the data centre use and hardware production. This is intended to bring focus to the User Interface emissions to establish a metric for measuring the emissions of a website or application during it's use. This should help drive design and development to make choices that reduce the energy use and the CO2e emissions.

The metric used for measuring energy use `0.5346 kWh/GB`. Combined with the Carbon factor of the energy source, the emissions are calculated.

## How To Use This Calculator

The calculator enables you to provide the uncached and cached transfered data (obtained using Chrome dev tools, for example). Either by estimating, or where possible providing the percentage of new (vs returning) visitors, the calculator will use this with the cached and uncached data transfers and the 0.5346kWh/GB metric to calculate the total energy per vist, which can be seen in the expanded detail.

Providing a number of users per month (estimated, or obtained otherwise) and the energy grid source a final estimated value of CO2e emissions can be calculated.

Of course these numbers are all based on many, many variables and assumptions and should only used for guidance and setting a benchmark to work from and improve.

The methodology may evolve over time as more accurate and updated metrics become available. These will be clearly indicated as this happens.
