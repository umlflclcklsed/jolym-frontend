"use client"

import { useCallback } from "react"
import ReactFlow, {
  Background,
  Controls,
  type Edge,
  type Node,
  Position,
  useEdgesState,
  useNodesState,
} from "reactflow"
import "reactflow/dist/style.css"

// Custom node component
const CustomNode = ({ data }: { data: { label: string; type: string } }) => {
  return (
    <div
      className={`px-4 py-2 rounded-lg shadow-md border border-emerald-200 font-medium ${
        data.type === "start" || data.type === "end" ? "bg-emerald-700 text-white" : "bg-emerald-100 text-emerald-800"
      }`}
    >
      {data.label}
    </div>
  )
}

// Node types
const nodeTypes = {
  custom: CustomNode,
}

// Initial nodes
const initialNodes: Node[] = [
  {
    id: "1",
    type: "custom",
    position: { x: 50, y: 200 },
    data: { label: "Start", type: "start" },
    sourcePosition: Position.Right,
  },
  {
    id: "2",
    type: "custom",
    position: { x: 250, y: 100 },
    data: {
      label: "Learn Programming Basics",
      type: "step",
      description: "Master Python and SQL, the fundamental languages for data science.",
      resources: [
        {
          title: "Python for Data Science",
          url: "#",
          source: "Coursera",
        },
        {
          title: "SQL for Data Analysis",
          url: "#",
          source: "Udemy",
        },
        {
          title: "Programming Fundamentals",
          url: "#",
          source: "YouTube",
        },
      ],
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "3",
    type: "custom",
    position: { x: 250, y: 300 },
    data: {
      label: "Statistics & Mathematics",
      type: "step",
      description: "Build a strong foundation in statistics, linear algebra, and calculus.",
      resources: [
        {
          title: "Statistics for Data Science",
          url: "#",
          source: "Khan Academy",
        },
        {
          title: "Linear Algebra Essentials",
          url: "#",
          source: "MIT OpenCourseWare",
        },
        {
          title: "Calculus for Machine Learning",
          url: "#",
          source: "edX",
        },
      ],
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "4",
    type: "custom",
    position: { x: 500, y: 200 },
    data: {
      label: "Data Analysis & Visualization",
      type: "step",
      description: "Learn to analyze and visualize data using tools like Pandas, NumPy, and Matplotlib.",
      resources: [
        {
          title: "Data Analysis with Pandas",
          url: "#",
          source: "DataCamp",
        },
        {
          title: "Data Visualization Masterclass",
          url: "#",
          source: "Udemy",
        },
        {
          title: "Exploratory Data Analysis",
          url: "#",
          source: "Kaggle",
        },
      ],
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "5",
    type: "custom",
    position: { x: 750, y: 100 },
    data: {
      label: "Machine Learning",
      type: "step",
      description: "Master machine learning algorithms and their applications in data science.",
      resources: [
        {
          title: "Machine Learning A-Z",
          url: "#",
          source: "Udemy",
        },
        {
          title: "Scikit-Learn Tutorial",
          url: "#",
          source: "Towards Data Science",
        },
        {
          title: "Practical Machine Learning",
          url: "#",
          source: "Stanford Online",
        },
      ],
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "6",
    type: "custom",
    position: { x: 750, y: 300 },
    data: {
      label: "Deep Learning",
      type: "step",
      description: "Learn neural networks and deep learning frameworks like TensorFlow and PyTorch.",
      resources: [
        {
          title: "Deep Learning Specialization",
          url: "#",
          source: "Coursera",
        },
        {
          title: "TensorFlow Developer Certificate",
          url: "#",
          source: "TensorFlow",
        },
        {
          title: "PyTorch for Deep Learning",
          url: "#",
          source: "Fast.ai",
        },
      ],
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "7",
    type: "custom",
    position: { x: 1000, y: 200 },
    data: { label: "Data Scientist", type: "end" },
    targetPosition: Position.Left,
  },
]

// Initial edges
const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true, style: { stroke: "#10b981", strokeWidth: 2 } },
  { id: "e1-3", source: "1", target: "3", animated: true, style: { stroke: "#10b981", strokeWidth: 2 } },
  { id: "e2-4", source: "2", target: "4", animated: true, style: { stroke: "#10b981", strokeWidth: 2 } },
  { id: "e3-4", source: "3", target: "4", animated: true, style: { stroke: "#10b981", strokeWidth: 2 } },
  { id: "e4-5", source: "4", target: "5", animated: true, style: { stroke: "#10b981", strokeWidth: 2 } },
  { id: "e4-6", source: "4", target: "6", animated: true, style: { stroke: "#10b981", strokeWidth: 2 } },
  { id: "e5-7", source: "5", target: "7", animated: true, style: { stroke: "#10b981", strokeWidth: 2 } },
  { id: "e6-7", source: "6", target: "7", animated: true, style: { stroke: "#10b981", strokeWidth: 2 } },
]

interface RoadmapGraphProps {
  onNodeClick: (node: any) => void
}

export default function RoadmapGraph({ onNodeClick }: RoadmapGraphProps) {
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, , onEdgesChange] = useEdgesState(initialEdges)

  const handleNodeClick = useCallback(
    (_, node) => {
      onNodeClick(node.data)
    },
    [onNodeClick],
  )

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={handleNodeClick}
      nodeTypes={nodeTypes}
      fitView
      attributionPosition="bottom-right"
    >
      <Background color="#f0fdf4" gap={16} />
      <Controls />
    </ReactFlow>
  )
}
