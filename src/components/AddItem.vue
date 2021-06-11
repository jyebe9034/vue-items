<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form">
        <v-card-text>
          <v-text-field
            ref="title"
            v-model="item.title"
            :rules="[() => !!item.title || 'This field is required']"
            label="Title"
            placeholder="Title"
            required
          ></v-text-field>
          <v-text-field
            ref="description"
            v-model="item.description"
            :rules="[() => !!item.description || 'This field is required']"
            label="Description"
            placeholder="Description"
            counter="25"
            required
          ></v-text-field>
          <v-autocomplete
            ref="type"
            v-model="item.type"
            :rules="[() => !!item.type || 'This field is required']"
            :items="itemOptions"
            label="Type"
            placeholder="Select Type"
            required
          ></v-autocomplete>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn text @click="newItem"> Add </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="saveItem"> Submit </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Item from "@/type/Item";
import ResponseData from "@/type/ResponseData";
import ApiService from "@/services/ApiService";

export default defineComponent({
  name: "AddItem",
  data() {
    return {
      item: {
        id: null,
        title: "",
        description: "",
        type: "",
        published: false,
      } as Item,
      submitted: false,
      itemOptions: ["BOOK", "MOVIE", "MUSIC"],
    };
  },
  methods: {
    saveItem() {
      console.log(this.item);
      let data = {
        title: this.item.title,
        description: this.item.description,
        type: this.item.type,
        published: this.item.published,
      };

      ApiService.create(data)
        .then((res: ResponseData) => {
          this.item.id = res.data.id;
          this.submitted = true;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    newItem() {
      this.submitted = false;
      this.item = { published: false } as Item;
    },
  },
});
</script>

<style scoped></style>
