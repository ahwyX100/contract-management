<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="newContractForm" v-model="valid" lazy-validation>
            <v-text-field
              v-model="user.name"
              :rules="rules.requiredField"
              :counter="10"
              label="Name*"
              required
            ></v-text-field>
            <v-text-field
              v-model="user.surname"
              :rules="rules.requiredField"
              label="Surname*"
              required
            ></v-text-field>
            <v-text-field
              v-model="amountInUsd"
              :rules="rules.numberField"
              label="Amount in USD($)*"
              required
            ></v-text-field>
            <v-select
              v-model="currency"
              :items="currencyArr"
              :rules="rules.requiredField"
              label="Currency*"
              required
            ></v-select>

            <small>*{{ $t('indicate_required_field') }}</small>
            <br>

            <v-btn
              :disabled="!valid"
              @click="submit"
            >
            {{ $t('submit') }}
            </v-btn>
            <v-btn @click="close">{{ $t('close') }}</v-btn>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import i18n from '@nomisma/i18n'
import uuid from 'uuid/v4'
const commonRules = {
  required: v => !!v || i18n.t('field_required'),
  number: v => {
    if (!/^\d+(\.\d+)?$/.exec(v)) {
      return i18n.t('numbers_only')
    }
    return true
  }
}

export default {
  name: 'NewContract',
  props: {
    editedIndex: {
      type: Number,
      default: -1
    },
    editedItem: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      valid: true,
      user: {
        name: '',
        surname: ''
      },
      amountInUsd: '',
      rules: {
        requiredField: [commonRules.required],
        numberField: [commonRules.required, commonRules.number]
      },
      currency: null,
      currencyArr: ['AUD', 'CAD', 'CHF', 'CNY', 'EUR', 'GBP', 'JPY', 'USD', 'NZD']
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex !== -1 ? this.$t('edit_contract') : this.$t('new_contract')
    }
  },
  watch: {
    editedItem (newItem) {
      this.user = newItem.user
      this.currency = newItem.currency
      this.amountInUsd = newItem.amountInUsd
    }
  },
  methods: {
    ...mapActions('contract', ['addContract', 'editContract']),
    submit () {
      const isEdit = this.editedIndex !== -1
      const params = {
        id: isEdit ? this.editedItem.id : uuid(),
        user: this.user,
        amountInUsd: this.amountInUsd,
        currency: this.currency,
        time: isEdit ? this.editedItem.time : Date.now(),
        updatedTime: Date.now()
      }
      if (isEdit) {
        this.editContract({
          params,
          editedIndex: this.editedIndex
        })
          .then(() => {
            this.$bus.$emit('NOTIFY_MESSAGE', {
              type: 'success',
              text: this.$t('edit_contract_success')
            })
            this.close()
          })
          .catch(() => {
            this.$bus.$emit('NOTIFY_MESSAGE', {
              type: 'error',
              text: this.$t('unexpected_error_happens')
            })
          })
      } else {
        this.addContract({
          params
        })
          .then(() => {
            this.$bus.$emit('NOTIFY_MESSAGE', {
              type: 'success',
              text: this.$t('add_contract_success')
            })
            this.close()
          })
          .catch(() => {
            this.$bus.$emit('NOTIFY_MESSAGE', {
              type: 'error',
              text: this.$t('unexpected_error_happens')
            })
          })
      }
    },
    close () {
      this.clear()
      this.$emit('close')
    },
    clear () {
      this.$refs.newContractForm.reset()
    }
  }
}
</script>
