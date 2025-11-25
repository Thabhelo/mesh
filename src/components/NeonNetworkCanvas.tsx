import { useEffect, useRef } from 'react';

type NodeId = string;

interface Node {
  id: NodeId;
  label: string;
  xNorm: number;
  yNorm: number;
  radius: number;
  sides: number;
}

interface Edge {
  from: NodeId;
  to: NodeId;
}

interface Particle {
  edgeIndex: number;
  t: number; // 0-1 along the edge
  speed: number;
  color: string;
}

const NODES: Node[] = [
  { id: 'ems', label: 'EMS', xNorm: 0.18, yNorm: 0.25, radius: 42, sides: 6 },
  { id: 'fire', label: 'FIRE', xNorm: 0.82, yNorm: 0.25, radius: 42, sides: 5 },
  { id: 'police', label: 'POLICE', xNorm: 0.82, yNorm: 0.75, radius: 42, sides: 6 },
  { id: 'ops', label: '911', xNorm: 0.18, yNorm: 0.75, radius: 42, sides: 5 },
  { id: 'transit', label: 'TRANSIT', xNorm: 0.5, yNorm: 0.9, radius: 42, sides: 6 },
  { id: 'hospitals', label: 'HOSPITALS', xNorm: 0.5, yNorm: 0.1, radius: 42, sides: 6 },
  { id: 'mesh', label: 'MESH CORE', xNorm: 0.5, yNorm: 0.5, radius: 52, sides: 6 },
];

const EDGES: Edge[] = [
  { from: 'ems', to: 'mesh' },
  { from: 'fire', to: 'mesh' },
  { from: 'police', to: 'mesh' },
  { from: 'ops', to: 'mesh' },
  { from: 'transit', to: 'mesh' },
  { from: 'hospitals', to: 'mesh' },
  { from: 'ems', to: 'fire' },
  { from: 'fire', to: 'police' },
  { from: 'police', to: 'ops' },
  { from: 'ops', to: 'ems' },
];

const NODE_FILL = '#fef3c7'; // soft warm surface for nodes
const EDGE_COLOR = '#e5e7eb';
const NEON_GREEN = '#f97316'; // primary orange
const NEON_PINK = '#fdba74'; // soft orange accent
const BG_COLOR = '#fff7ed';

export function NeonNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hoveredIdRef = useRef<NodeId | null>(null);
  const activeIdRef = useRef<NodeId | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (width === 0 || height === 0) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    // Observe element size so manual dragging (CSS resize) is reflected on the canvas.
    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(canvas);

    const nodeById = new Map<NodeId, Node>();
    NODES.forEach((n) => nodeById.set(n.id, n));

    // Pre-create particles along edges
    const particles: Particle[] = [];
    EDGES.forEach((_edge, edgeIndex) => {
      const count = 3;
      for (let i = 0; i < count; i += 1) {
        particles.push({
          edgeIndex,
          t: Math.random(),
          speed: 0.2 + Math.random() * 0.25,
          color: Math.random() > 0.5 ? NEON_GREEN : NEON_PINK,
        });
      }
    });

    let lastTime = performance.now();
    let frameId: number;

    const drawPolygon = (
      cx: number,
      cy: number,
      radius: number,
      sides: number,
      rotation: number,
    ) => {
      const theta = (Math.PI * 2) / sides;
      ctx.beginPath();
      for (let i = 0; i < sides; i += 1) {
        const angle = i * theta + rotation;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
    };

    const getNodePosition = (node: Node) => ({
      x: node.xNorm * width,
      y: node.yNorm * height,
    });

    const loop = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Background gradient + subtle vignette
      const bgGradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height),
      );
      bgGradient.addColorStop(0, '#ffffff');
      bgGradient.addColorStop(1, BG_COLOR);
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Slight grid for structure
      ctx.save();
      ctx.strokeStyle = 'rgba(248,153,64,0.18)';
      ctx.lineWidth = 1;
      const gridSpacing = 32;
      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      const hoveredId = hoveredIdRef.current;
      const activeId = activeIdRef.current;

      // Draw edges with a gap near each node
      ctx.lineWidth = 1.5;
      EDGES.forEach((edge) => {
        const fromNode = nodeById.get(edge.from);
        const toNode = nodeById.get(edge.to);
        if (!fromNode || !toNode) return;
        const from = getNodePosition(fromNode);
        const to = getNodePosition(toNode);

        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const dist = Math.hypot(dx, dy) || 1;
        const ux = dx / dist;
        const uy = dy / dist;

        const fromGap = fromNode.radius + 10;
        const toGap = toNode.radius + 10;

        const startX = from.x + ux * fromGap;
        const startY = from.y + uy * fromGap;
        const endX = to.x - ux * toGap;
        const endY = to.y - uy * toGap;

        ctx.save();
        const isConnectedToActive =
          activeId && (edge.from === activeId || edge.to === activeId);

        const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
        gradient.addColorStop(0, isConnectedToActive ? NEON_GREEN : EDGE_COLOR);
        gradient.addColorStop(1, isConnectedToActive ? NEON_PINK : EDGE_COLOR);
        ctx.strokeStyle = gradient;
        ctx.shadowColor = isConnectedToActive ? NEON_GREEN : 'transparent';
        ctx.shadowBlur = isConnectedToActive ? 12 : 0;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.restore();
      });

      // Update + draw particles travelling along edges
      particles.forEach((p) => {
        const edge = EDGES[p.edgeIndex];
        const fromNode = nodeById.get(edge.from);
        const toNode = nodeById.get(edge.to);
        if (!fromNode || !toNode) return;
        const from = getNodePosition(fromNode);
        const to = getNodePosition(toNode);

        p.t += p.speed * dt;
        if (p.t > 1) p.t -= 1;

        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const dist = Math.hypot(dx, dy) || 1;
        const ux = dx / dist;
        const uy = dy / dist;
        const fromGap = fromNode.radius + 14;
        const toGap = toNode.radius + 14;
        const usableLength = dist - fromGap - toGap;
        const posAlong = fromGap + usableLength * p.t;

        const x = from.x + ux * posAlong;
        const y = from.y + uy * posAlong;

        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 16;
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw nodes last so they sit above edges/particles
      NODES.forEach((node) => {
        const { x, y } = getNodePosition(node);
        const isCenter = node.id === 'mesh';
        const isHovered = node.id === hoveredId;
        const isActive = node.id === activeId;

        const baseRadius = node.radius;
        const pulse = Math.sin(time / 700 + node.xNorm * 5) * 3;
        const radius = baseRadius + pulse + (isHovered || isActive ? 4 : 0);

        ctx.save();

        // Outer glow
        ctx.beginPath();
        ctx.fillStyle = isCenter ? 'rgba(249,115,22,0.18)' : 'rgba(252,211,77,0.16)';
        ctx.arc(x, y, radius + 10, 0, Math.PI * 2);
        ctx.fill();

        // Polygon node
        drawPolygon(x, y, radius, node.sides, isCenter ? Math.PI / 6 : 0);
        const gradient = ctx.createLinearGradient(x - radius, y - radius, x + radius, y + radius);
        gradient.addColorStop(0, NEON_GREEN);
        gradient.addColorStop(1, NEON_PINK);

        ctx.fillStyle = NODE_FILL;
        ctx.strokeStyle = gradient;
        ctx.lineWidth = isCenter ? 3 : 2;
        ctx.shadowColor = isCenter ? NEON_GREEN : NEON_PINK;
        ctx.shadowBlur = isHovered || isActive ? 26 : 14;
        ctx.fill();
        ctx.stroke();

        // Label
        ctx.font = isCenter ? '700 14px "Orbitron", system-ui' : '600 12px "Space Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#111827'; // dark text for contrast on light node fill

        const labelLines = node.label.split(' ');
        if (labelLines.length === 1) {
          ctx.fillText(node.label, x, y);
        } else {
          ctx.fillText(labelLines[0], x, y - 8);
          ctx.fillText(labelLines.slice(1).join(' '), x, y + 8);
        }

        ctx.restore();
      });

      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, []);

  // Map mouse to nearest node for hover / click
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      let nearest: { id: NodeId; dist: number } | null = null;
      for (let i = 0; i < NODES.length; i += 1) {
        const node = NODES[i];
        const nx = node.xNorm * rect.width;
        const ny = node.yNorm * rect.height;
        const d = Math.hypot(nx - x, ny - y);
        const radius = node.radius + 24;
        if (d <= radius && (!nearest || d < nearest.dist)) {
          nearest = { id: node.id, dist: d };
        }
      }

      hoveredIdRef.current = nearest ? nearest.id : null;
    };

    const handleClick = () => {
      const hovered = hoveredIdRef.current;
      if (!hovered) return;
      activeIdRef.current = activeIdRef.current === hovered ? null : hovered;
    };

    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('click', handleClick);

    return () => {
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="relative w-full h-[260px] sm:h-[300px] md:h-[360px] lg:h-[420px] xl:h-[480px] min-h-[220px] min-w-[260px] rounded-2xl overflow-hidden border border-[hsl(25_100%_90%)] bg-[hsl(25_100%_97%)] shadow-card resize">
      <canvas
        ref={canvasRef}
        className="h-full w-full cursor-crosshair"
        aria-label="Neon network visualization showing chaotic data sources flowing into Mesh"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
        <p className="px-3 py-1 rounded-full bg-white/70 border border-[hsl(25_100%_90%)] text-[11px] tracking-[0.18em] uppercase text-[hsl(25_95%_53%)] font-semibold font-['Space Mono',monospace]">
          Chaos in — Coherence out
        </p>
      </div>
    </div>
  );
}


