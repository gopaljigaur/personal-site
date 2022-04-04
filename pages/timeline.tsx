import { useState } from 'react';
import Container from 'components/Container';

import { DownArrow } from '../components/SvgIcons';
import { allYears, Years } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import components from 'components/MDXComponents';

const Divider = () => {
  return (
    <div className="border border-gray-200 dark:border-gray-600 w-full my-8" />
  );
};

const Year = ({ children }) => {
  return (
    <h3 className="text-lg md:text-xl font-bold mb-4 tracking-tight text-gray-900 dark:text-gray-100">
      {children}
    </h3>
  );
};

export function Step({ year }: {year: Years}) {
  const Events = useMDXComponent(year.body.code);
  return(
    <>
      <Year>{year.year}</Year>
      <ul>
        <Events
          components={
            {
              ...components
            } as any
          }
        />
      </ul>
    </>
  )
}

export default function Timeline() {
  const [yearsToShow, setYearsToShow] = useState(3);
  const sortedYears = allYears
    .sort((a,b) => a.year > b.year ? -1: 1);
  return (
    <Container
      title="Timeline"
      description="A timeline of my life events."
    >
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Timeline
        </h1>
        <div className="mb-8">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This is my timeline of some important things that have happened in my life.
          </p>
        </div>
        {
          sortedYears.slice(0, yearsToShow)
            .map((year, index) => {
              return(
                <div className="w-full" key={year.year}>
                <Step year={year} />
                  {
                    (index < yearsToShow - 1) ? (<Divider />) : ''
                  }
                </div>
              )
            })
        }
      {(yearsToShow < allYears.length ) ? (
        <button
          type="button"
          className="flex items-center text-sm my-4 mx-auto px-4 py-2 rounded-md font-medium text-gray-900 dark:text-gray-100"
          onClick={() => setYearsToShow(allYears.length)}
        >
          See More
          { DownArrow }
        </button>
      ) : ''
      }
        </div>
    </Container>
  );
}
