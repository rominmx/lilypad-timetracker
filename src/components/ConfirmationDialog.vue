<template>
  <div :class="$dialog.container">
    <div :class="$dialog.overlay"></div>
    <div :class="$style.dialog">
      <div :class="$style.content">{{ message }}</div>
      <div :class="$style.buttons">
        <button @click="$emit('cancel')" :class="[$style.button, $style.cancel]">
          {{ cancelTitle }}
        </button>
        <button @click="$emit('continue')" :class="[$style.button, $style.continue]">
          {{ continueTitle }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    cancelTitle: {
      type: String,
      default: 'Cancel',
    },
    continueTitle: {
      type: String,
      default: 'Continue',
    },
  },
};
</script>

<style lang="scss" module>
.dialog {
  width: 30%;
  border: 2px solid #000;
  position: relative;
  z-index: 2;
  background-color: #fff;
}
.content {
  text-align: center;
  font-size: 3vw;
  padding: 3vw 2vw;
}
.buttons {
  display: flex;
  margin-left: -2px;
  margin-right: -2px;
  margin-bottom: -2px;
}

.button {
  flex-basis: 50%;
  font-family: var(--font);
  font-size: 2vw;
  border: 2px solid #000;
  padding-top: 0.4em;
  padding-bottom: 0.4em;
  text-align: center;
  border-radius: 0;
  cursor: pointer;
  line-height: 1;
  outline: none;
}

.cancel {
  background-color: transparent;
  color: #000;
}

.continue {
  background-color: #000;
  color: #fff;
}
</style>
<style lang="scss" src="../stylesheets/dialogs.scss" module="$dialog" />
