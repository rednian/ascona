<template>
 <div class="authentication-main">
    <div class="row">
      <div class="col-md-12">
        <div class="auth-innerright">
          <div class="authentication-box">
            <div class="text-center">
              <img style="width: 200px" src="/assets/images/logo/sani2.png" alt="">
            </div>
              <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'public'
}
</script>