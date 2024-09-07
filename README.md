# Maintenance Management System

This project is a Maintenance Management System built using Vue.js for managing equipment, devices, locations, and maintenance tasks. The system allows users to manage and track maintenance activities across different locations and devices and warns it when the repair period is approaching.

## Features

- **Equipment Management**: Add, view, and delete equipment from the system.
- **Device Management**: Associate devices with locations, add new devices, and remove them from the system.
- **Location Management**: Add, view, and delete locations.
- **Maintenance Task Management**: Schedule, view, and manage maintenance tasks for different devices and equipment.
- **API Interaction**: Fetch, add, update, and delete data using a local server API.

## Project Structure

```bash
├── public
├── src
│   ├── assets
│   ├── components
│   │   ├── Device.vue              # Displays devices
│   │   ├── DeviceAdd.vue           # Modal for adding new devices
│   ├── views
│   │   ├── DeviceList.vue          # Main component for managing devices
│   │   ├── Equipments.vue       # Main component for managing equipment
│   │   ├── Location.vue        # Main component for managing locations
│   │   ├── Maintenancelist.vue # Main component for managing maintenance tasks
│   │   ├── MaintenanceDashboard.vue # Dashboard for viewing
│   ├── App.vue                     # Main Vue app
│   ├── main.js                     # Main JavaScript entry file
├── package.json
└── README.md
