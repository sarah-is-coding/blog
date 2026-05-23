'use client'

import { useEffect, useRef, useId } from 'react'

interface MermaidProps {
  chart: string
}

export default function Mermaid({ chart }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null)
  const id = useId().replace(/:/g, '')

  useEffect(() => {
    if (!ref.current) return

    async function render() {
      const mermaid = (await import('mermaid')).default
      mermaid.initialize({
        startOnLoad: false,
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
        gitGraph: {
          mainBranchName: 'main',
        },
      })

      const { svg } = await mermaid.render(`mermaid-${id}`, chart)
      if (ref.current) {
        ref.current.innerHTML = svg
      }
    }

    render()
  }, [chart, id])

  return <div ref={ref} className="my-6 flex justify-center overflow-x-auto" />
}
