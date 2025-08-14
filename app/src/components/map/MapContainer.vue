<template>
    <div ref="mapRef" id="container" ></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { mapListApi } from '@/api/map'
import icon from "@/assets/flashIcon.png"

type Station = {
  position: [number, number],
  title: string,
  status: number,
  count: number
}

const mapRef = ref<HTMLElement | null>(null)
const markersData = ref<Station[]>([])
let map:any = null;


onMounted(async () => {

    await loadGoogleMapsApi()

    const { Map } = await (window as any).google.maps.importLibrary('maps')
    const { AdvancedMarkerElement } = await (window as any).google.maps.importLibrary('marker')

    if (!mapRef.value) {
        console.error('Map container not found!')
        return
    }

    map=new Map(mapRef.value, {
        center: { lat: -41.2866, lng: 174.7756 },
        zoom: 6,
        mapId: 'DEMO_MAP_ID'
        //973ddb99d23bfddd52007d37
        //mapId: 'DEMO_MAP_ID'
    })

    try {
        const res = await mapListApi()
        markersData.value = Array.isArray(res?.data) ? res.data : []
    } catch (e) {
        console.error('mapListApi failed:', e)
        markersData.value = []
    }

    markersData.value.forEach((s:Station) => {
        if (!Array.isArray(s.position) || s.position.length < 2) return
        const [lng, lat] = s.position

        const img = document.createElement('img')
        img.src = icon      
        img.alt = 'EV charger'
        img.style.width = '32px'
        img.style.height = '32px'

        new AdvancedMarkerElement({
        map,
        position: { lat, lng },
        content: img,
        title: s.title,
    })
    });


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