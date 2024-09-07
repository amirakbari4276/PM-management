<template>
  <div>
    <Device :devices="devices" :locations="locations" @delete-device="deleteDevice" />
    <button @click="showModal = true" class="btn btn-primary">Add New Device</button>

    <DeviceAdd
      v-if="showModal"
      :locations="locations"
      @device-added="addDeviceToList"
      @close-modal="showModal = false"
    />
  </div>
</template>

<script>
import DeviceAdd from '../components/DeviceAdd.vue';
import Device from '../components/Device.vue';

export default {
  name: 'DeviceList',
  components: { DeviceAdd, Device },
  data() {
    return {
      devices: [],
      locations: [],
      showModal: false
    };
  },
  methods: {
    addDeviceToList(newDevice) {
      this.devices.push(newDevice);
      this.showModal = false; // Close modal after adding the device
    },
    deleteDevice(deviceId) {
      fetch(`http://localhost:3000/devices/${deviceId}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            this.devices = this.devices.filter(device => device.id !== deviceId);
          } else {
            console.error('Failed to delete device');
          }
        })
        .catch(error => console.error('Error:', error));
    }
  },
  created() {
    fetch('http://localhost:3000/devices')
      .then(response => response.json())
      .then(data => {
        this.devices = data;
      });

    fetch('http://localhost:3000/locations')
      .then(response => response.json())
      .then(data => {
        this.locations = data;
      });
  }
};
</script>

  