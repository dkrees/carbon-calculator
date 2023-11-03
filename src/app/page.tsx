"use client";

import * as Collapsible from "@radix-ui/react-collapsible";
import { Cross2Icon, RowSpacingIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const EpGB = 0.5346; // kWh/GB
const DuPc = 0.788; // Device use %
const NuPc = 0.212; // Network use %

const carbonFactor = [
  { label: "Global Grid (442g/kWh)", value: 442 },
  { label: "UK Grid (268g/kWh)", value: 268 },
  { label: "Renewable Energy (50g/kWh)", value: 50 },
];

export default function RootPage() {
  // Form Inputs
  const [inputs, setInputs] = useState({
    page_uncached: 1,
    page_cached: 0.1,
    new_visits: 75,
    carbon_factor: carbonFactor[0].value,
    number_of_visits: 1000,
  });

  // Expanding details
  const [expand, setExpand] = useState(false);

  // Page load uncached (new visit) (GB)
  let pageUncachedGb = inputs.page_uncached / 1000;

  // Page load cached (returning visit) (GB)
  let pageCachedGb = inputs.page_cached / 1000;

  // New visitors as a %
  let newVisits = inputs.new_visits / 100;

  // Returning visits as a % (rounded to avoid fractional percentages)
  let returningVisits = (100 - inputs.new_visits) / 100;

  // Energy use per new visit (kWh)
  let energyNewVisits = pageUncachedGb * EpGB * newVisits;

  // Energy use per returning visit (kWh)
  let energyReturningVisits = pageCachedGb * EpGB * returningVisits;

  // Total Energy per visit (kWh)
  let energyPerVisit = energyNewVisits + energyReturningVisits;

  // Emissions per visit (g CO2e)
  let emissionsPerVisit = inputs.carbon_factor * energyPerVisit;

  // Monthly emissions (g CO2e)
  let monthlyEmissions = emissionsPerVisit * inputs.number_of_visits;

  // Monthly emissions (kg CO2e) with thousand commas
  let monthlyEmissionsKg = numberWithCommas(monthlyEmissions / 1000);

  // Annual emissions (g CO2e)
  let yearlyEmissions = monthlyEmissions * 12;

  // Annual emissions (kg CO2e) with thousand commas
  let yearlyEmissionsKg = numberWithCommas(yearlyEmissions / 1000);

  // Device Use per Month (kg CO2e) with thousand commas
  let deviceUseMonthlyKg = numberWithCommas((monthlyEmissions / 1000) * DuPc);

  // Network Use per Month (kg CO2e) with thousand commas
  let networkUseMonthlyKg = numberWithCommas((monthlyEmissions / 1000) * NuPc);

  // Convert number to contain thousand comma seperators for readability
  function numberWithCommas(x: number) {
    let d = x >= 1000 ? x.toFixed(0) : x.toFixed(2);
    var parts = d.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-sky-800 from-10% to-emerald-500 to-90%">
      <header className="container mx-auto mt-6 text-white">
        <h1 className="text-4xl">User Interface Carbon Calculator</h1>
      </header>
      <div className="container mx-auto mt-6 flex flex-col gap-6 rounded-lg border-2 border-emerald-600 bg-white p-6 font-light">
        <div className="flex gap-6">
          <div className="w-1/2 py-2 text-sm">
            <form
              className="container mx-auto w-full"
              noValidate
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="mb-2 flex flex-col gap-1">
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

              <div className="mb-2 flex flex-col gap-1">
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

              <div className="mb-2 flex flex-col gap-1">
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

              <div className="mb-2 flex flex-col gap-1">
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

              <div className="mb-2 flex flex-col gap-1">
                <label
                  htmlFor="carbon_factor"
                  className="cursor-pointer text-gray-700"
                >
                  Carbon Factor:
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
            </form>
          </div>
          <div className="text-md w-1/2 py-2">
            {/* RESULTS */}
            <div className="mb-6">
              <div className="mt-6 flex flex-col text-center">
                <div>
                  <span className="text-xl font-medium">
                    {monthlyEmissionsKg}
                  </span>{" "}
                  <span className="text-sm font-light">kg CO2e</span>
                </div>
                <span>emissions per month</span>
              </div>
              <div className="mt-6 flex flex-col text-center">
                <div>
                  <span className="text-3xl font-medium">
                    {yearlyEmissionsKg}
                  </span>{" "}
                  <span className="text-lg font-light">kg CO2e</span>
                </div>
                <span>emissions per year</span>
              </div>
            </div>

            <hr />

            {/* EXPANDABLE CONTENT */}
            <Collapsible.Root
              className="mt-4"
              open={expand}
              onOpenChange={setExpand}
            >
              <Collapsible.Trigger asChild>
                <div className="flex cursor-pointer justify-center gap-2">
                  <span className="text-sm">
                    {expand ? "Hide" : "Show"} Details
                  </span>
                  <button>
                    {expand ? <Cross2Icon /> : <RowSpacingIcon />}
                  </button>
                </div>
              </Collapsible.Trigger>

              <Collapsible.Content>
                <div className="flex flex-col md:flex-row md:justify-evenly md:gap-12">
                  <div className="mt-6 flex flex-col text-center">
                    <div>
                      <span className="text-lg">{deviceUseMonthlyKg}</span>{" "}
                      <span className="text-sm">kg CO2e</span>
                    </div>
                    <span className="text-sm">
                      device use emissions per month
                    </span>
                  </div>
                  <div className="mt-6 flex flex-col text-center">
                    <div className="text-lg">
                      <span className="text-lg">{networkUseMonthlyKg}</span>{" "}
                      <span className="text-sm">kg CO2e</span>
                    </div>
                    <span className="text-sm">
                      network use emissions per month
                    </span>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:justify-evenly md:gap-12">
                  <div className="mt-6 flex flex-col text-center">
                    <div>
                      <span className="text-lg">
                        {energyPerVisit.toFixed(4)}
                      </span>{" "}
                      <span className="text-sm">kWh</span>
                    </div>
                    <span className="text-sm">energy use per visit</span>
                  </div>
                  <div className="mt-6 flex flex-col text-center">
                    <div>
                      <span className="text-lg">
                        {emissionsPerVisit.toFixed(4)}
                      </span>{" "}
                      <span className="text-sm">g CO2e</span>
                    </div>
                    <span className="text-sm">emissions per visit</span>
                  </div>
                </div>
              </Collapsible.Content>
            </Collapsible.Root>
          </div>
        </div>
      </div>
    </div>
  );
}
