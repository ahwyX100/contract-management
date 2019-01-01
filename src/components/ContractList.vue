<template>
  <div>
    <snack-bar></snack-bar>
    <v-toolbar flat color="white">
      <v-toolbar-title>{{ $t('my_contract_list') }}</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-btn color="info" class="mb-2" @click="openModal">{{ $t('new_contract') }}</v-btn>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="partialContracts"
      :pagination.sync="pagination"
      :loading="loading"
      :total-items="totalCount"
      item-key="updatedTime"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.amountInUsd }}</td>
        <td class="text-xs-left">{{ props.item.currency }}</td>
        <td class="text-xs-left">{{ props.item.date }}</td>
        <td class="text-xs-left layout">
          <v-icon
            small
            class="mr-2"
            style="display: flex !important"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            style="display: flex !important"
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="fetchData">{{ $t('Reload') }}</v-btn>
      </template>
    </v-data-table>
    <base-modal :options="modalOptions">
      <new-contract
        slot="content"
        :editedIndex="editedIndex"
        :editedItem="editedItem"
        @close="closeModal"></new-contract>
    </base-modal>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import NewContract from './forms/NewContract'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('contract')

const defaultPagination = {
  page: 1,
  rowsPerPage: 25
}

export default {
  name: 'ContractList',
  components: {
    NewContract
  },
  data: () => ({
    loading: true,
    pagination: Object.assign({}, defaultPagination),
    headers: [
      {
        text: 'Name',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      { text: 'Amount in USD($)', value: 'amountInUsd' },
      { text: 'Currency', value: 'currency' },
      { text: 'Deal Time', value: 'date' },
      { text: 'Actions', value: 'name', sortable: false }
    ],
    modalOptions: {
      open: false,
      maxWidth: '600px'
    },
    editedIndex: -1,
    editedItem: {}
  }),

  computed: {
    ...mapState(['partialContracts', 'totalCount'])
  },

  watch: {
    pagination: {
      handler () {
        this.setPagination(this.pagination)
        this.fetchData()
      }
    },
    deep: true
  },

  created () {
    this.fetchData()
  },

  methods: {
    ...mapActions(['getContractList', 'deleteContract']),
    ...mapMutations(['setPagination']),
    fetchData () {
      this.loading = true
      this.getContractList({
        startPage: this.pagination.page,
        pageSize: this.pagination.rowsPerPage
      })
        .then(() => {
          this.loading = false
        })
    },

    editItem (item) {
      this.editedIndex = this.partialContracts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.openModal()
    },

    deleteItem (item) {
      const targetIndex = this.partialContracts.indexOf(item)
      confirm(this.$t('confirm_delete_item')) && this.deleteContract({ id: item.id, targetIndex })
    },

    openModal () {
      this.modalOptions.open = true
    },

    closeModal () {
      this.modalOptions.open = false
      this.editedIndex = -1
    }
  }
}
</script>

<style scoped>

</style>
