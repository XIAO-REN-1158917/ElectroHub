<template>
    <div ref="mapRef" id="container" ></div>
</template>

<script lang="ts" setup>
import { onMounted,ref } from 'vue'

const mapRef = ref<HTMLElement | null>(null)

onMounted(async () => {
await loadGoogleMapsApi()

const { Map } = await (window as any).google.maps.importLibrary('maps')

if (!mapRef.value) {
    console.error('Map container not found!')
    return
  }
new Map(mapRef.value, {
    center: { lat: -36.8485, lng: 174.7633 },
    zoom: 13,
  })
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
#container{width: 100%;height: 80vh;}
</style>