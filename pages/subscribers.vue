<template>
    <div>
        <div class="row">
            <div class="col-12">
                <div class="page-title-box">
                    <h4 class="page-title">{{ $t('subscribers') }}</h4>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row toolbar">
                            <div class="col-sm-8">
                                <div class="btn-group" role="group" aria-label="Subscriber options">
                                    <button type="button" class="btn btn-primary">{{ $t('create') }}</button>
                                    <button type="button" class="btn btn-secondary">{{ $t('refresh') }}</button>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <form>
                                    <div class="input-group">
                                        <input type="text" class="form-control" placeholder="Search">
                                        <button type="button" class="btn btn-secondary">
                                            <i class="mdi mdi-text-search" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
definePageMeta({
    layout: 'default'
})
</script>