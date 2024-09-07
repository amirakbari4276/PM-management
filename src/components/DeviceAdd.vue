<template>
  <!-- Modal -->
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal">
      <h2>Add New Device</h2>
      <form @submit.prevent="addDevice">
        <div>
          <label for="deviceName">Device Name:</label>
          <input type="text" v-model="newDevice.name" id="deviceName" required />
        </div>
        <div>
          <label for="location">Location:</label>
          <select v-model="newDevice.location_id" id="location" required>
            <option v-for="location in locations" :key="location.id" :value="location.id">
              {{ location.name }}
            </option>
          </select>
        </div>
        <button type="submit" class="btn btn-success">Add Device</button>
        <button type="button" @click="closeModal" class="btn btn-secondary">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    locations: Array
  },
  data() {
    return {
      newDevice: {
        name: '',
        location_id: null
      }
    };
  },
  methods: {
    addDevice() {
      const newDeviceData = { ...this.newDevice };

      fetch('http://localhost:3000/devices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDeviceData)
      })
        .then(response => response.json())
        .then(data => {
          this.$emit('device-added', data);
          this.newDevice.name = '';
          this.newDevice.location_id = null;
          this.closeModal();
        })
        .catch(error => console.error('Error:', error));
    },
    closeModal() {
      this.$emit('close-modal');
    }
  }
};
</script>

<style scoped>
/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
}

.modal h2 {
  margin-top: 0;
}

.modal form div {
  margin-bottom: 15px;
}

.modal form label {
  display: block;
  margin-bottom: 5px;
}

.modal form input, 
.modal form select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #ced4da;
}

.modal form button {
  margin-top: 10px;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

</style>
