<template>
  <div ref="mapRef" id="container"></div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { mapListApi } from '@/api/map'
import icon from '@/assets/flashIcon.png'
import station from '@/assets/station.jpg'

type Station = {
  position: [number, number]
  title: string
  status: number
  count: number
}

const mapRef = ref<HTMLElement | null>(null)
const markersData = ref<Station[]>([])

// Hold references for proper cleanup on unmount
let map: google.maps.Map | null = null
let info: google.maps.InfoWindow | null = null
const markers: google.maps.marker.AdvancedMarkerElement[] = []
const listeners: google.maps.MapsEventListener[] = []

onMounted(async () => {
  await loadGoogleMapsApi()

  const { Map } = await (window as any).google.maps.importLibrary('maps')
  const { AdvancedMarkerElement } = await (window as any).google.maps.importLibrary('marker')
  const { InfoWindow } = await (window as any).google.maps.importLibrary('maps')

  if (!mapRef.value) {
    console.error('Map container not found!')
    return
  }

  map = new Map(mapRef.value, {
    center: { lat: -41.2866, lng: 174.7756 },
    zoom: 6,
    mapId: 'DEMO_MAP_ID'
    // 973ddb99d23bfddd52007d37
    // mapId: 'DEMO_MAP_ID'
  })

  try {
    const res = await mapListApi()
    markersData.value = Array.isArray(res?.data) ? res.data : []
  } catch (e) {
    console.error('mapListApi failed:', e)
    markersData.value = []
  }

  // Reusable InfoWindow instance
  info = new InfoWindow({
    content: '',
    disableAutoPan: false,
    maxWidth: 320,
    pixelOffset: new google.maps.Size(0, -12),
  })

  // Create markers and bind click events
  markersData.value.forEach((s: Station) => {
    if (!Array.isArray(s.position) || s.position.length < 2) return
    const [lng, lat] = s.position

    const img = document.createElement('img')
    img.src = icon
    img.alt = 'EV charger'
    img.style.width = '32px'
    img.style.height = '32px'

    const marker = new AdvancedMarkerElement({
      map,
      position: { lat, lng },
      content: img,
      title: s.title,
    })
    markers.push(marker) // keep reference for cleanup

    const h = marker.addListener('gmp-click', () => {
      const isInUse = Number(s.status) === 1
      const statusText = isInUse ? 'In Use' : 'Maint.'
      const statusColor = isInUse ? '#16a34a' : '#2563eb'

      info!.setContent(`
        <div style="padding:8px 10px; max-width:320px;">
          <div style="font-weight:600; font-size:15px; margin:0 0 6px 0;">
            ${s.title}
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            <img src="${station}"
                 alt="station"
                 style="width:120px; height:80px; object-fit:cover; border-radius:6px; display:block;" />
            <div style="font-size:13px; line-height:1.35;">
              <div>Count: ${s.count}</div>
              <div>Status: <span style="color:${statusColor}; font-weight:600;">${statusText}</span></div>
            </div>
          </div>
        </div>
      `)
      info!.open({ map: map!, anchor: marker })
    })
    listeners.push(h) // keep listener handle for cleanup
  })
})

onUnmounted(() => {
  // Close info window
  info?.close()
  info = null

  // Remove all marker event listeners
  listeners.forEach(l => l.remove())
  listeners.length = 0

  // Detach markers from the map
  markers.forEach(m => (m.map = null))
  markers.length = 0

  // (Optional) Clear listeners attached to the map itself
  try { (google.maps.event as any)?.clearInstanceListeners?.(map) } catch {}

  // Release map reference for GC
  map = null
})

function loadGoogleMapsApi(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).google?.maps?.importLibrary) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&v=weekly`
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Google Maps failed to load'))
    document.head.appendChild(script)
  })
}
</script>

<style lang="less" scoped>
#container { width: 100%; height: 80vh; }
</style>