export default function GlassFilter() {
  return (
    <svg className="hidden">
      <defs>
        <filter
          id="glass-blur"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves="1"
            seed="2"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="50"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="3" result="blur" />
          <feComposite in="blur" in2="blur" operator="over" />
        </filter>
      </defs>
    </svg>
  )
}
