<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Title</th>
          <th class="text-left">Description</th>
          <th class="text-left">Type</th>
          <th class="text-left">Status</th>
          <th class="text-left">Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.published ? "Published" : "Pending" }}</td>
          <td>
            <v-btn color="warning" @click="goToEdit(item.id)">Edit</v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>

  <!--  <v-btn color="error" small @click="removeAllItems"> Remove All </v-btn>-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Item from "@/type/Item";
import ApiService from "@/services/ApiService";
import ResponseData from "@/type/ResponseData";
import { vSimpleTable } from "vuetify";

export default defineComponent({
  name: "ItemList",
  data() {
    return {
      items: [] as Item[],
      currentItem: {} as Item,
    };
  },
  mounted() {
    this.getItems();
  },
  methods: {
    getItems() {
      ApiService.getAll()
        .then((res: ResponseData) => {
          this.items = res.data.list;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    removeAllItems() {
      ApiService.deleteAll()
        .then(() => {
          this.getItems();
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    goToEdit(id: string | string[]) {
      this.$router.push(`/tutorial/${id}`);
    },
  },
});
</script>

<style scoped></style>
