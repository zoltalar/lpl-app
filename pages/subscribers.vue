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
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th width="10%">
                                            <a href="/companies" class="sortable">ID</a>
                                        </th>
                                        <th width="35%">
                                            <a href="/companies" class="sortable">Name</a>
                                        </th>
                                        <th width="15%">
                                            <a href="/companies" class="sortable">Active</a>
                                        </th>
                                        <th class="text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td> 1 </td>
                                        <td> Flu Demo 2023 </td>
                                        <td><span class="badge text-bg-primary"> Yes </span></td>
                                        <td class="text-end">
                                            <div class="btn-group btn-group-sm">
                                                <button title="Edit" type="button" class="btn btn-light"><i class="mdi mdi-pencil"></i></button>
                                                <button title="Reorder Fields" type="button" class="btn btn-light"><i class="mdi mdi-sort"></i></button>
                                                <button title="Duplicate" type="button" class="btn btn-light"><i class="mdi mdi-content-duplicate"></i></button>
                                                <button title="View" type="button" class="btn btn-light"><i class="mdi mdi-eye-outline"></i></button>
                                                <button title="Archive" type="button" class="btn btn-warning"><i class="mdi mdi-floppy"></i></button>
                                                <button title="Delete" type="button" class="btn btn-danger"><i class="mdi mdi-close"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> 2 </td>
                                        <td> Abbott 2023 </td>
                                        <td><span class="badge text-bg-primary"> Yes </span></td>
                                        <td class="text-end">
                                            <div class="btn-group btn-group-sm">
                                                <button title="Edit" type="button" class="btn btn-light"><i class="mdi mdi-pencil"></i></button>
                                                <button title="Reorder Fields" type="button" class="btn btn-light"><i class="mdi mdi-sort"></i></button>
                                                <button title="Duplicate" type="button" class="btn btn-light"><i class="mdi mdi-content-duplicate"></i></button>
                                                <button title="View" type="button" class="btn btn-light"><i class="mdi mdi-eye-outline"></i></button>
                                                <button title="Archive" type="button" class="btn btn-warning"><i class="mdi mdi-floppy"></i></button>
                                                <button title="Delete" type="button" class="btn btn-danger"><i class="mdi mdi-close"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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