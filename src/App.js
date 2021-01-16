import logo from './logo.svg';
import './App.css';
import {
  Histogram,
  DensitySeries,
  BarSeries,
  withParentSize,
  XAxis,
  YAxis,
} from '@data-ui/histogram';
import {
  Sparkline,
  LineSeries,
  HorizontalReferenceLine,
  BandLine,
  PatternLines,
  PointSeries,
} from '@data-ui/sparkline';
import { allColors } from '@data-ui/theme';
//import ResponsiveHistogram from './ResponsiveHistogram';

const ResponsiveHistogram = withParentSize(
  ({ parentWidth, parentHeight, ...rest }) => (
    <div style={{ textAlign: 'center' }}>
      <Histogram width={parentWidth / 1.2} height={300} {...rest} />
    </div>
  )
);

const rawData = Array(100).fill().map(Math.random);
const data = Array(25).fill().map(Math.random);

function App() {
  return (
    <div>
      <ResponsiveHistogram
        ariaLabel='My histogram of ...'
        orientation='vertical'
        cumulative={false}
        normalized={true}
        binCount={25}
        valueAccessor={(datum) => datum}
        binType='numeric'
        renderTooltip={({ event, datum, data, color }) => (
          <div>
            <strong style={{ color }}>
              {datum.bin0} to {datum.bin1}
            </strong>
            <div>
              <strong>count </strong>
              {datum.count}
            </div>
            <div>
              <strong>cumulative </strong>
              {datum.cumulative}
            </div>
            <div>
              <strong>density </strong>
              {datum.density}
            </div>
          </div>
        )}
      >
        <BarSeries animated rawData={rawData /* or binnedData={...} */} />
        <XAxis />
        <YAxis />
      </ResponsiveHistogram>
      <div style={{ textAlign: 'center' }}>
        <Sparkline
          ariaLabel='A line graph of randomly-generated data'
          margin={{ top: 24, right: 64, bottom: 24, left: 64 }}
          width={600}
          height={200}
          data={data}
          valueAccessor={(datum) => datum}
        >
          {/* this creates a <defs> referenced for fill */}
          <PatternLines
            id='unique_pattern_id'
            height={6}
            width={6}
            stroke={allColors.grape[6]}
            strokeWidth={1}
            orientation={['diagonal']}
          />
          {/* display innerquartiles of the data */}
          <BandLine band='innerquartiles' fill='url(#unique_pattern_id)' />
          {/* display the median */}
          <HorizontalReferenceLine
            stroke={allColors.grape[8]}
            strokeWidth={1}
            strokeDasharray='4 4'
            reference='median'
          />
          {/* Series children are passed the data from the parent Sparkline */}
          <LineSeries showArea={false} stroke={allColors.grape[7]} />
          <PointSeries
            points={['min', 'max']}
            fill={allColors.grape[3]}
            size={5}
            stroke='#fff'
            renderLabel={(val) => val.toFixed(2)}
          />
        </Sparkline>
      </div>
    </div>
  );
}

export default App;
