<template>
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
                                <button type="button" class="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvas-subscriber-create" aria-controls="Create new subscriber">{{ $t('create') }}</button>
                                <button type="button" class="btn btn-secondary" @click.prevent="refresh">{{ $t('refresh') }}</button>
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
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th width="10%">
                                        <a href="/subscribers" class="sortable">{{ $t('id') }}</a>
                                    </th>
                                    <th width="35%">
                                        <a href="/subscribers" class="sortable">{{ $t('email') }}</a>
                                    </th>
                                    <th width="15%">
                                        <a href="/subscribers" class="sortable">{{ $t('confirmed') }}</a>
                                    </th>
                                    <th width="15%">
                                        <a href="/subscribers" class="sortable">{{ $t('blacklisted') }}</a>
                                    </th>
                                    <th class="text-end">{{ $t('actions') }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(user, i) in users">
                                    <td>{{ user.id }}</td>
                                    <td>{{ user.email }}</td>
                                    <td><yes-no :expression="user.confirmed" /></td>
                                    <td><yes-no :expression="user.blacklisted" /></td>
                                    <td class="text-end">
                                        <div class="btn-group btn-group-sm">
                                            <button title="Edit" type="button" class="btn btn-light"><i class="mdi mdi-pencil"></i></button>
                                            <button title="View" type="button" class="btn btn-light"><i class="mdi mdi-eye-outline"></i></button>
                                            <button title="Delete" type="button" class="btn btn-danger"><i class="mdi mdi-close"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <nav class="mt-3" aria-label="Page navigation">
                                <ul class="pagination">
                                    <li class="page-item"><a class="page-link active" href="#">1</a></li>
                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>                 
                </div>
            </div>
        </div>
    </div>
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvas-subscriber-create" aria-labelledby="offcanvas-title">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvas-title">{{ $t('create_subscriber') }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" :aria-label="$t('close')"></button>
        </div>
        <div class="offcanvas-body">
            <user-create-form />
        </div>
    </div>
</template>
<script setup>
const { resource, search, page, limit, filters, fetchResource } = useDataTable()
const users = computed(() => {
    return resource.value.data
})
const refresh = () => {
    fetchResource('/api/admin/users/index').then((data) => {
        resource.value = data
    })
}
onMounted(() => {
    refresh()
})
</script>