'use client'
import React, { useState, useEffect } from 'react'

const ProgressBar = ({ percentage }: { percentage: number }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      if (progress < percentage) {
        setProgress(progress + 1)
      }
    }

    if (progress < percentage) {
      const timer = setInterval(updateProgress, 20)
      return () => clearInterval(timer)
    }
  }, [progress, percentage])

  const strokeWidth = 10
  const radius = 50
  const circumference = 2 * Math.PI * (radius - strokeWidth)
  const offset = circumference - (progress / 100) * circumference

  return (
    <svg width={radius * 2} height={radius * 2} className='block mx-auto'>
      <circle className='progress-bar-bg' cx={radius} cy={radius} r={radius - strokeWidth} />
      <circle
        className='progress-bar'
        cx={radius}
        cy={radius}
        r={radius - strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
    </svg>
  )
}

export { ProgressBar }
