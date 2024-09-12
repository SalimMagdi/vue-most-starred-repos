<template>
  <div>
    <input
      type="checkbox"
      class="checkbox"
      id="checkbox"
      v-model="darkMode"
      @change="toggleDarkMode"
    />
    <label for="checkbox"
class="checkbox-label">
      <i class="fas fa-moon"></i>
      <i class="fas fa-sun"></i>
      <span class="ball"></span>
    </label>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      darkMode: true
    }
  },
  methods: {
    toggleDarkMode(event: any) {
      if (event.target.checked) {
        document.body.setAttribute('data-mode', 'dark')
      } else {
        document.body.removeAttribute('data-mode')
      }
    }
  }
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css');

.checkbox {
  opacity: 0;
  position: absolute;
}

.checkbox-label {
  background-color: #111;
  width: 50px;
  height: 26px;
  border-radius: 50px;
  position: relative;
  padding: 5px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.2s linear;
}

.fa-moon {
  color: #0695a5;
}

.fa-sun {
  color: #f39c12;
}

.checkbox-label .ball {
  background-color: #fff;
  width: 22px;
  height: 22px;
  position: absolute;
  left: 2px;
  top: 2px;
  border-radius: 50%;
  transition: 0.2s linear;
}

.checkbox:checked + .checkbox-label {
  background-color: #fff;
}

.checkbox:checked + .checkbox-label .ball {
  transform: translateX(24px);
  background-color: #111;
}
</style>
