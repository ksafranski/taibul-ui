"use client";

import React, { useContext } from 'react';

// Simple utility to merge classes
const cn = (...inputs: (string | undefined | null | false)[]) => inputs.filter(Boolean).join(' ');

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type Justify = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
type Align = 'top' | 'middle' | 'bottom' | 'stretch';
type Gutter = number; // Tailwind spacing units
type ColSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  fluid?: boolean;
}

interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  justify?: Justify;
  align?: Align;
  gutter?: Gutter | [Gutter, Gutter]; // [horizontal, vertical]
}

interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: ColSpan;
  offset?: ColSpan;
  xs?: ColSpan;
  sm?: ColSpan;
  md?: ColSpan;
  lg?: ColSpan;
  xl?: ColSpan;
  "2xl"?: ColSpan;
  flex?: string | number; // Custom flex value
}

/* -------------------------------------------------------------------------- */
/*                                  Context                                   */
/* -------------------------------------------------------------------------- */

// Generate static classes so Tailwind picks them up.
// Explicitly mapping each variation.
const COL_CLASSES: Record<string, Record<number | 'auto', string>> = {
  base: {
    1: 'w-1/12', 2: 'w-2/12', 3: 'w-3/12', 4: 'w-4/12', 5: 'w-5/12', 6: 'w-6/12',
    7: 'w-7/12', 8: 'w-8/12', 9: 'w-9/12', 10: 'w-10/12', 11: 'w-11/12', 12: 'w-full',
    auto: 'w-auto'
  },
  xs: {
    1: 'xs:w-1/12', 2: 'xs:w-2/12', 3: 'xs:w-3/12', 4: 'xs:w-4/12', 5: 'xs:w-5/12', 6: 'xs:w-6/12',
    7: 'xs:w-7/12', 8: 'xs:w-8/12', 9: 'xs:w-9/12', 10: 'xs:w-10/12', 11: 'xs:w-11/12', 12: 'xs:w-full',
    auto: 'xs:w-auto'
  },
  sm: {
    1: 'sm:w-1/12', 2: 'sm:w-2/12', 3: 'sm:w-3/12', 4: 'sm:w-4/12', 5: 'sm:w-5/12', 6: 'sm:w-6/12',
    7: 'sm:w-7/12', 8: 'sm:w-8/12', 9: 'sm:w-9/12', 10: 'sm:w-10/12', 11: 'sm:w-11/12', 12: 'sm:w-full',
    auto: 'sm:w-auto'
  },
  md: {
    1: 'md:w-1/12', 2: 'md:w-2/12', 3: 'md:w-3/12', 4: 'md:w-4/12', 5: 'md:w-5/12', 6: 'md:w-6/12',
    7: 'md:w-7/12', 8: 'md:w-8/12', 9: 'md:w-9/12', 10: 'md:w-10/12', 11: 'md:w-11/12', 12: 'md:w-full',
    auto: 'md:w-auto'
  },
  lg: {
    1: 'lg:w-1/12', 2: 'lg:w-2/12', 3: 'lg:w-3/12', 4: 'lg:w-4/12', 5: 'lg:w-5/12', 6: 'lg:w-6/12',
    7: 'lg:w-7/12', 8: 'lg:w-8/12', 9: 'lg:w-9/12', 10: 'lg:w-10/12', 11: 'lg:w-11/12', 12: 'lg:w-full',
    auto: 'lg:w-auto'
  },
  xl: {
    1: 'xl:w-1/12', 2: 'xl:w-2/12', 3: 'xl:w-3/12', 4: 'xl:w-4/12', 5: 'xl:w-5/12', 6: 'xl:w-6/12',
    7: 'xl:w-7/12', 8: 'xl:w-8/12', 9: 'xl:w-9/12', 10: 'xl:w-10/12', 11: 'xl:w-11/12', 12: 'xl:w-full',
    auto: 'xl:w-auto'
  },
  '2xl': {
    1: '2xl:w-1/12', 2: '2xl:w-2/12', 3: '2xl:w-3/12', 4: '2xl:w-4/12', 5: '2xl:w-5/12', 6: '2xl:w-6/12',
    7: '2xl:w-7/12', 8: '2xl:w-8/12', 9: '2xl:w-9/12', 10: '2xl:w-10/12', 11: '2xl:w-11/12', 12: '2xl:w-full',
    auto: '2xl:w-auto'
  }
};

const getColClass = (val: ColSpan | undefined, prefix: string = 'base') => {
  if (val === undefined) return '';
  const p = prefix === '' ? 'base' : prefix;
  // @ts-ignore
  return COL_CLASSES[p]?.[val] || '';
};

const GridContext = React.createContext<{ gutter: [number, number] }>({
  gutter: [0, 0]
});

/* -------------------------------------------------------------------------- */
/*                                 Components                                 */
/* -------------------------------------------------------------------------- */

/**
 * Grid Component
 * The top-level container for the grid system.
 */
const GridMain = React.forwardRef<HTMLDivElement, GridProps>(({ 
  children, 
  className, 
  fluid = false,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref} 
      className={cn(
        "mx-auto px-4",
        !fluid && "container",
        fluid && "w-full",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
});
GridMain.displayName = "Grid";

/**
 * Row Component
 * A wrapper for columns. Handles gutters and alignment.
 */
const Row = React.forwardRef<HTMLDivElement, RowProps>(({ 
  children, 
  className, 
  justify = 'start', 
  align = 'top', 
  gutter = 0,
  style,
  ...props 
}, ref) => {
  
  // Mapping props to Tailwind classes
  const justifyClasses: Record<Justify, string> = {
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  };

  const alignClasses: Record<Align, string> = {
    top: 'items-start',
    middle: 'items-center',
    bottom: 'items-end',
    stretch: 'items-stretch'
  };

  // Determine gutter styles
  const gutterValues: [number, number] = Array.isArray(gutter) ? gutter : [gutter, gutter];
  const [gutterX, gutterY] = gutterValues;
  
  // Tailwind default rem sizing: 1 unit = 0.25rem.
  const getSpacingRem = (val: number) => val * 0.25;
  
  // Use negative margins to counteract column padding
  const rowStyle = {
    marginLeft: `-${getSpacingRem(gutterX) / 2}rem`,
    marginRight: `-${getSpacingRem(gutterX) / 2}rem`,
    marginTop: `-${getSpacingRem(gutterY) / 2}rem`,
    marginBottom: `-${getSpacingRem(gutterY) / 2}rem`,
    ...style
  };

  return (
    <GridContext.Provider value={{ gutter: gutterValues }}>
      <div 
        ref={ref} 
        className={cn(
          "flex flex-wrap",
          justifyClasses[justify],
          alignClasses[align],
          className
        )}
        style={rowStyle}
        {...props}
      >
        {children}
      </div>
    </GridContext.Provider>
  );
});
Row.displayName = "Grid.Row";

/**
 * Col Component
 * A column unit in the grid.
 */
const Col = React.forwardRef<HTMLDivElement, ColProps>(({ 
  children, 
  className, 
  span, 
  offset,
  xs,
  sm,
  md,
  lg,
  xl,
  "2xl": xxl,
  flex,
  style,
  ...props 
}, ref) => {
  
  const { gutter } = useContext(GridContext);
  const [gutterX, gutterY] = gutter;
  
  const getSpacingRem = (val: number) => val * 0.25;

  const colStyle = {
    ...style,
    paddingLeft: `${getSpacingRem(gutterX) / 2}rem`,
    paddingRight: `${getSpacingRem(gutterX) / 2}rem`,
    paddingTop: `${getSpacingRem(gutterY) / 2}rem`,
    paddingBottom: `${getSpacingRem(gutterY) / 2}rem`,
    flex: flex ? flex : undefined
  };



  return (
    <div 
      ref={ref} 
      className={cn(
        "relative max-w-full", // max-w-full ensures it doesn't overflow flex container
        !flex && "flex-none", // Ensure we respect width classes unless flex is overridden
        // Base
        span !== undefined ? getColClass(span) : (!xs && !sm && !md && !lg && !xl && !xxl) ? 'w-full' : '',
        // Responsive
        getColClass(xs, 'xs'),
        getColClass(sm, 'sm'),
        getColClass(md, 'md'),
        getColClass(lg, 'lg'),
        getColClass(xl, 'xl'),
        getColClass(xxl, '2xl'),
        className
      )}
      style={{
        ...colStyle,
        // Handle Legacy/Base Offset via inline style for precision (since classes might be missing)
        marginLeft: typeof offset === 'number' ? `${(offset / 12) * 100}%` : undefined
      }}
      {...props}
    >
      {children}
    </div>
  );
});
Col.displayName = "Grid.Col";

/* -------------------------------------------------------------------------- */
/*                                   Exports                                  */
/* -------------------------------------------------------------------------- */

export const Grid = Object.assign(GridMain, {
  Row,
  Col
});
