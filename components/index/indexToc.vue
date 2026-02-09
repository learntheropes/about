<script setup>
const props = defineProps({
  toc: {
    type: Object,
    required: true,
  },
});
const { toc } = props;
</script>

<template>
  <div class="box">
    <ul>
      <li v-for="section of toc.links" :key="section.id">
        <OButton tag="router-link" :to="`#${section.id}`" variant="primary" inverted v-if="section.depth == 2">
          {{ section.text }}
        </OButton>
        <li v-for="subsection of section.children" :key="subsection.id">
          <OButton tag="router-link" :to="`#${subsection.id}`" variant="primary" inverted>
            &nbsp;&nbsp;&nbsp;&nbsp;{{ subsection.text }}
          </OButton>
        </li>
      </li>
    </ul>
  </div>  
</template>