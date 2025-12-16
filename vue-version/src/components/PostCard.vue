<template>
    <article class="post">
        <div class="postInfo">
            <time class="time" :datetime="post.date">{{ formatDate(post.date) }}</time>
        </div>

        <p class="postText">{{ post.body }}</p>
    </article>
</template>

<script>
export default {
  name: 'PostCard',
  props: {
    post: Object
  },
  methods: {
    formatDate(dateStr) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return new Date(dateStr).toLocaleDateString('en-US', options)
    }
  }
}
</script>

<style scoped>
.post {
  background: #ffffff;
  margin-left: 100px;
  margin-right: 100px;
  margin-bottom: 20px;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}
.postInfo { display:flex; align-items:center; color:#000000; }
.postInfo .time { margin-left:auto; font-size: 26px; }
.postInfo + p { margin-top: 20px; }
.postAvatar { width:60px; height:60px; margin-right: 15px;}

.postInfo ~ .postMedia { margin-top: 20px; }

.postMedia img { width:100%; height:auto; border-radius: 8px; }
.postText { font-size: 26px; }
.postMedia, .postText, .buttonLike { margin: 8px 20px; }
.buttonLike { border:1px solid #bbb; background:#fff; padding:6px 10px; border-radius:6px; cursor:pointer; }
.buttonLike:hover { background:#cacaca; }
</style>