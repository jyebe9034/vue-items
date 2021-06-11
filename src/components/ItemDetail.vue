<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form">
        <v-card-text>
          <v-text-field
            ref="title"
            v-model="currentItem.title"
            :rules="[() => !!currentItem.title || 'This field is required']"
            label="Title"
            placeholder="Title"
            required
          ></v-text-field>
          <v-text-field
            ref="description"
            v-model="currentItem.description"
            :rules="[
              () => !!currentItem.description || 'This field is required',
            ]"
            label="Description"
            placeholder="Description"
            required
          ></v-text-field>
          <v-autocomplete
            ref="type"
            v-model="currentItem.type"
            :rules="[() => !!currentItem.type || 'This field is required']"
            :items="itemOptions"
            label="Type"
            placeholder="Select Type"
            required
          ></v-autocomplete>
          <v-switch
            v-model="currentItem.published"
            label="Status"
            color="red"
            hide-details
          ></v-switch>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn
            v-if="currentItem.published"
            color="primary"
            @click="updatePublished(false)"
          >
            UnPublish
          </v-btn>
          <v-btn v-else color="primary" @click="updatePublished(true)">
            Publish
          </v-btn>

          <v-btn color="error" @click="deleteItem"> Delete </v-btn>

          <v-btn color="warning" type="submit" @click="updateItem">
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Item from "@/type/Item";
import ApiService from "@/services/ApiService";
import ResponseData from "@/type/ResponseData";

export default defineComponent({
  name: "ItemDetail",
  data() {
    return {
      currentItem: {} as Item,
      itemOptions: ["BOOK", "MOVIE", "MUSIC"],
    };
  },
  mounted() {
    this.getItem(this.$route.params.id);
  },
  methods: {
    getItem(id: any) {
      ApiService.get(id)
        .then((res: ResponseData) => {
          if (res.data != null) {
            this.currentItem = res.data.item;
          } else {
            console.log(res.data);
          }
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    updatePublished(status: boolean) {
      let data = {
        id: this.currentItem.id,
        title: this.currentItem.title,
        description: this.currentItem.description,
        type: this.currentItem.type,
        published: status,
      };

      ApiService.update(this.currentItem.id, data)
        .then(() => {
          this.currentItem.published = status;
          alert("The published was updated successfully!");
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    updateItem() {
      ApiService.update(this.currentItem.id, this.currentItem)
        .then(() => {
          alert("The item was updated successfully!");
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    deleteItem() {
      ApiService.delete(this.currentItem.id)
        .then(() => {
          this.$router.push({ name: "home" });
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
});
</script>

<style scoped></style>
