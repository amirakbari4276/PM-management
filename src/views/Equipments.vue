<template>
  <div class="container">
    <h2>Equipment Management</h2>

    <h3>Existing Equipments</h3>
    <ul>
      <li v-for="(equipment,index) in equipments" :key="equipment.id">
        <strong>ID:</strong> {{ index+1 }} - <strong>Name:</strong> {{ equipment.name }} - <strong>Device Name:</strong> {{ getDeviceName(equipment.device_id) }}
        <button @click="deleteEquipment(equipment.id)" class="btn btn-danger">Delete</button>
      </li>
    </ul>

    <button @click="showModal = true" class="btn btn-primary">Add New Equipment</button>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h2>Add New Equipment</h2>
        <form @submit.prevent="addEquipment">
          <div>
            <label for="equipmentName">Equipment Name:</label>
            <input type="text" v-model="newEquipment.name" id="equipmentName" required />
          </div>
          <div>
            <label for="deviceSelect">Select Device:</label>
            <select v-model="newEquipment.device_id" id="deviceSelect" required>
              <option v-for="device in devices" :key="device.id" :value="device.id">
                {{ device.name }}
              </option>
            </select>
          </div>
          <button type="submit" class="btn btn-success">Add Equipment</button>
          <button type="button" @click="closeModal" class="btn btn-secondary">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      equipments: [],
      devices: [],
      showModal: false,
      newEquipment: {
        name: '',
        device_id: null
      }
    };
  },
  methods: {
    fetchEquipments() {
      fetch('http://localhost:3000/equipments')
        .then(response => response.json())
        .then(data => {
          this.equipments = data;
        });
    },
    fetchDevices() {
      fetch('http://localhost:3000/devices')
        .then(response => response.json())
        .then(data => {
          this.devices = data;
        });
    },
    addEquipment() {
      const newEquipmentData = { ...this.newEquipment };

      fetch('http://localhost:3000/equipments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEquipmentData)
      })
        .then(response => response.json())
        .then(data => {
          this.equipments.push(data);
          this.newEquipment.name = ''; // Clear the input field
          this.newEquipment.device_id = null; // Clear the device ID field
          this.closeModal();
        })
        .catch(error => console.error('Error:', error));
    },
    deleteEquipment(id) {
      fetch(`http://localhost:3000/equipments/${id}`, {
        method: 'DELETE'
      })
        .then(() => {
          this.equipments = this.equipments.filter(equipment => equipment.id !== id);
        })
        .catch(error => console.error('Error:', error));
    },
    getDeviceName(device_id) {
      const device = this.devices.find(device => device.id === device_id);
      return device ? device.name : 'Unknown Device';
    },
    closeModal() {
      this.showModal = false;
    }
  },
  created() {
    this.fetchEquipments();
    this.fetchDevices(); // Fetch the list of devices when the component is created
  }
};
</script>


