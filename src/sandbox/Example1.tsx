import { Svg } from '../lib'

export const Example1 = () => (
  <div>
    <Svg sizeMode="content" style={{ display: 'flex', flexDirection: 'row' }}>
      <g>
        <rect width={40} height={40} fill="red"></rect>
      </g>
      <g>
        <rect width={40} height={40} fill="green"></rect>
      </g>
      <g>
        <text alignmentBaseline="hanging">Hello world</text>
      </g>
    </Svg>
  </div>
)
