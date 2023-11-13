<template>
  <tabs>
    <tab :title="$t('general')" />
    <tab :title="$t('lists')" />
    <tab :title="$t('campaigns')" />
    <tab :title="$t('bounces')" />
  </tabs>
  <div class="tab-content">
    <div class="tab-pane fade" role="tabpanel" aria-labelledby="contact-tab">
      <p>Test 1</p>
    </div>
    <div class="tab-pane fade" role="tabpanel" aria-labelledby="contact-tab">
      <p>Test 2</p>
    </div>
    <div class="tab-pane fade" role="tabpanel" aria-labelledby="contact-tab">
      <p>Test 3</p>
    </div>
    <div class="tab-pane fade" role="tabpanel" aria-labelledby="contact-tab">
      <p>Test 4</p>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>