<template>
  <div class="info-positioning">

    <transition-group name="slide-fade">
      <div v-if="isInfoVisible">
        <div class="info">
          This application uses the browser's Local Storage to store data
          <el-icon class="close" @click="() => isInfoVisible = !isInfoVisible">
            <Close />
          </el-icon>
        </div>
      </div>
    </transition-group>

    <transition-group name="fade">
      <div v-if="!isInfoVisible" style="position: absolute; bottom: 0;">
        <el-button type="primary" @click="() => isInfoVisible = !isInfoVisible">Show Info</el-button>
      </div>
    </transition-group>
  </div>
</template>
<script setup>
import { Close } from '@element-plus/icons-vue'
const isInfoVisible = ref(true)
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;

}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

.text-slide-fade-enter-active,
.text-slide-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
  transition-delay: 0.5s
}

.text-slide-fade-enter-from,
.text-slide-fade-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

.info-positioning {
  display: flex;
  justify-content: flex-end;
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 20px;

  .info {
    position: relative;
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: small;
    background-color: #021f31;
    padding: .5rem 2.25rem .5rem 1rem;
    border-radius: 20px;
    color: white;

    .close {
      position: absolute;
      right: 4px;
      background-color: black;
      border-radius: 20px;
      padding: .125rem;
      width: 1.125rem;
      height: 1.125rem;
      transition: all .3s ease;

      &:hover {
        background-color: white;
        color: black;
        cursor: pointer;
      }
    }
  }
}
</style>