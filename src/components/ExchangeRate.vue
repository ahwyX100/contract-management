<template>
  <div>
    <div class="flex-horizontal-center">
      <line-chart :chart-data="datacollection" :options="chartOptions" style="width: 600px; height: 300px;"></line-chart>
    </div>
    <br>
    <div>Only display data before 2018-12-30</div>
    <v-btn small color="primary" @click="prepareData(7)">{{ $t('last_one_week') }}</v-btn>
    <v-btn small color="primary" @click="prepareData(30)">{{ $t('last_one_month') }}</v-btn>
    <v-btn small color="primary" @click="prepareData(90)">{{ $t('last_three_months') }}</v-btn>
    <v-btn small color="primary" @click="prepareData(180)">{{ $t('last_half_year') }}</v-btn>
    <v-btn small color="primary" @click="prepareData(365)">{{ $t('last_one_year') }}</v-btn>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import LineChart from '@nomisma/components/chart/LineChart'

export default {
  name: 'ExchangeRate',
  components: {
    LineChart
  },
  data () {
    return {
      datacollection: null,
      chartOptions: {
        maintainAspectRatio: false
      }
    }
  },
  computed: {
    ...mapState('exchange', ['partialExchangeRates'])
  },
  created () {
    this.getPartialExchangeRate({ requiredDateCount: 7 })
      .then(() => {
        this.fillData()
      })
  },
  methods: {
    ...mapActions('exchange', ['getPartialExchangeRate']),
    prepareData (requiredDateCount) {
      this.getPartialExchangeRate({ requiredDateCount })
        .then(() => {
          this.fillData()
        })
    },
    fillData () {
      const labels = this.partialExchangeRates.map(v => v.standardTime)
      const data = this.partialExchangeRates.map(v => v.rate)
      this.datacollection = {
        labels,
        datasets: [
          {
            label: 'ETH/USD',
            backgroundColor: '#f87979',
            data
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
  .flex-horizontal-center {
    display: flex;
    justify-content: center;
  }
</style>
