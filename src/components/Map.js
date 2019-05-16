import React, { useEffect, useRef, useCallback } from 'react'

function Map({ options, onMount, className }) {
  const props = { ref: useRef(), className }
  const onLoad = () => {
    const map = typeof window !== `undefined` ? new window.google.maps.Map(props.ref.current, options) : ''
    onMount && onMount(map)
  }

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement(`script`)
      script.type = `text/javascript`
      script.src =
        `https://maps.google.com/maps/api/js?key=` +
        process.env.GOOGLE_MAPS_API_KEY
      const headScript = document.getElementsByTagName(`script`)[0]
      headScript.parentNode.insertBefore(script, headScript)
      script.addEventListener(`load`, onLoad)
      return () => script.removeEventListener(`load`, onLoad)
    } else onLoad()
  })

  return (
    <div {...props} style={{height: `50vh`, margin: `1em 0`, borderRadius: `0.5em`, backgroundColor: `#ccc` }} />
  )
}

Map.defaultProps = {
  options: {
    center: { lat: 36.7958618, lng: -76.1530532 },
    zoom: 11,
  },
}

export default props => useCallback(<Map {...props}/>, []);