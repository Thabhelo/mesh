import { motion } from 'framer-motion';

const center = { x: 220, y: 200 };

const nodes = [
  { label: 'EMS', x: 80, y: 120 },
  { label: 'FIRE', x: 360, y: 120 },
  { label: '911', x: 80, y: 280 },
  { label: 'POLICE', x: 360, y: 280 },
  { label: 'TRANSIT', x: 220, y: 340 },
];

const hexPoints = '0,-40 34,-20 34,20 0,40 -34,20 -34,-20';

const nodeVariants = {
  initial: { opacity: 0, scale: 0.9, y: 10 },
};

export function ProductNetworkDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-xl mx-auto"
    >
      <motion.svg
        viewBox="0 0 440 400"
        className="w-full h-auto"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="nodeFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(25 95% 53%)" />
            <stop offset="100%" stopColor="hsl(39 100% 57%)" />
          </linearGradient>
        </defs>

        {nodes.map((node, index) => (
          <motion.line
            key={`line-${node.label}`}
            x1={node.x}
            y1={node.y}
            x2={center.x}
            y2={center.y}
            stroke="hsl(222 47% 11%)"
            strokeWidth={1.5}
            strokeDasharray="4 10"
            initial={{ opacity: 0.3, strokeDashoffset: 0 }}
            animate={{
              strokeDashoffset: [-30, 0, 30],
              opacity: [0.3, 0.9, 0.3],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.1,
            }}
          />
        ))}

        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i / 6) * Math.PI * 2;
          const radius = i === 0 ? 0 : 18;
          const x = center.x + radius * Math.cos(angle);
          const y = center.y + radius * Math.sin(angle);

          return (
            <motion.circle
              key={`center-${i}`}
              cx={x}
              cy={y}
              r={i === 0 ? 7 : 4}
              fill="hsl(39 100% 57%)"
              stroke="hsl(25 95% 40%)"
              strokeWidth={1.5}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.12,
              }}
            />
          );
        })}

        {nodes.map((node, index) => (
          <motion.g
            key={node.label}
            transform={`translate(${node.x}, ${node.y})`}
            variants={nodeVariants}
            initial="initial"
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              delay: 0.15 + index * 0.08,
              duration: 0.6,
              ease: 'easeOut',
            }}
          >
            <motion.polygon
              points={hexPoints}
              fill="url(#nodeFill)"
              stroke="hsl(25 100% 85%)"
              strokeWidth={1.5}
              whileHover={{
                scale: 1.03,
                filter: 'drop-shadow(0 0 18px hsl(25 95% 53% / 0.4))',
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            />
            <text
              x={0}
              y={4}
              textAnchor="middle"
              className="fill-white"
              style={{
                fontSize: node.label.length > 5 ? 14 : 16,
                fontWeight: 700,
              }}
            >
              {node.label}
            </text>
          </motion.g>
        ))}
      </motion.svg>
    </motion.div>
  );
}


