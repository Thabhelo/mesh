import { motion } from 'framer-motion';
import { Ambulance, Car, Flame, Radio, MapPin } from 'lucide-react';
import { Unit } from '../../types/ems';

interface NearbyUnitsProps {
  units: Unit[];
  showMap?: boolean;
}

const statusConfig = {
  available: { color: 'bg-primary', text: 'text-primary', label: 'Available' },
  responding: { color: 'bg-secondary', text: 'text-secondary', label: 'Responding', pulse: true },
  on_scene: { color: 'bg-secondary/80', text: 'text-secondary', label: 'On Scene' },
  transporting: { color: 'bg-primary/70', text: 'text-primary', label: 'Transport' },
  at_hospital: { color: 'bg-muted-foreground', text: 'text-muted-foreground', label: 'At Hospital' },
  offline: { color: 'bg-muted-foreground/50', text: 'text-muted-foreground', label: 'Offline' },
};

const typeIcons = {
  ems: Ambulance,
  fire: Flame,
  police: Car,
};

function MiniMap({ units }: { units: Unit[] }) {
  const mapWidth = 300;
  const mapHeight = 200;
  const padding = 20;

  const lats = units.map((u) => u.coordinates.lat);
  const lngs = units.map((u) => u.coordinates.lng);
  const minLat = Math.min(...lats) - 0.005;
  const maxLat = Math.max(...lats) + 0.005;
  const minLng = Math.min(...lngs) - 0.005;
  const maxLng = Math.max(...lngs) + 0.005;

  const scaleX = (lng: number) =>
    padding + ((lng - minLng) / (maxLng - minLng)) * (mapWidth - 2 * padding);
  const scaleY = (lat: number) =>
    mapHeight - padding - ((lat - minLat) / (maxLat - minLat)) * (mapHeight - 2 * padding);

  const centerX = mapWidth / 2;
  const centerY = mapHeight / 2;

  return (
    <div className="relative bg-muted/30 rounded-xl overflow-hidden border border-border">
      <svg width={mapWidth} height={mapHeight} className="w-full h-auto">
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path
              d="M 30 0 L 0 0 0 30"
              fill="none"
              stroke="hsl(25 100% 90%)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Center crosshair (you) */}
        <circle cx={centerX} cy={centerY} r="20" fill="hsl(25 95% 53% / 0.1)" />
        <circle cx={centerX} cy={centerY} r="10" fill="hsl(25 95% 53% / 0.2)" />
        <circle cx={centerX} cy={centerY} r="4" fill="hsl(25 95% 53%)" />
        <text
          x={centerX}
          y={centerY - 25}
          textAnchor="middle"
          fill="hsl(25 95% 53%)"
          fontSize="10"
          fontWeight="bold"
        >
          YOU
        </text>

        {/* Unit dots */}
        {units.map((unit) => {
          const x = scaleX(unit.coordinates.lng);
          const y = scaleY(unit.coordinates.lat);
          const color =
            unit.type === 'ems'
              ? 'hsl(25 95% 53%)'
              : unit.type === 'fire'
              ? 'hsl(0 84% 60%)'
              : 'hsl(215 16% 47%)';

          return (
            <g key={unit.id}>
              {unit.status === 'responding' && (
                <circle cx={x} cy={y} r="12" fill={color} opacity="0.2">
                  <animate
                    attributeName="r"
                    from="6"
                    to="16"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.3"
                    to="0"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
              <circle cx={x} cy={y} r="6" fill={color} />
              <text
                x={x}
                y={y - 10}
                textAnchor="middle"
                fill="hsl(222 47% 11% / 0.6)"
                fontSize="9"
                fontWeight="500"
              >
                {unit.callSign}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-2 left-2 flex gap-3 text-[10px]">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-muted-foreground">EMS</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-destructive" />
          <span className="text-muted-foreground">Fire</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-muted-foreground" />
          <span className="text-muted-foreground">Police</span>
        </div>
      </div>
    </div>
  );
}

export default function NearbyUnits({ units, showMap = true }: NearbyUnitsProps) {
  const sortedUnits = [...units].sort((a, b) => a.distance - b.distance);

  return (
    <div className="space-y-4">
      {showMap && <MiniMap units={units} />}

      <div className="space-y-2">
        {sortedUnits.map((unit, index) => {
          const config = statusConfig[unit.status];
          const Icon = typeIcons[unit.type];

          return (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
              className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors cursor-pointer group shadow-card"
            >
              <div className={`p-2 rounded-lg ${config.color}/10`}>
                <Icon size={16} className={config.text} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-semibold text-foreground">
                    {unit.callSign}
                  </span>
                  {config.pulse && (
                    <span className="relative flex h-2 w-2">
                      <span
                        className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.color} opacity-75`}
                      />
                      <span
                        className={`relative inline-flex rounded-full h-2 w-2 ${config.color}`}
                      />
                    </span>
                  )}
                </div>
                <span className={`text-xs ${config.text}`}>{config.label}</span>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <MapPin size={12} />
                  <span className="font-mono">{unit.distance} mi</span>
                </div>
              </div>

              <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-muted rounded-lg transition-all">
                <Radio size={14} className="text-muted-foreground" />
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
