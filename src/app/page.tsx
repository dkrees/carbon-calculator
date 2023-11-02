"use client";

import { useState } from "react";

const EpGB = 0.5346; // kWh/GB

const carbonFactor = [
  { label: "Global Grid (442g/kWh)", value: 442 },
  { label: "UK Grid (268g/kWh)", value: 268 },
  { label: "Renewable Energy (50g/kWh)", value: 50 },
];

export default function RootPage() {
  const [inputs, setInputs] = useState({
    page_uncached: 0,
    page_cached: 0,
    new_visits: 75,
    carbon_factor: carbonFactor[0].value,
    number_of_visits: 1,
  });

  let cPageUncachedGb = inputs.page_uncached / 1000;
  let cPageCachedGb = inputs.page_cached / 1000;
  let cNewVisits = inputs.new_visits / 100;
  let cReturningVisits = Math.round((1 - inputs.new_visits / 100) * 100) / 100;
  let cEnergyNewVisits = cPageUncachedGb * EpGB * cNewVisits;
  let cEnergyReturningVisits = cPageCachedGb * EpGB * cReturningVisits;
  let cEnergyPerVisit = cEnergyNewVisits + cEnergyReturningVisits;
  let cEmissionsPerVisit = inputs.carbon_factor * cEnergyPerVisit;
  let cMonthlyEmissions = cEmissionsPerVisit * inputs.number_of_visits;
  let cYearlyEmissions = cMonthlyEmissions * 12;

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-sky-800 from-10% to-emerald-500 to-90%">
      <div className="container mx-auto mt-24 flex flex-col gap-6 rounded-lg border-2 border-emerald-600 bg-white p-6 font-light">
        <h1 className="text-4xl">Carbon Calculator</h1>
        <div className="flex gap-6">
          <div className="w-1/2 py-2 text-sm">
            <form
              className="container mx-auto w-full"
              noValidate
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="mb-2">
                <label
                  htmlFor="page_load"
                  className="cursor-pointer text-gray-700"
                >
                  Page Load Uncached (MB):
                </label>
                <input
                  id="page_load"
                  name="page_uncached"
                  type="number"
                  min={0}
                  value={inputs.page_uncached}
                  onChange={handleChange}
                  className="w-full rounded-sm border border-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="page_load_cached"
                  className="cursor-pointer text-gray-700"
                >
                  Page Load Cached (MB):
                </label>
                <input
                  id="page_load_cached"
                  name="page_cached"
                  type="number"
                  min={0}
                  value={inputs.page_cached}
                  onChange={handleChange}
                  className="w-full rounded-sm border border-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="new_visits"
                  className="cursor-pointer text-gray-700"
                >
                  New Visits (%):
                </label>
                <input
                  id="new_visits"
                  type="number"
                  name="new_visits"
                  min={5}
                  max={100}
                  step={5}
                  value={inputs.new_visits}
                  onChange={handleChange}
                  className="w-full rounded-sm border border-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="carbon_factor"
                  className="cursor-pointer text-gray-700"
                >
                  Carbon Factor
                </label>
                <select
                  id="carbon_factor"
                  name="carbon_factor"
                  value={inputs.carbon_factor}
                  onChange={handleChange}
                  className="w-full rounded-sm border border-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  {carbonFactor.map((grid) => (
                    <option key={grid.value} value={grid.value}>
                      {grid.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-2">
                <label
                  htmlFor="nnumber_of_visits"
                  className="cursor-pointer text-gray-700"
                >
                  Number of visits per month:
                </label>
                <input
                  id="number_of_visits"
                  type="number"
                  name="number_of_visits"
                  min={1}
                  value={inputs.number_of_visits}
                  onChange={handleChange}
                  className="w-full rounded-sm border border-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                />
              </div>
            </form>
          </div>
          <div className="text-md w-1/2 py-2">
            <div>Page load uncached: {cPageUncachedGb + "GB"}</div>
            <div>Page load cached: {cPageCachedGb + "GB"}</div>
            <div>New Visits: {cNewVisits}</div>
            <div>Returing Visits: {cReturningVisits}</div>
            <div>
              Energy use per visit: {cEnergyPerVisit.toFixed(4) + "kWh"}
            </div>
            <div>
              Emissions per visit: {cEmissionsPerVisit.toFixed(4) + "g CO2e"}
            </div>
            <div>
              Emissions per month {cMonthlyEmissions.toFixed(2) + "g CO2e"}
            </div>
            <div>
              Emissions per year {cYearlyEmissions.toFixed(2) + "g CO2e"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
