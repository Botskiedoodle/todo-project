<template>
  <div class="item">
    <div class="task-title">{{ title }}</div>
    <div class="task-number-container">
      <div class="task-number">{{ number }}</div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  number: {
    type: Number,
    default: 0
  }
})
</script>
<style lang="scss">
.item {
  background-color: #3679BA;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: background-color 300ms ease-in-out;
  padding: .125rem 0 .125rem 0;
  font-weight: 600;

  &:hover {
    background-color: #1F4F7D;
  }

  .task-title {
    padding-left: .5rem;
    font-size: 14px;
  }


  .task-number-container {
    padding-right: .125rem;

    .task-number {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1.25rem;
      height: 1.25rem;
      background-color: white;
      color: #3679BA;
      border-radius: 100%;
      font-size: 14px;
    }
  }
}
</style>