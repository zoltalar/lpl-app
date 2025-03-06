<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-5 text-center text-sm-start">
          <span>{{ year }} © {{ $t('mailsender') }}</span>
        </div>
        <div class="col-sm-2 text-center">
          <div class="progress" v-if="progress > 0 && progress < 100">
            <div
              class="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              :aria-valuenow="progress"
              aria-valuemin="0"
              aria-valuemax="100"
              :style="style"
            ></div>
          </div>
        </div>
        <div class="col-sm-5 text-center text-sm-end">
          <a
            href="/theme"
            class="badge theme-light text-bg-primary ms-2"
            @click.stop.prevent="setTheme('light')"
            :title="$t('set_light_mode')"
          >
            <i class="mdi mdi-lightbulb-on"></i>
          </a>
          <a
            href="/theme"
            class="badge theme-dark text-bg-secondary"
            @click.stop.prevent="setTheme('dark')"
            :title="$t('set_dark_mode')"
          >
            <i class="mdi mdi-lightbulb"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
// Vars
interface Props {
  progress: number
}
const props = defineProps<Props>()
// Composables
const { preferredTheme, setTheme } = useUi()
// Computed
const style = computed<Record<string, string>>(() => {
  return {
    width: props.progress + '%'
  }
})
const year = computed<number>(() => {
  return (new Date()).getFullYear()
})
// Functions
onMounted(() => {
  setTheme(preferredTheme())
})
</script>