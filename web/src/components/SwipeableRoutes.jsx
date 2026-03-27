import React from "react"
import { useLocation, useNavigate } from "react-router-dom"

export function SwipeableRoutes({ children }) {
  const location = useLocation()
  const navigate = useNavigate()

  const [touchStart, setTouchStart] = React.useState(null)
  const [touchEnd, setTouchEnd] = React.useState(null)

  const minSwipeDistance = 60

  const onTouchStart = (e) => {
    const targetTag = e.target.tagName.toLowerCase()
    if (targetTag === 'input' || targetTag === 'textarea' || targetTag === 'select' || targetTag === 'button') return
    setTouchEnd(null)
    setTouchStart({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY })
  }

  const onTouchMove = (e) => {
    if (!touchStart) return
    const currentX = e.targetTouches[0].clientX
    const currentY = e.targetTouches[0].clientY
    const distanceX = touchStart.x - currentX
    const distanceY = Math.abs(touchStart.y - currentY)

    if (distanceY > 40 && Math.abs(distanceX) < 40) {
      setTouchStart(null)
      return
    }
    setTouchEnd(currentX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart.x - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    const paths = ["/settings", "/", "/tasks", "/expenses"]
    const currentIndex = paths.indexOf(location.pathname)

    if (currentIndex !== -1) {
      if (isLeftSwipe && currentIndex < paths.length - 1) {
        navigate(paths[currentIndex + 1])
      } else if (isRightSwipe && currentIndex > 0) {
        navigate(paths[currentIndex - 1])
      }
    }
    setTouchStart(null)
    setTouchEnd(null)
  }

  return (
    <div
      className="flex flex-col flex-1 w-full items-center touch-pan-y"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {children}
    </div>
  )
}
