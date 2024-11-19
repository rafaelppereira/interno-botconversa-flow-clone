import {
  BaseEdge,
  EdgeProps,
  getBezierPath,
  useReactFlow,
} from 'reactflow';

import * as colors from 'tailwindcss/colors'

export function DefaultEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {
    strokeWidth: 3,
    stroke: colors.zinc[400]
  },
  markerEnd,
}: EdgeProps) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeClick = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      {/* <EdgeLabelRenderer>
        <div
          style={{
            fontSize: 12,
            pointerEvents: 'all',
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
          className="nodrag nopan"
        >
          <button className="size-5 bg-red-100 text-red-400 border border-red-200 rounded-full flex items-center justify-center hover:brightness-75 transition-all" onClick={onEdgeClick}>
            ×
          </button>
        </div>
      </EdgeLabelRenderer> */}
    </>
  );
}
