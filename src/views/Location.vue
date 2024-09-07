<template>
  <div class="container">
    <h2>Location Management</h2>

    <h3>Existing Locations</h3>
    <ul>
      <li v-for="(location,index) in locations" :key="location.id">
        <strong>ID:</strong> {{ index+1 }} - <strong>Name:</strong> {{ location.name }}
        <button @click="deleteLocation(location.id)" class="btn btn-danger">Delete</button>
      </li>
    </ul>

    <button @click="showModal = true" class="btn btn-primary">Add New Location</button>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h2>Add New Location</h2>
        <form @submit.prevent="addLocation">
          <div>
            <label for="locationName">Location Name:</label>
            <input type="text" v-model="newLocation.name" id="locationName" required />
          </div>
          <button type="submit" class="btn btn-success">Add Location</button>
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
      locations: [],
      showModal: false,
      newLocation: {
        name: ''
      }
    };
  },
  methods: {
    fetchLocations() {
      fetch('http://localhost:3000/locations')
        .then(response => response.json())
        .then(data => {
          this.locations = data;
        });
    },
    addLocation() {
      const newLocationData = { ...this.newLocation };

      fetch('http://localhost:3000/locations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newLocationData)
      })
        .then(response => response.json())
        .then(data => {
          this.locations.push(data);
          this.newLocation.name = ''; // Clear the input field
          this.closeModal();
        })
        .catch(error => console.error('Error:', error));
    },
    deleteLocation(id) {
      fetch(`http://localhost:3000/locations/${id}`, {
        method: 'DELETE'
      })
        .then(() => {
          this.locations = this.locations.filter(location => location.id !== id);
        })
        .catch(error => console.error('Error:', error));
    },
    closeModal() {
      this.showModal = false;
    }
  },
  created() {
    this.fetchLocations();
  }
};
</script>
