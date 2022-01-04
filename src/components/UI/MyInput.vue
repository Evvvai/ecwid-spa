<template>
  <div class="form-group" :class="type">
    <label class="form-group__label"><slot /></label>
    <input
      :name="name"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="form-group__input"
      :class="{ error: error }"
      v-autoFocus="autoFocus"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'my-input',
  props: ['modelValue', 'type', 'name', 'error', 'autoFocus'],
  emits: ['update:modelValue'],
})
</script>

<style scoped lang="scss">
.form-group {
  &__label {
    text-transform: uppercase;
  }

  &__input {
    display: flex;

    padding: 0;
    margin: 0;

    min-height: 35px;

    background-color: var(--color-input-bg);
    border: 0px;
    cursor: pointer;

    min-height: 35px;
    width: 100%;
    z-index: 1;

    color: var(--color-text);
    outline: 1px solid var(--color-input-border);
    border-bottom: 2px solid transparent;

    &.error {
      outline: 1px solid var(--color-error);
    }

    &:hover {
      cursor: text;
      border-bottom: 2px solid var(--color-input-shadow);
      transition: all 0.2s ease-in;
    }

    &:focus {
      cursor: text;
      border-bottom: 2px solid var(--color-highlight);
      transition: all 0.2s ease-in;
    }
    transition: all 0.2s ease-out;
  }
}
</style>
