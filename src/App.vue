<template>
  <div :class="$style.container">
    <router-view />
  </div>
</template>

<style module>
.container {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
