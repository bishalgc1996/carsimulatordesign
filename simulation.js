let speed = 0
let animationFrameId = null
let lastTimestamp = null
let currentTop = 80 // Adjusted initial position
let isMoving = false // Initial state to track if the car is moving

const speedDisplay = document.getElementById('speed')
const increaseSpeedButton = document.getElementById('increaseSpeed')
const decreaseSpeedButton = document.getElementById('decreaseSpeed')
const carObject = document.getElementById('car-object')

increaseSpeedButton.addEventListener('click', () => {
 speed += 10
 updateSpeed()
})

decreaseSpeedButton.addEventListener('click', () => {
 speed = Math.max(0, speed - 10)
 updateSpeed()
})

document.addEventListener('keydown', (event) => {
 if (event.code === 'Space') {
  // Spacebar to toggle the car's movement
  isMoving = !isMoving
  if (isMoving) {
   lastTimestamp = performance.now() // Reset timestamp to prevent jump
   startAnimation()
  } else {
   stopCar()
  }
 }
})

function updateSpeed() {
 speedDisplay.textContent = speed
 if (speed === 0) {
  stopCar()
 } else {
  if (isMoving && animationFrameId === null) {
   lastTimestamp = performance.now()
   startAnimation()
  }
 }
}

function startAnimation() {
 function animate(timestamp) {
  if (lastTimestamp !== null) {
   const elapsed = timestamp - lastTimestamp
   const distanceMoved = (elapsed / 1000) * (speed / 50) * 100 // Adjusted speed calculation to move slower
   currentTop -= distanceMoved
   if (currentTop < -100) {
    currentTop = 100
   }
   carObject.style.top = `${currentTop}%`
  }
  lastTimestamp = timestamp
  if (isMoving) {
   animationFrameId = requestAnimationFrame(animate)
  }
 }
 animationFrameId = requestAnimationFrame(animate)
}

function stopCar() {
 if (animationFrameId !== null) {
  cancelAnimationFrame(animationFrameId)
  animationFrameId = null
  lastTimestamp = null
 }
}

// Ensure the car is visible initially
carObject.style.position = 'absolute'
carObject.style.width = '100px'
carObject.style.height = 'auto'
carObject.style.left = '50%'
carObject.style.transform = 'translateX(-50%)'
carObject.style.top = `${currentTop}%`

updateSpeed()
