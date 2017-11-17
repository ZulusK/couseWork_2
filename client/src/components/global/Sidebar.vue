<template>

  <v-navigation-drawer
    fixed
    clipped
    app
    v-model="drawer"
    :width="sidebarWidth"
  >
    <v-list dense>
      <user-info/>
      <!--draw all items for all roles-->
      <template v-for="(item, i) in items">
        <!--heading-->
        <v-layout
          row
          v-if="item.heading"
          align-center
          :key="index"
        >
          <v-flex xs6>
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-flex>
        </v-layout>
        <!--children-->
        <v-list-group v-else-if="item.children" v-model="item.model" no-action>
          <v-list-tile slot="item" @click="" :to="item.to">
            <v-list-tile-action>
              <v-icon>{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            v-for="(child, i) in item.children"
            :key="i"
            @click=""
            :to="child.to"
          >
            <v-list-tile-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ child.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-tile v-else @click="" :to="item.to">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
  import UserInfo from '@/components/global/UserInfo.vue'

  export default {
    components: {
      UserInfo
    },
    data () {
      return {
        items: [
          {
            icon: 'keyboard_arrow_up',
            'icon-alt': 'keyboard_arrow_down',
            text: 'Labels',
            model: true,
            children: [
              {icon: 'add', text: 'Create label'}
            ]
          },
          {icon: 'settings', text: 'Settings'},
          {icon: 'help', text: 'Help'},
        ]
      }
    },
    props: [
      "drawer",
    ],
    watch: {
      drawer: function (value) {
        if (value) {
          this.$emit('opened');
        } else {
          this.$emit('closed');
        }
      }
    },
    computed: {
      sidebarWidth: function () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs':
            return '200'
          case 'sm':
          case 'md':
            return '300'
          case 'lg':
          case 'xl':
            return '350'
          default:
            return '300'
        }
      }
    }
  }

</script>

<style scoped>

</style>
