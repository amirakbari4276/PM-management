<script setup>
import { RouterLink, RouterView } from 'vue-router'
import 'boxicons'
</script>

<template>
  <header>
    <div class="wrapper">

      <nav>
        <RouterLink to="/">
          <box-icon name='dashboard' type='solid' rotate='90' color='#ffffff' ></box-icon>
          <br>
        Dashboard
        </RouterLink>

        <RouterLink to="/deviceList">
          <box-icon name='devices' color='#ffffff'></box-icon>
          <br>
        DeviceList
        </RouterLink>

        <RouterLink to="/maintenanceplan">
          <box-icon name='food-menu' color='#ffffff' ></box-icon>
          <br>
        MaintenanceList
        </RouterLink>

        <RouterLink to="/locationlist">
          <box-icon name='location-plus' color='#ffffff' ></box-icon>
          <br>
        LocationsList
        </RouterLink>

        <RouterLink to="/equipments">
          <box-icon name='codepen' type='logo' color='#ffffff' ></box-icon>
          <br>
        EquipmentsList
        </RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

