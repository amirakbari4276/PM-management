<template>
  <div class="dashboard">
    <header>
      <h1>Maintenance Dashboard</h1>
    </header>

    <div class="section">
      <h2>Today's Tasks <span v-if="todaysTasks.length" class="alarm">🔔</span></h2>
      <div v-if="todaysTasks.length">
        <table class="main-table">
          <thead>
            <tr>
              <th>Equipment ID</th>
              <th>Type</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(task, index) in todaysTasks" :key="task.id">
              <td>{{ index + 1 }}</td>
              <td>{{ task.type }}</td>
              <td>{{ task.date }}</td>
              <td>{{ task.status }}</td>
              <td>
                <button
                  v-if="task.status !== 'completed'"
                  @click="completeTask(task.id)"
                  class="complete-btn"
                >
                  Complete
                </button>
                <span v-else class="completed-text">Completed</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else>No tasks for today.</p>
    </div>

    <div class="section">
      <h2>All Maintenance Tasks</h2>
      <table class="main-table">
        <thead>
          <tr>
            <th>Equipment ID</th>
            <th>Type</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(task, index) in maintenanceTasks" :key="task.id">
            <td>{{ index + 1 }}</td>
            <td>{{ task.type }}</td>
            <td>{{ task.date }}</td>
            <td>{{ task.status }}</td>
            <td>
              <button
                v-if="task.status !== 'completed'"
                @click="completeTask(task.id)"
                class="complete-btn"
              >
                Complete
              </button>
              <span v-else class="completed-text">Completed</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MaintenanceDashboard',
  data() {
    return {
      maintenanceTasks: [] 
    };
  },
  computed: {
    todaysTasks() {
      const today = new Date().toISOString().slice(0, 10); 
      // Filters tasks to get those that are pending and scheduled for today
      return this.maintenanceTasks.filter(task => task.date === today && task.status === "pending");
    }
  },
  methods: {
    fetchMaintenanceTasks() {
      fetch('http://localhost:3000/maintenance')
        .then(response => response.json())
        .then(data => {
          this.maintenanceTasks = data;
          this.updateOverdueTasks(); // Update overdue tasks after fetching
        })
        .catch(error => console.error('Error fetching maintenance tasks:', error));
    },
    updateOverdueTasks() {
      const today = new Date();

      // Loops through tasks to check if any are overdue
      this.maintenanceTasks.forEach(task => {
        let taskDate = new Date(task.date);

        if (taskDate.toISOString().slice(0, 10) < today.toISOString().slice(0, 10)) {
          let newDate;

          // Sets the next scheduled date based on the task type
          switch (task.type) {
            case 'weekly':
              newDate = this.getNextWeeklyDate(taskDate);
              break;
            case 'monthly':
              newDate = this.getNextMonthlyDate(taskDate);
              break;
            case 'yearly':
              newDate = this.getNextYearlyDate(taskDate);
              break;
          }

          if (newDate) {
            // Updates the overdue task with a new date and resets the status to pending
            const updatedTask = {
              date: newDate.toISOString().slice(0, 10),
              status: 'pending' 
            };

            fetch(`http://localhost:3000/maintenance/${task.id}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedTask)
            })
            .catch(error => console.error('Error updating task:', error));
          }
        }
      });
    },
    getNextWeeklyDate(currentDate) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(nextDate.getDate() + 7);
      return nextDate;
    },
    getNextMonthlyDate(currentDate) {
      const nextDate = new Date(currentDate);
      nextDate.setMonth(nextDate.getMonth() + 1);
      return nextDate;
    },
    getNextYearlyDate(currentDate) {
      const nextDate = new Date(currentDate);
      nextDate.setFullYear(currentDate.getFullYear() + 1); 
      return nextDate;
    },
    completeTask(taskId) {
      const updatedTask = { status: 'completed' };

      fetch(`http://localhost:3000/maintenance/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      })
        .then(() => {
          // Updates the local task list to reflect the completed task
          this.maintenanceTasks = this.maintenanceTasks.map((task) =>
            task.id === taskId ? { ...task, status: 'completed' } : task
          );
        })
        .catch((error) => console.error('Error updating task:', error));
    },
  },
  mounted() {
    this.fetchMaintenanceTasks();
  }
};
</script>






