<template>
  <div class="container">
    <h2>Maintenance Dashboard</h2>
    <ul>
      <li v-for="task in maintenanceTasks" :key="task.id">
        <strong>Equipment:</strong> {{ getEquipmentName(task.equipment_id) }} - 
        <strong>Device:</strong> {{ getDeviceName(task.equipment_id) }} - 
        <strong>Location:</strong> {{ getLocationName(task.equipment_id) }} - 
        <strong>Date:</strong> {{ task.nextDate }} - 
        <strong>Type:</strong> {{ task.type }} - 
        <strong>Status:</strong> {{ task.status }}
        <button @click="deleteMaintenanceTask(task.id)" class="btn btn-danger">Delete</button>
      </li>
    </ul>

    <button @click="showModal = true" class="btn btn-primary">Add New Task</button>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h2>Add New Maintenance Task</h2>
        <form @submit.prevent="addMaintenanceTask">
          <div>
            <label for="equipmentId">Equipment:</label>
            <select v-model="newTask.equipment_id" id="equipmentId" required>
              <option v-for="equipment in equipments" :key="equipment.id" :value="equipment.id">
                {{ equipment.name }} - {{ getDeviceName(equipment.id) }} - {{ getLocationName(equipment.id) }}
              </option>
            </select>
          </div>
          <div>
            <label for="type">Type:</label>
            <select v-model="newTask.type" id="type" required>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div>
            <label for="date">Date:</label>
            <input type="date" v-model="newTask.date" id="date" required />
          </div>
          <div>
            <label for="status">Status:</label>
            <select v-model="newTask.status" id="status" required>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button type="submit" class="btn btn-success">Add Task</button>
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
      devices: [],
      equipments: [],
      locations: [],
      maintenanceTasks: [],
      showModal: false,
      newTask: {
        equipment_id: '',
        type: '',
        date: '',
        status: 'pending'
      }
    };
  },
  methods: {
    getDeviceName(equipment_id) {
      const equipment = this.equipments.find(eq => eq.id === equipment_id);
      if (equipment) {
        const device = this.devices.find(dev => dev.id === equipment.device_id);
        return device ? device.name : 'Unknown Device';
      }
      return 'Unknown Device';
    },
    getLocationName(equipment_id) {
      const equipment = this.equipments.find(eq => eq.id === equipment_id);
      if (equipment) {
        const device = this.devices.find(dev => dev.id === equipment.device_id);
        if (device) {
          const location = this.locations.find(loc => loc.id === device.location_id);
          return location ? location.name : 'Unknown Location';
        }
      }
      return 'Unknown Location';
    },
    getEquipmentName(equipment_id) {
      const equipment = this.equipments.find(eq => eq.id === equipment_id);
      return equipment ? equipment.name : 'Unknown Equipment';
    },
    addMaintenanceTask() {

      fetch('http://localhost:3000/maintenance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.newTask)
      })
        .then(response => response.json())
        .then(data => {
          this.maintenanceTasks.push(data);
          this.resetNewTask();
          this.closeModal();
        })
        .catch(error => console.error('Error:', error));
    },
    resetNewTask() {
      this.newTask = {
        equipment_id: '',
        type: '',
        date: '',
        status: 'pending'
      };
    },
    closeModal() {
      this.showModal = false;
    },
    deleteMaintenanceTask(taskId) {
        fetch(`http://localhost:3000/maintenance/${taskId}`, {
          method: 'DELETE'
        })
        .then(response => {
          if (response.ok) {
            this.maintenanceTasks = this.maintenanceTasks.filter(task => task.id !== taskId);
          } else {
            console.error('Failed to delete task');
          }
        })
        .catch(error => console.error('Error:', error));
      },
  },
  created() {
    fetch('http://localhost:3000/devices')
      .then(response => response.json())
      .then(data => {
        this.devices = data;
      });

    fetch('http://localhost:3000/equipments')
      .then(response => response.json())
      .then(data => {
        this.equipments = data;
      });

    fetch('http://localhost:3000/locations')
      .then(response => response.json())
      .then(data => {
        this.locations = data;
      });

    fetch('http://localhost:3000/maintenance')
      .then(response => response.json())
      .then(data => {
        this.maintenanceTasks = data;
      });
  }
};
</script>