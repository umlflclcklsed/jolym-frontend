"use client"

import { useCallback } from "react"
import ReactFlow, { Background, Controls, type Edge, Position, useEdgesState, useNodesState } from "reactflow"
import "reactflow/dist/style.css"
import { BookOpen } from "lucide-react"

// Custom node component
const CustomNode = ({ data, id }: { data: { label: string; type: string; isCompleted: boolean }; id: string }) => {
  const getNodeStyle = () => {
    if (data.isCompleted) {
      return "bg-[#A5D6A7] text-[#1B5E20] border-[#2E7D32]"
    }

    if (data.type === "start" || data.type === "end") {
      return "bg-[#2E7D32] text-white border-[#1B5E20]"
    }

    // Different colors based on difficulty
    if (id === "2") return "bg-[#C8E6C9] text-[#1B5E20] border-[#81C784]" // Beginner
    if (id === "3") return "bg-[#81C784] text-[#1B5E20] border-[#4CAF50]" // Intermediate
    if (id === "5" || id === "6") return "bg-[#4CAF50] text-white border-[#2E7D32]" // Advanced

    return "bg-[#A5D6A7] text-[#1B5E20] border-[#66BB6A]"
  }

  return (
    <div className={`px-4 py-3 rounded-lg shadow-md border-2 font-medium flex items-center gap-2 ${getNodeStyle()}`}>
      {data.type !== "start" && data.type !== "end" && <BookOpen className="h-4 w-4" />}
      <span>{data.label}</span>
      {data.isCompleted && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-[#2E7D32]"></div>
      )}
    </div>
  )
}

// Node types
const nodeTypes = {
  custom: CustomNode,
}

interface RoadmapGraphProps {
  onNodeClick: (node: any) => void
  completedNodes: string[]
}

export default function RoadmapGraph({ onNodeClick, completedNodes }: RoadmapGraphProps) {
  // Create initial nodes with completion status
  const getInitialNodes = () => {
    return [
      {
        id: "1",
        type: "custom",
        position: { x: 50, y: 200 },
        data: {
          label: "Start",
          type: "start",
          isCompleted: completedNodes.includes("1"),
          description: "Beginning of your journey to become an AI Researcher.",
          resources: [],
        },
        sourcePosition: Position.Right,
      },
      {
        id: "2",
        type: "custom",
        position: { x: 250, y: 100 },
        data: {
          label: "Learn Programming Basics",
          type: "step",
          isCompleted: completedNodes.includes("2"),
          description: "Master Python and mathematics, the fundamental skills for AI research.",
          resources: [
            {
              title: "Python for Data Science and AI",
              url: "#",
              source: "Coursera",
            },
            {
              title: "Mathematics for Machine Learning",
              url: "#",
              source: "edX",
            },
            {
              title: "Introduction to Computational Thinking",
              url: "#",
              source: "MIT OpenCourseWare",
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
          label: "Machine Learning Fundamentals",
          type: "step",
          isCompleted: completedNodes.includes("3"),
          description: "Learn the core concepts of machine learning algorithms and their applications.",
          resources: [
            {
              title: "Machine Learning by Andrew Ng",
              url: "#",
              source: "Coursera",
            },
            {
              title: "Hands-On Machine Learning with Scikit-Learn",
              url: "#",
              source: "O'Reilly Book",
            },
            {
              title: "Machine Learning Crash Course",
              url: "#",
              source: "Google AI",
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
          label: "Deep Learning",
          type: "step",
          isCompleted: completedNodes.includes("4"),
          description: "Master neural networks and deep learning frameworks like TensorFlow and PyTorch.",
          resources: [
            {
              title: "Deep Learning Specialization",
              url: "#",
              source: "Coursera",
            },
            {
              title: "Deep Learning with PyTorch",
              url: "#",
              source: "Fast.ai",
            },
            {
              title: "TensorFlow in Practice",
              url: "#",
              source: "Coursera",
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
          label: "Research Methodologies",
          type: "step",
          isCompleted: completedNodes.includes("5"),
          description: "Learn how to conduct research, read papers, and implement state-of-the-art models.",
          resources: [
            {
              title: "How to Read a Paper",
              url: "#",
              source: "ACM Digital Library",
            },
            {
              title: "Research Methods for Computer Science",
              url: "#",
              source: "MIT Press",
            },
            {
              title: "Reproducible Research Practices",
              url: "#",
              source: "Nature",
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
          label: "Specialized AI Topics",
          type: "step",
          isCompleted: completedNodes.includes("6"),
          description: "Dive deep into specialized areas like NLP, computer vision, or reinforcement learning.",
          resources: [
            {
              title: "Natural Language Processing Specialization",
              url: "#",
              source: "Coursera",
            },
            {
              title: "Computer Vision Nanodegree",
              url: "#",
              source: "Udacity",
            },
            {
              title: "Reinforcement Learning: An Introduction",
              url: "#",
              source: "MIT Press Book",
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
        data: {
          label: "AI Researcher",
          type: "end",
          isCompleted: completedNodes.includes("7"),
          description: "Congratulations! You now have the skills to work as an AI Researcher.",
          resources: [],
        },
        targetPosition: Position.Left,
      },
    ]
  }

  // Initial edges
  const initialEdges: Edge[] = [
    { id: "e1-2", source: "1", target: "2", animated: true, style: { stroke: "#66BB6A", strokeWidth: 2 } },
    { id: "e1-3", source: "1", target: "3", animated: true, style: { stroke: "#66BB6A", strokeWidth: 2 } },
    { id: "e2-4", source: "2", target: "4", animated: true, style: { stroke: "#66BB6A", strokeWidth: 2 } },
    { id: "e3-4", source: "3", target: "4", animated: true, style: { stroke: "#66BB6A", strokeWidth: 2 } },
    { id: "e4-5", source: "4", target: "5", animated: true, style: { stroke: "#66BB6A", strokeWidth: 2 } },
    { id: "e4-6", source: "4", target: "6", animated: true, style: { stroke: "#66BB6A", strokeWidth: 2 } },
    { id: "e5-7", source: "5", target: "7", animated: true, style: { stroke: "#66BB6A", strokeWidth: 2 } },
    { id: "e6-7", source: "6", target: "7", animated: true, style: { stroke: "#66BB6A", strokeWidth: 2 } },
  ]

  const [nodes, setNodes, onNodesChange] = useNodesState(getInitialNodes())
  const [edges, , onEdgesChange] = useEdgesState(initialEdges)

  // Update nodes when completedNodes changes
  const updateNodesCompletion = useCallback(() => {
    setNodes((nds) =>
      nds.map((node) => {
        return {
          ...node,
          data: {
            ...node.data,
            isCompleted: completedNodes.includes(node.id),
          },
        }
      }),
    )
  }, [completedNodes, setNodes])

  // Call updateNodesCompletion when completedNodes changes
  useCallback(() => {
    updateNodesCompletion()
  }, [completedNodes, updateNodesCompletion])

  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: { data: any }) => {
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
