<template>
  <div class="card border-2 border-primary shadow">
    <div class="card-body">
      <h5 class="card-title text-primary text-uppercase">{{ title }}</h5>
      <p>
        {{
          description
            ? description.substring(0, 80) + "..."
            : "Pour pour plus d'informations..."
        }}
      </p>
      <p>
        <strong class="text-uppercase">{{ contractType }}</strong> -
        {{ new Date(jobDate).toLocaleString() }}
        <br />
      </p>

      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "JobAdvertCardCompoment",
  props: ["title", "contractType", "jobDate", "description"],
};
</script>

<style scoped></style>
