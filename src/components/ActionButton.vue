<template>
  <button @click="$emit('click')" :class="$style.container">
    <span :class="$style.content">
      <slot />
    </span>
  </button>
</template>

<style lang="scss" module>
.container {
  border: none;
  padding: 0.5em;
  font-family: var(--font);
  line-height: 1;
  outline: none;
  cursor: pointer;
  background-color: transparent;

  &:hover {
    .content {
      border-bottom-color: transparent;
    }
  }

  &:active {
    outline: 2px dotted #000;
  }
}

.content {
  border-bottom: 2px dotted #000;
}
</style>
