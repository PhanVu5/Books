<template>
    <div>
      <h1>Chi tiết</h1>
      <p>Slug: {{ $route.params.id }}</p>
      <p>Slug: {{ $route.params.param1 }}</p>
      <p>Slug: {{ $route.params.param2 }}</p>
    </div>
</template>

<script>
export default{
  data(){
    return {
      urldetail:'https://backend-guideline-api.vais.vn/api/books',
    }
  },
  methods:{
    
  }
}
</script>