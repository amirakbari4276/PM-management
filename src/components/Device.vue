<template>
  <div>
    <h2>Devices</h2>
    <ul>
      <li v-for="device in devices" :key="device.id">
        {{ device.name }}
        <ul>
          <li>Device Location: {{ getLocationName(device.location_id) }}</li>
        </ul>
        <button @click="$emit('delete-device', device.id)" class="btn btn-danger">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Device',
  props: {
    devices: Array,
    locations: Array
  },
  methods: {
    getLocationName(locationId) {
      const location = this.locations.find(loc => loc.id === locationId);
      return location ? location.name : 'Unknown Location';
    }
  }
};
</script>


