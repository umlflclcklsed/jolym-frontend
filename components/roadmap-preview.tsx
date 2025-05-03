"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function RoadmapPreview() {
  return (
    <Card className="border-[#A5D6A7] shadow-lg overflow-hidden rounded-xl">
      <CardContent className="p-0">
        <div className="relative w-full h-[450px] bg-white">
          <motion.svg
            width="100%"
            height="100%"
            viewBox="0 0 800 450"
            className="p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Background grid */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(229, 231, 235, 0.5)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Nodes and connections */}
            <g>
              {/* Start node */}
              <motion.circle
                cx="100"
                cy="225"
                r="35"
                fill="#2E7D32"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
              <motion.text
                x="100"
                y="225"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="14"
                fontWeight="500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                Start
              </motion.text>

              {/* Node 1 */}
              <motion.circle
                cx="250"
                cy="150"
                r="35"
                fill="#66BB6A"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />
              <motion.text
                x="250"
                y="150"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="14"
                fontWeight="500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                Step 1
              </motion.text>

              {/* Node 2 */}
              <motion.circle
                cx="400"
                cy="225"
                r="35"
                fill="#66BB6A"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              />
              <motion.text
                x="400"
                y="225"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="14"
                fontWeight="500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                Step 2
              </motion.text>

              {/* Node 3 */}
              <motion.circle
                cx="550"
                cy="150"
                r="35"
                fill="#66BB6A"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              />
              <motion.text
                x="550"
                y="150"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="14"
                fontWeight="500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                Step 3
              </motion.text>

              {/* Node 4 */}
              <motion.circle
                cx="700"
                cy="225"
                r="35"
                fill="#2E7D32"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1.1 }}
              />
              <motion.text
                x="700"
                y="225"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="14"
                fontWeight="500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                Goal
              </motion.text>

              {/* Connections */}
              <motion.path
                d="M 135 225 Q 190 150 215 150"
                stroke="#66BB6A"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
              <motion.path
                d="M 285 150 Q 340 225 365 225"
                stroke="#66BB6A"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
              <motion.path
                d="M 435 225 Q 490 150 515 150"
                stroke="#66BB6A"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
              <motion.path
                d="M 585 150 Q 640 225 665 225"
                stroke="#66BB6A"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              />

              {/* Arrows */}
              <motion.polygon
                points="215,150 205,145 205,155"
                fill="#66BB6A"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.2 }}
              />
              <motion.polygon
                points="365,225 355,220 355,230"
                fill="#66BB6A"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.3 }}
              />
              <motion.polygon
                points="515,150 505,145 505,155"
                fill="#66BB6A"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.4 }}
              />
              <motion.polygon
                points="665,225 655,220 655,230"
                fill="#66BB6A"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.5 }}
              />
            </g>
          </motion.svg>
          <div className="absolute bottom-4 right-4 bg-[#E8F5E9] text-[#2E7D32] px-4 py-2 rounded-full text-sm font-medium shadow-sm">
            Preview Only
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
